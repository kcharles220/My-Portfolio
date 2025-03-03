// File: src/components/Skills.js
'use client'

import { useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

interface SkillBarProps {
  name: string;
  percentage: number;
  delay: number;
}

const SkillBar = ({ name, percentage, delay }: SkillBarProps) => {
  const [hovered, setHovered] = useState(false)
  
  return (
    <div 
      className="mb-6"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex justify-between mb-1">
        <span className="font-medium">{name}</span>
        <span className={`transition-opacity duration-300 ${hovered ? 'opacity-100' : 'opacity-0'}`}>
          {percentage}%
        </span>
      </div>
      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
        <motion.div 
          className="h-full bg-gradient-to-r from-purple-500 to-cyan-400"
          initial={{ width: 0 }}
          whileInView={{ width: `${percentage}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay }}
        ></motion.div>
      </div>
    </div>
  )
}

interface SkillCardProps {
  icon: string;
  name: string;
  description: string;
  delay: number;
}

const SkillCard = ({ icon, name, description, delay }: SkillCardProps) => {
  return (
    <motion.div 
      className="glass-panel p-6 relative overflow-hidden group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="absolute -right-6 -bottom-6 w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-cyan-400 opacity-20 group-hover:w-24 group-hover:h-24 transition-all duration-700"></div>
      
      <div className="text-4xl mb-4 text-cyan-400">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{name}</h3>
      <p className="text-[var(--secondary-text)]">{description}</p>
    </motion.div>
  )
}

export default function Skills() {
  const [sectionRef, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  
  const [activeTab, setActiveTab] = useState('technical')
  const t = useTranslations('skills');
  
  // Map tab IDs to translation keys
  const tabNames = {
    'technical': '1',
    'soft': '2',
    'tools': '3'
  };

  return (
    <section id="skills" ref={sectionRef} className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--background)] via-purple-900/10 to-[var(--background)] opacity-50"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.h2 
          className="section-title text-center gradient-text mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          {t('title')}
        </motion.h2>
        
        <div className="flex justify-center mb-12">
          <div className="inline-flex glass-panel p-1">
            {Object.entries(tabNames).map(([tab, translationKey]) => (
              <button
                key={tab}
                className={`px-6 w-50 py-2 rounded-lg transition-all duration-300 cursor-pointer ${
                  activeTab === tab 
                    ? 'bg-gradient-to-r from-purple-500 to-cyan-400 text-[var(--text)] font-medium' 
                    : 'text-[var(--secondary-text)] hover:text-[var(--text)]'
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {t(translationKey)}
              </button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-8">
          {activeTab === 'technical' && (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="glass-panel p-6">
                <h3 className="text-xl font-bold mb-6">{t('Frontend')}</h3>
                <SkillBar name={t('111')} percentage={90} delay={0.1} />
                <SkillBar name={t('112')} percentage={85} delay={0.2} />
                <SkillBar name={t('113')} percentage={95} delay={0.3} />
                <SkillBar name={t('114')} percentage={90} delay={0.4} />
                <SkillBar name={t('115')} percentage={75} delay={0.5} />
              </div>
              
              <div className="glass-panel p-6">
                <h3 className="text-xl font-bold mb-6">{t('Backend')}</h3>
                <SkillBar name={t('121')} percentage={80} delay={0.1} />
                <SkillBar name={t('122')} percentage={75} delay={0.2} />
                <SkillBar name={t('123')} percentage={85} delay={0.3} />
                <SkillBar name={t('124')} percentage={90} delay={0.4} />
                <SkillBar name={t('125')} percentage={70} delay={0.5} />
              </div>
            </motion.div>
          )}
          
          {activeTab === 'soft' && (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <SkillCard 
                icon="🧠"
                name={t('211')}
                description={t('212')}
                delay={0.1}
              />
              <SkillCard 
                icon="👥"
                name={t('221')}
                description={t('222')}
                delay={0.2}
              />
              <SkillCard 
                icon="💬"
                name={t('231')}
                description={t('232')}
                delay={0.3}
              />
              <SkillCard 
                icon="🔄"
                name={t('241')}
                description={t('242')}
                delay={0.4}
              />
              <SkillCard 
                icon="⏱️"
                name={t('251')}
                description={t('252')}
                delay={0.5}
              />
              <SkillCard 
                icon="👑"
                name={t('261')}
                description={t('262')}
                delay={0.6}
              />
            </motion.div>
          )}
          
          {activeTab === 'tools' && (
            <motion.div 
              className="glass-panel p-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { name: "Git & GitHub", icon: "📂" },
                  { name: "VS Code", icon: "👨‍💻" },
                  { name: "Docker", icon: "🐳" },
                  { name: "AWS", icon: "☁️" },
                  { name: "Firebase", icon: "🔥" },
                  { name: "MongoDB", icon: "🍃" },
                  { name: "PostgreSQL", icon: "🐘" },
                  { name: "Figma", icon: "🎨" }
                ].map((tool, index) => (
                  <motion.div 
                    key={tool.name}
                    className="text-center p-4 glass-panel hover:bg-white/10 transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.1, delay: index * 0.1 }}
                  >
                    <div className="text-3xl mb-2">{tool.icon}</div>
                    <div>{tool.name}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}