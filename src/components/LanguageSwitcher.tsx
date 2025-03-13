'use client';

import { useLanguage } from '@/components/LanguageProvider';
import { useState, useRef, useEffect } from 'react';
import { FiGlobe } from 'react-icons/fi';
import { motion } from 'framer-motion';

export default function LanguageSwitcher() {
  const { locale, changeLocale } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const languages = [
    { code: 'en', label: 'EN' },
    { code: 'pt', label: 'PT' }
  ];
  
  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Main button */}
      <motion.button 
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={handleMouseMove}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="z-50 w-12 h-12 rounded-full overflow-hidden cursor-pointer align-center flex items-center justify-center"
      >
        <div className="relative w-full h-full">
          {/* Hover effect */}
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
          
          {/* Globe icon */}
          <FiGlobe className="w-5 h-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[var(--text)]" />
        </div>
      </motion.button>

      {/* Dropdown menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className=" backdrop-blur-sm bg-white/5 absolute top-full mt-2 right-0 z-50 overflow-hidden rounded-md  border border-[var(--some-border-color)]/20 shadow-lg"
        >
          <div className="p-1 flex flex-col gap-1">
            {languages.map((lang) => (
              <motion.button
                key={lang.code}
                onClick={() => {
                  changeLocale(lang.code as 'en' | 'pt');
                  setIsOpen(false);
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-2 rounded-lg transition-all duration-200 cursor-pointer ${
                  locale === lang.code 
                    ? 'text-[var(--background)] bg-[var(--text)]/90' 
                    : 'hover:bg-[var(--some-border-color)]/50 text-[var(--text)]'
                }`}
              >
                {lang.label}
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}