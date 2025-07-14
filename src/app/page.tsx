// File: src/app/page.js
'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Header from '@/components/Header2'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Skills from '@/components/Skills'
import Projects from '@/components/Projects'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import Particles from '@/components/Particles'
import GooLoader from '@/components/GooLoader'

export default function Home() {
  const [activeSection, setActiveSection] = useState('home')
  const [isLoading, setIsLoading] = useState(true)
  const [assetsLoaded, setAssetsLoaded] = useState(false)
  const [loadingProgress, setLoadingProgress] = useState(0)

  useEffect(() => {
    // Create an array of image URLs to preload
    const imagesToPreload = [
      '/My-Portfolio/images/explorer1.png',
      '/My-Portfolio/images/explorer2.png',
      '/My-Portfolio/images/explorer3.png',
      '/My-Portfolio/images/explorer4.png',
      '/My-Portfolio/images/betwise1.png',
      '/My-Portfolio/images/betwise2.png',
      '/My-Portfolio/images/betwise3.png',
      '/My-Portfolio/images/gamezone1.png',
      '/My-Portfolio/images/gamezone2.png',
      '/My-Portfolio/images/gamezone3.png',
      '/My-Portfolio/images/pos1.png',
      '/My-Portfolio/images/pos2.png',
      "/My-Portfolio/images/github.png",
      "/My-Portfolio/images/vscode.png",
      "/My-Portfolio/images/docker.png",
      "/My-Portfolio/images/postman.png",
      "/My-Portfolio/images/blender.png",
      "/My-Portfolio/images/mongodb.png",
      "/My-Portfolio/images/slack.png",
      "/My-Portfolio/images/figma.png"
    ]

    // Function to preload images
    const preloadImages = async () => {
      let loadedCount = 0;
      const totalImages = imagesToPreload.length;

      const imagePromises = imagesToPreload.map(src => {
        return new Promise<void>((resolve, reject) => {
          const img = new Image()
          img.src = src
          img.onload = () => {
            loadedCount++;
            setLoadingProgress(Math.round((loadedCount / totalImages) * 100));
            resolve();
          }
          img.onerror = reject
        })
      })

      try {
        await Promise.all(imagePromises)
        setAssetsLoaded(true)
      } catch (error) {
        console.error('Failed to load some images:', error)
        setLoadingProgress(100);
        const timeoutId = setTimeout(() => {
          setAssetsLoaded(true)
        }, 200);
        return () => clearTimeout(timeoutId);
      }
    }

    // Check if the document is ready
    if (document.readyState === 'complete') {
      preloadImages()
    } else {
      window.addEventListener('load', preloadImages)
      return () => window.removeEventListener('load', preloadImages)
    }
  }, [])

  // Update loading state based on document and assets loading
  useEffect(() => {
    if (assetsLoaded) {
      setIsLoading(false)
    }
  }, [assetsLoaded])

  // Add hash navigation handling
  useEffect(() => {
    const handleHashNavigation = () => {
      const hash = window.location.hash.slice(1);
      
      if (hash && !isLoading) {
        setTimeout(() => {
          const element = document.getElementById(hash);
          if (element) {
            const offsetTop = element.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({
              top: offsetTop - 80,
              behavior: 'smooth'
            });
            setActiveSection(hash);
          }
        }, 300);
      }
    };

    // Handle hash navigation on page load
    if (!isLoading) {
      handleHashNavigation();
    }

    // Listen for hash changes (when user manually changes URL)
    window.addEventListener('hashchange', handleHashNavigation);
    
    return () => window.removeEventListener('hashchange', handleHashNavigation);
  }, [isLoading]);

  // Update existing scroll handler to also update URL hash
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'contact']

      for (const section of sections) {
        const element = document.getElementById(section)
        if (!element) continue

        const rect = element.getBoundingClientRect()
        if (rect.top <= 100 && rect.bottom >= 100) {
          setActiveSection(section)
          // Update URL hash without triggering scroll
          if (window.location.hash !== `#${section}`) {
            window.history.replaceState(null, '', `#${section}`);
          }
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <main className="relative">
      <Particles />

      <AnimatePresence>
        {isLoading ? (
          <motion.div
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <GooLoader />

            {/* Progress Bar */}
            <div className="mt-8 w-64 relative">
              <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#a855f7] via-[#22d3ee] to-[#ec4899]"
                  initial={{ width: "0%" }}
                  animate={{ width: `${loadingProgress}%` }}
                  transition={{ duration: 0.2 }}
                  style={{
                    boxShadow: '0 0 8px rgb(0, 255, 255), 0 0 6px rgb(137, 43, 226)'
                  }}
                />
              </div>
              <div className="text-white text-sm mt-2 text-center font-mono">
                {loadingProgress}%
              </div>
            </div>

            {/* Hidden SVG filter */}
            <svg style={{ position: 'absolute', width: 0, height: 0 }}>
              <defs>
                <filter id="goo">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="20" result="blur" />
                  <feColorMatrix
                    in="blur"
                    mode="matrix"
                    values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 30 -11"
                    result="goo"
                  />
                  <feBlend in="SourceGraphic" in2="goo" />
                </filter>
              </defs>
            </svg>
          </motion.div>
        ) : (
          <>
            <Header activeSection={activeSection} />
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Contact />
            <Footer />
          </>
        )}
      </AnimatePresence>
    </main>
  )
}