'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'

export default function Footer() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const t = useTranslations('footer');
  const currentYear = new Date().getFullYear()
  const [currentText, setCurrentText] = useState(`© ${currentYear} Carlos Pinto. ${t('rights')}`)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText(prev => 
        prev.includes('©') 
          ? t('builtWith')
          : `© ${currentYear} Carlos Pinto. ${t('rights')}`
      )
    }, 4000)

    return () => clearInterval(interval)
  }, [currentYear, t])

  return (
    <motion.footer 
      ref={ref}
      className="relative pb-10 pt-20"
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-purple-900/10 to-transparent"></div>

      <div className="container mx-auto px-4">
        <div className="glass-panel p-8 relative overflow-hidden">
          <div className="absolute -left-20 -top-20 w-40 h-40 bg-purple-500 rounded-full opacity-20 blur-3xl animate-pulse"></div>
          <div className="absolute -right-20 -bottom-20 w-40 h-40 bg-cyan-400 rounded-full opacity-20 blur-3xl animate-pulse"></div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-2xl font-bold gradient-text mb-4">{t('portfolio')}</h3>
              <p className="text-[var(--secondary-text)]">
                {t('thankYou')}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="space-y-4"
            >
              <h4 className="text-lg font-semibold mb-4">{t('quickLinks')}</h4>
              <nav className="grid grid-cols-2 gap-2">
                {[
                  { name: t('home'), link: 'home' },
                  { name: t('about'), link: 'about' },
                  { name: t('skills'), link: 'skills' },
                  { name: t('projects'), link: 'projects' },
                  { name: t('contact'), link: 'contact' }
                ].map((item) => (
                  <a
                    key={item.link}
                    href={`#${item.link}`}
                    className="text-[var(--secondary-text)] hover:text-[var(--text)] hover:translate-x-1 transition-all duration-300"
                  >
                    {item.name}
                  </a>
                ))}
              </nav>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h4 className="text-lg font-semibold mb-4">{t('connect')}</h4>
              <div className="flex space-x-4">
                <a
                  href="https://github.com/kcharles220"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-button p-2 hover:scale-110 transition-transform duration-300"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/in/carlospinto03/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-button p-2 hover:scale-110 transition-transform duration-300"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                <a
                  href="mailto:carlos.ppinto220@gmail.com"
                  className="glass-button p-2 hover:scale-110 transition-transform duration-300"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </a>
              </div>
            </motion.div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              className="mt-8 pt-8 border-t border-white/10 text-center"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <motion.p
                key={currentText}
                className="text-sm font-bold text-gray-400 "
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                {currentText}
              </motion.p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.footer>
  )
}