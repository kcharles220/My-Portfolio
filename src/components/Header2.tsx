// File: src/components/Header.js
'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ThemeToggle from './ThemeToggle';
import { useTheme } from 'next-themes'
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslations } from 'next-intl';

interface HeaderProps {
  activeSection: string;
}

export default function Header({ activeSection }: HeaderProps) {
  const t = useTranslations('header');
  const { resolvedTheme } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [currentText, setCurrentText] = useState('Welcome')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText(prev => prev === 'Welcome' ? 'Bem-vindo' : 'Welcome')
    }, 6000)

    return () => clearInterval(interval)
  }, [])

  interface ScrollToSectionProps {
    sectionId: string;
  }

  const scrollToSection = ({ sectionId }: ScrollToSectionProps) => {
    // First get the element
    const element = document.getElementById(sectionId)
    
    // Close menu first and then scroll with a delay
    setMobileMenuOpen(false)
    
    // Use setTimeout to ensure the menu closing animation doesn't interfere
    setTimeout(() => {
      if (element) {
        // Calculate offset and scroll
        const offsetTop = element.getBoundingClientRect().top + window.scrollY
        window.scrollTo({
          top: offsetTop - 80,
          behavior: 'smooth'
        })
      }
    }, 100)
  }

  // Array of navigation items with their section IDs
  const navItems = [
    { id: 'home', label: t('home') },
    { id: 'about', label: t('about') },
    { id: 'skills', label: t('skills') },
    { id: 'projects', label: t('projects') },
    { id: 'contact', label: t('contact') }
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-40 w-full">
      <motion.header
        className={`transition-all transition-[border,background] duration-500 mx-auto max-w-[2000px]
          hidden md:block ${
          scrolled
            ? 'md:rounded-full md:backdrop-blur-sm md:bg-white/5 md:border md:border-[var(--some-border-color)]/20 md:py-2 md:mt-4 md:mx-4'
            : 'bg-transparent border-transparent py-4'
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentText}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: scrolled ? 0 : 1, y: scrolled ? -20 : 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className={`whitespace-nowrap mr-4 lg:text-2xl md:text-xl font-bold text-transparent bg-clip-text animate-pulse-gradient ${
                scrolled ? 'hidden' : 'block'
              }`}
            >
              {currentText}
            </motion.div>
          </AnimatePresence>

          {/* Desktop Navigation */}
          <nav className={`transition-all duration-500 ${scrolled ? 'w-full' : ''}`}>
            <ul className={`flex space-x-6 transition-all duration-500 ${scrolled ? 'justify-center' : 'justify-start'}`}>
              {navItems.map((item) => (
                <motion.li
                  key={item.id}
                  layout
                  transition={{
                    duration: 0.35,
                    ease: "easeInOut"
                  }}
                >
                  <button
                    onClick={() => scrollToSection({ sectionId: item.id })} 
                    className={`cursor-pointer nav-link capitalize ${activeSection === item.id ? 'after:w-full' : ''}`}
                  >
                    {item.label}
                  </button>
                </motion.li>
              ))}

              <motion.li
                layout
                transition={{
                  duration: 0.35,
                  ease: "easeInOut"
                }}
                className="flex gap-2"
              >
                <ThemeToggle />
                <LanguageSwitcher />
              </motion.li>
            </ul>
          </nav>
        </div>
      </motion.header>

      {/* Mobile Menu Button - Always visible on mobile */}
      <button
        className="md:hidden p-2 fixed top-4 right-4 z-50"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Toggle menu"
      >
        <div className="w-6 h-5 relative flex flex-col justify-between">
          <span className={`w-full h-0.5 ${resolvedTheme === 'light' ? 'bg-black' : 'bg-white'} transition-all duration-300 ${
            mobileMenuOpen ? 'rotate-45 translate-y-2' : ''
          }`}></span>
          <span className={`w-full h-0.5 ${resolvedTheme === 'light' ? 'bg-black' : 'bg-white'} transition-all duration-300 ${
            mobileMenuOpen ? 'opacity-0' : 'opacity-100'
          }`}></span>
          <span className={`w-full h-0.5 ${resolvedTheme === 'light' ? 'bg-black' : 'bg-white'} transition-all duration-300 ${
            mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
          }`}></span>
        </div>
      </button>

      {/* Mobile Navigation */}
      <motion.nav
        className="md:hidden fixed top-12 right-4 w-auto min-w-[200px] max-w-[250px] glass-panel rounded-lg shadow-lg overflow-hidden"
        initial={{ opacity: 0, height: 0, scale: 0.95 }}
        animate={{
          opacity: mobileMenuOpen ? 1 : 0,
          height: mobileMenuOpen ? 'auto' : 0,
          scale: mobileMenuOpen ? 1 : 0.95,
          display: mobileMenuOpen ? 'block' : 'none'
        }}
        transition={{ duration: 0.3 }}
      >
        <ul className="py-4 px-2 space-y-3">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => scrollToSection({ sectionId: item.id })}
                className={`w-full text-left px-4 py-2 rounded-md hover:bg-white/10 transition-colors block capitalize ${activeSection === item.id ? 'gradient-text font-bold' : ''}`}
              >
                {item.label}
              </button>
            </li>
          ))}
          
          {/* Theme and Language Toggles - Fixed centering */}
          <li className="border-t border-white/10 pt-3 mt-2">
            <div className="flex items-center justify-evenly w-full">
              <div className="flex-1 flex justify-center">
                <ThemeToggle />
              </div>
              <div className="flex-1 flex justify-center">
                <LanguageSwitcher />
              </div>
            </div>
          </li>
        </ul>
      </motion.nav>
    </div>
  )
}