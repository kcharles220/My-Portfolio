'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl'

export default function NotFound() {
  const router = useRouter();
  const t = useTranslations('notFound');

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden bg-[var(--background)]">
      <div className="absolute -top-20 -right-20 w-[300px] h-[300px] bg-purple-500 rounded-full blur-[100px] opacity-30" />
      <div className="absolute -bottom-20 -left-20 w-[300px] h-[300px] bg-cyan-400 rounded-full blur-[100px] opacity-30" />

      <motion.div 
        className="glass-panel p-8 md:p-12 max-w-2xl w-full text-center relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="text-9xl font-bold gradient-text mb-6"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          404
        </motion.div>

        <motion.h1 
          className="text-2xl md:text-3xl mb-6 text-[var(--text)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {t('title')}
        </motion.h1>

        <motion.p 
          className="text-[var(--secondary-text)] mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {t('description')}
        </motion.p>

        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <button
            onClick={() => router.back()}
            className="px-6 py-2 rounded-lg transition-all duration-300 text-[var(--text)] border border-[var(--border)] hover:bg-white/5 cursor-pointer"
          >
            {t('goBack')}
          </button>
          
          <Link href="/" className="px-6 py-2 rounded-lg transition-all duration-300 bg-gradient-to-r from-purple-500 to-cyan-400 text-[var(--text)] font-medium">
            {t('returnHome')}
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}