// File: src/components/About.js
'use client'

import React from 'react'
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'

export default function About() {
  const {resolvedTheme} = useTheme()
  const [sectionRef, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="about" ref={sectionRef} className="py-20 relative grid-background">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="section-title text-center gradient-text mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          About Me
        </motion.h2>
        
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <motion.div 
            className="md:w-2/5"
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="glass-panel p-6 relative overflow-hidden group">
              <div className="absolute -right-10 -top-10 w-24 h-24 bg-purple-500 opacity-30 rounded-full blur-xl group-hover:w-32 group-hover:h-32 transition-all duration-700"></div>
              <div className="absolute -left-10 -bottom-10 w-24 h-24 bg-cyan-400 opacity-30 rounded-full blur-xl group-hover:w-32 group-hover:h-32 transition-all duration-700"></div>
              
              <h3 className="text-xl font-bold mb-4">Who I Am</h3>
              <p className="text-[var(--secondary-text)] mb-4">
                I&apos;m a computer science student and aspiring developer with a passion for creating elegant, efficient solutions to complex problems. My journey in technology began when I was 14, tinkering with HTML and CSS to build simple websites.
              </p>
              <p className="text-[var(--secondary-text)]">
                Today, I specialize in full-stack development with particular interest in web applications, user experience design, and modern JavaScript frameworks. I love learning new technologies and applying them to create innovative projects.
              </p>
            </div>
          </motion.div>
          
          <motion.div 
            className="md:w-3/5"
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <div className="glass-panel p-6 relative">
              <h3 className="text-xl font-bold mb-6">My Journey</h3>
              
              {/* Timeline container using grid */}
              <div className="grid grid-cols-[120px_40px_1fr] ">
                {[
                  {
                    year: "2021 - Present",
                    title: "Computer Science Student",
                    description: "Pursuing a degree in Computer Science with focus on software engineering and web development."
                  },
                  {
                    year: "2020 - 2021",
                    title: "Freelance Web Developer",
                    description: "Built websites and web applications for small businesses and startups."
                  },
                  {
                    year: "2019 - 2020",
                    title: "Summer Internship",
                    description: "Worked as a junior developer intern, gaining hands-on experience with real-world projects."
                  }
                ].map((item, index, array) => (
                  <React.Fragment key={index}>
                    {/* Year column */}
                    <div className="text-right text-[var(--secondary-text)] font-semibold pr-4 pt-1">
                      {item.year}
                    </div>

                    {/* Timeline bar and dot column */}
                    <div className="relative">
                      <div className={`absolute left-1/2 w-0.5 bg-gradient-to-b from-purple-500 via-cyan-400 to-pink-500 transform -translate-x-1/2  ${index === array.length - 1 ? 'h-3/4' : 'h-full'}`}></div>
                      <div className="absolute top-1.5 left-1/2 w-3 h-3 rounded-full border-2 border-cyan-400 bg-black transform -translate-x-1/2"></div>
                    </div>

                    {/* Content column */}
                    <div className={`glass-panel p-4 ml-[-4] mr-4 cursor-pointer transition-all duration-300 mb-8 ${resolvedTheme === 'dark' ? 'hover:bg-[rgba(62,62,63,1)]' : 'bg-gray-100 hover:bg-white'} hover:ml-4 hover:mr-[-4]`}>
                      <h4 className="text-lg font-semibold text-[var(--text)] mb-1">{item.title}</h4>
                      <p className="text-[var(--secondary-text)]">{item.description}</p>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}