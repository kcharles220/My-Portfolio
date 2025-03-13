'use client'

import { useState, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { motion, AnimatePresence } from 'framer-motion'
import emailjs from '@emailjs/browser';
import { useTranslations } from 'next-intl';

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!;
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

const StatusToast = ({ status, message }: { status: 'sending' | 'success' | 'error'; message: string }) => {
  const variants = {
    hidden: { opacity: 0, y: 20 }, 
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 } 
  };

  const toastStyles = {
    sending: {
      bgColor: 'bg-cyan-400/20', 
      borderColor: 'border-cyan-400/30',
      textColor: 'text-cyan-400',
      icon: (
        <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
        </svg>
      )
    },
    success: {
      bgColor: 'bg-green-400/20',
      borderColor: 'border-green-400/30', 
      textColor: 'text-green-400',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
        </svg>
      )
    },
    error: {
      bgColor: 'bg-red-400/20', 
      borderColor: 'border-red-400/30',
      textColor: 'text-red-400',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      )
    }
  };

  const style = toastStyles[status];

  return (
    <motion.div
      className={`fixed bottom-8 left-1/2 transform -translate-x-1/2 w-[90%] max-w-md glass-panel ${style.bgColor} border ${style.borderColor} rounded-lg p-4 shadow-lg shadow-black/20 z-50 flex items-center gap-3`}
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={variants}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className={`p-2 rounded-full ${style.bgColor} ${style.textColor}`}>
        {style.icon}
      </div>
      <p className={`${style.textColor} font-medium`}>{message}</p>
    </motion.div>
  );
};

export default function Contact() {
  const t = useTranslations('contact');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  
  const [formStatus, setFormStatus] = useState<'sending' | 'success' | 'error' | null>(null)
  const [error, setError] = useState<string | null>(null)

  const [sectionRef, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  useEffect(() => {
    emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!);
  }, []);

  // Auto-dismiss success/error messages after 5 seconds
  useEffect(() => {
    if (formStatus === 'success' || formStatus === 'error') {
      const timer = setTimeout(() => {
        setFormStatus(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [formStatus]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('sending');

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
        PUBLIC_KEY
      );

      setFormStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Error sending email:', error);
      setFormStatus('error');
      setError(t('error'));
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  return (
    <section id="contact" ref={sectionRef} className="py-20 relative w-full overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--background)] via-purple-900/10 to-[var(--background)] opacity-50"></div>
      
      {/* Toast Notifications */}
      <AnimatePresence>
        {formStatus === 'sending' && (
          <StatusToast status="sending" message={t('sending')} />
        )}
        {formStatus === 'success' && (
          <StatusToast status="success" message={t('success')} />
        )}
        {formStatus === 'error' && (
          <StatusToast status="error" message={error || t('error')} />
        )}
      </AnimatePresence>
      
      <div className="max-w-[2000px] w-full mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="section-title gradient-text">{t('title')}</h2>
          <p className="text-[var(--secondary-text)] max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
          <div className="mt-4 text-amber-400 font-medium bg-amber-400/10 border border-amber-400/20 rounded-lg p-3 max-w-2xl mx-auto">
            ⚠️ {t('warning')}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
          <motion.div
            className="md:col-span-2"
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="glass-panel p-4 md:p-6 opacity-50 cursor-not-allowed">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">{t('name')}</label>
                  <input
                    disabled
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 glass-panel bg-white/5 border-0 cursor-not-allowed"
                    placeholder={t('namePlaceholder')}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">{t('email')}</label>
                  <input
                  disabled
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 glass-panel bg-white/5 border-0 cursor-not-allowed"
                    placeholder={t('emailPlaceholder')}
                    required
                  />
                </div>
              </div>
              <div className="mb-6">
                <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-1">{t('subject')}</label>
                <input
                disabled
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-2 glass-panel bg-white/5 border-0 cursor-not-allowed"
                  placeholder={t('subjectPlaceholder')}
                  required
                />
              </div>
              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">{t('message')}</label>
                <textarea
                disabled
                  id="message"
                  name="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-2 glass-panel bg-white/5 border-0 resize-none cursor-not-allowed"
                  placeholder={t('messagePlaceholder')}
                  required
                ></textarea>
              </div>
              <button
              disabled
                type="submit"
                className={`glass-button glow px-6 py-3 cursor-not-allowed ${formStatus === 'sending' ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {t('submit')}
              </button>
            </form>
          </motion.div>

          <motion.div
            className="md:col-span-1"
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <div className="glass-panel p-4 md:p-6 h-full flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold mb-6">{t('contactInfo')}</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="p-2 glass-panel rounded-full text-cyan-400 flex-shrink-0">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                      </svg>
                    </div>
                    <div className="overflow-hidden">
                      <h4 className="font-medium">{t('emailLabel')}</h4>
                      <a href="mailto:carlos.ppinto220@gmail.com" className="text-[var(--secondary-text)] hover:text-[var(--text)] transition-colors break-all">carlos.ppinto220@gmail.com</a>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="p-2 glass-panel rounded-full text-cyan-400 flex-shrink-0">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium">{t('locationLabel')}</h4>
                      <p className="text-[var(--secondary-text)]">{t('location')}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <h4 className="font-medium mb-4">{t('connect')}</h4>
                <div className="flex gap-4">
                  <a href="https://github.com/kcharles220" target="_blank" rel="noopener noreferrer" className="p-2 glass-panel rounded-full text-[var(--secondary-text)] hover:text-[var(--text)] transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"></path></svg>
                  </a>
                  <a href="https://www.linkedin.com/in/carlospinto03" target="_blank" rel="noopener noreferrer" className="p-2 glass-panel rounded-full text-[var(--secondary-text)] hover:text-[var(--text)] transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path></svg>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}