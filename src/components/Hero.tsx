// File: src/components/Hero.js
'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'

export default function Hero() {
  const {  } = useTheme()
  const [typedText, setTypedText] = useState('')
  const fullText = "Full-Stack Developer"
  const typingSpeed = 100
  
  useEffect(() => {
    if (typedText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText(fullText.slice(0, typedText.length + 1))
      }, typingSpeed)
      
      return () => clearTimeout(timeout)
    }
  }, [typedText])

  return (
    <section id="home" className="relative min-h-screen grid-background flex items-center">
      <div className="container mx-auto px-4 pt-24 pb-20">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-3/5 z-10">
            <motion.h2 
              className="text-xl md:text-2xl mb-2 text-purple-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Hello, I&apos;m
            </motion.h2>
            
            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-4 gradient-text"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Carlos Pinto
            </motion.h1>
            
            <motion.div 
              className="text-xl md:text-2xl mb-6 flex items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <span className="mr-2">{typedText}</span>
              <span className="h-6 w-0.5 bg-cyan-400 animate-pulse"></span>
            </motion.div>
            
            <motion.p 
              className="text-[var(--secondary-text)] mb-8 max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              Building beautiful, responsive, and user-friendly web applications with modern technologies. Passionate about creating seamless user experiences.
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <a 
                href="#projects" 
                className="glass-button glow"
                onClick={(e) => {
                  e.preventDefault()
                  const projectsElement = document.getElementById('projects');
                  if (projectsElement) {
                    projectsElement.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                View My Work
              </a>
              <a 
                href="#contact" 
                className="glass-button glow"
                onClick={(e) => {
                  e.preventDefault()
                  const contactElement = document.getElementById('contact');
                  if (contactElement) {
                    contactElement.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                Contact Me
              </a>
            </motion.div>
            
            <motion.div 
              className="flex mt-10 gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              <a href="https://github.com/kcharles220" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"></path></svg>
              </a>
              <a href="https://www.linkedin.com/in/carlospinto03" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path></svg>
              </a>
              <a href="mailto:carlos.ppinto220@gmail.com" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
              </a>
            </motion.div>
          </div>
          
          <div className="md:w-2/5 mt-10 md:mt-0 z-10">
            <motion.div 
              className="relative w-64 h-64 md:w-80 md:h-80 mx-auto"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500 via-cyan-400 to-pink-500 opacity-70 blur-2xl animate-pulse"></div>
              <div className="absolute inset-4 rounded-full glass-panel flex items-center justify-center overflow-hidden">
                <div className="text-7xl">👋</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
      </div>
    </section>
  )
}