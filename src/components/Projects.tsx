// File: src/components/Projects.js
'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'

const projects = [
  {
    title: "Blockchain Explorer",
    description: "A transparent blockchain explorer for tracking carbon offset initiatives on Hedera Hashgraph. Built for CO2Offset, to provide transparency to everyone.",
    tags: ["React", "API Integration", "Blockchain", "Chakra UI", "Docker", "Figma"],
    images: ["/My-Portfolio/images/explorer1.png", "/My-Portfolio/images/explorer2.png", "/My-Portfolio/images/explorer3.png", "/My-Portfolio/images/explorer4.png"], 
    Link: "explorer.co2offset.ai"
  },
  {
    title: "BetWise",
    description: "A betting platform that fetches games via external APIs, offering a zero-house-edge model with auto-adjusting odds based on supply and demand. Supports user logins and secure cookies.",
    tags: ["React", "Typescript", "Node.js", "MongoDB", "REST API", "Cookies"],
    images: ["/api/placeholder/600/400"],
    codeLink: "https://github.com/kcharles220/BetWise"
  },
  {
    title: "Point Of Sale Software",
    description: "A software designed for small businesses. Provides an easy-to-use interface for managing products, sales, clients and more.",
    tags: ["C#", "MongoDB"],
    images: ["/api/placeholder/600/400"],
    demoLink: "#",
    codeLink: "#"
  },
  {
    title: "GameZone",
    description: "A website with some JavaScript-powered games, playable instantly in the browser—no downloads needed.",
    tags: ["TypeScript", "React", "Express", "PostgreSQL", "Docker"],
    images: ["/api/placeholder/600/400"],
    demoLink: "#",
    codeLink: "#"
  }
];

interface Project {
  title: string;
  description: string;
  tags: string[];
  images: string[];  // Changed from single image to array
  demoLink?: string;
  codeLink?: string;
  Link?: string;
}

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const { resolvedTheme } = useTheme()
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setHovered] = useState(false);
  const [cardRef, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (!isHovered) return;
    
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => 
        prev === project.images.length - 1 ? 0 : prev + 1
      );
    }, 2000);

    return () => clearInterval(interval);
  }, [isHovered, project.images.length]);

  return (
    <motion.div
      ref={cardRef}
      className="glass-panel overflow-hidden group"
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setCurrentImageIndex(0); // Reset to first image when mouse leaves
      }}
    >
      <div className="relative overflow-hidden aspect-video">
        {project.images.map((image, imageIndex) => (
          <div
            key={image}
            className="absolute inset-0 transition-opacity duration-1000"
            style={{
              opacity: currentImageIndex === imageIndex ? 1 : 0,
            }}
          >
            <Image 
              src={image} 
              alt={`${project.title} - View ${imageIndex + 1}`}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102 rounded-md"
              fill
              loading="lazy"
            />
          </div>
        ))}
        
        {/* Image navigation dots */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
          {project.images.map((_, imageIndex) => (
            <button
              key={imageIndex}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                currentImageIndex === imageIndex 
                  ? 'bg-white scale-125' 
                  : 'bg-white/50 scale-100'
              }`}
              onClick={() => setCurrentImageIndex(imageIndex)}
            />
          ))}
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end rounded-md">
          <div className="p-6 w-full">
            <div className="flex gap-3 mb-4">
              {project.demoLink && (
                <a 
                  href={project.demoLink} 
                  className="glass-button text-sm"
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Live Demo
                </a>
              )}
              {project.codeLink && (
                <a 
                  href={project.codeLink} 
                  className="glass-button text-sm"
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  View Code
                </a>
              )}
              {project.Link && (
                <a 
                  href={project.Link} 
                  className="glass-button text-sm"
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Open
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 gradient-text">{project.title}</h3>
        <p className="text-[var(--secondary-text)] mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag: string) => (
            <span 
              key={tag} 
              className={`text-xs px-2 py-1 rounded-full glass-panel ${
                resolvedTheme !== 'dark' ? 'text-cyan-600' : 'text-cyan-300'
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default function Projects() {
  const [sectionRef, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="projects" ref={sectionRef} className="py-20 relative grid-background">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="section-title gradient-text">My Projects</h2>
          <p className="text-[var(--secondary-text)] max-w-2xl mx-auto">
            Here are some of the projects I&apos;ve worked on. Each one represents different skills and technologies I&apos;ve mastered.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <a 
            href="https://github.com/yourusername" 
            target="_blank" 
            rel="noopener noreferrer"
            className="glass-button glow"
          >
            See More on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
}