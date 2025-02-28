'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    })
  }

  return (
    <motion.button
      className="z-50 w-12 h-12 rounded-full  overflow-hidden cursor-pointer"
      onClick={toggleTheme}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="relative w-full h-full">
        {/* Flashlight beam effect */}
        <motion.div
          className="absolute pointer-events-none"
          animate={{
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? 1.2 : 0.8
          }}
          style={{
            left: mousePosition.x,
            top: mousePosition.y,
            width: '150px',
            height: '150px',
            background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)',
            transform: 'translate(-50%, -50%)',
          }}
        />

        {/* Flashlight icon */}
        <motion.svg
          viewBox="0 0 24 24"
          className={`w-6 h-6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${
            theme === 'dark' ? 'text-yellow-300' : 'text-purple-600'
          }`}
          animate={{ rotate: theme === 'dark' ? 0 : 180 }}
        >
          <path
            fill="currentColor"
            d="M6 14l3 3v5h6v-5l3-3V9H6v5zm5-12h2v3h-2V2zM2 9h3v2H2V9zm19 0h3v2h-3V9zm-9 3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"
          />
        </motion.svg>
      </div>
    </motion.button>
  )
}