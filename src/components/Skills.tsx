// File: src/components/Skills.js
'use client'

import { useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'

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
      <p className="text-gray-300">{description}</p>
    </motion.div>
  )
}

export default function Skills() {
  const [sectionRef, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  
  const [activeTab, setActiveTab] = useState('technical')

  return (
    <section id="skills" ref={sectionRef} className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--background)] via-purple-900/10 to-[var(--background)] opacity-50"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.h2 
          className="section-title text-center gradient-text mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          My Skills
        </motion.h2>
        
        <div className="flex justify-center mb-12">
          <div className="inline-flex glass-panel p-1">
            {['technical', 'soft', 'tools'].map((tab) => (
              <button
                key={tab}
                className={`px-6 w-50 py-2 rounded-lg transition-all duration-300  cursor-pointer ${
                  activeTab === tab 
                    ? 'bg-gradient-to-r from-purple-500 to-cyan-400 text-white font-medium' 
                    : 'text-gray-300 hover:text-white'
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
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
                <h3 className="text-xl font-bold mb-6">Frontend Development</h3>
                <SkillBar name="JavaScript / TypeScript" percentage={90} delay={0.1} />
                <SkillBar name="React / Next.js" percentage={85} delay={0.2} />
                <SkillBar name="HTML5 / CSS3" percentage={95} delay={0.3} />
                <SkillBar name="Tailwind CSS" percentage={90} delay={0.4} />
                <SkillBar name="Framer Motion" percentage={75} delay={0.5} />
              </div>
              
              <div className="glass-panel p-6">
                <h3 className="text-xl font-bold mb-6">Backend Development</h3>
                <SkillBar name="Node.js / Express" percentage={80} delay={0.1} />
                <SkillBar name="Python / Django" percentage={75} delay={0.2} />
                <SkillBar name="Database Design" percentage={85} delay={0.3} />
                <SkillBar name="API Development" percentage={90} delay={0.4} />
                <SkillBar name="Authentication / Security" percentage={70} delay={0.5} />
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
                name="Problem Solving"
                description="Analytical approach to breaking down complex problems and finding elegant solutions."
                delay={0.1}
              />
              <SkillCard 
                icon="👥"
                name="Teamwork"
                description="Effective collaboration with cross-functional teams to achieve project goals."
                delay={0.2}
              />
              <SkillCard 
                icon="🔄"
                name="Adaptability"
                description="Quick to learn and adapt to new technologies and changing requirements."
                delay={0.3}
              />
              <SkillCard 
                icon="📚"
                name="Continuous Learning"
                description="Passion for staying updated with the latest industry trends and technologies."
                delay={0.4}
              />
              <SkillCard 
                icon="🎯"
                name="Attention to Detail"
                description="Meticulous focus on code quality, performance, and user experience."
                delay={0.5}
              />
              <SkillCard 
                icon="⏱️"
                name="Time Management"
                description="Efficient prioritization of tasks to meet deadlines while maintaining quality."
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
                    transition={{ duration: 0.3, delay: index * 0.1 }}
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