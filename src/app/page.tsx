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

  useEffect(() => {
    // Create an array of image URLs to preload
    const imagesToPreload = [
      // Add your critical images here
      '/images/explorer1.png',
      '/images/explorer2.png',
      '/images/explorer3.png',
      '/images/explorer4.png',
      // Add more image paths as needed
    ]

    // Function to preload images
    const preloadImages = async () => {
      const imagePromises = imagesToPreload.map(src => {
        return new Promise((resolve, reject) => {
          const img = new Image()
          img.src = src
          img.onload = resolve
          img.onerror = reject
        })
      })

      try {
        await Promise.all(imagePromises)
        setAssetsLoaded(true)
      } catch (error) {
        console.error('Failed to load some images:', error)
        // Still set loaded to true to prevent infinite loading
        setAssetsLoaded(true)
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

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'contact']
      
      for (const section of sections) {
        const element = document.getElementById(section)
        if (!element) continue
        
        const rect = element.getBoundingClientRect()
        if (rect.top <= 100 && rect.bottom >= 100) {
          setActiveSection(section)
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
            className="fixed inset-0 z-50 flex items-center justify-center bg-black"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <GooLoader />
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