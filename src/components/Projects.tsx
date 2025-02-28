// File: src/components/Projects.js
'use client'

import { useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'

const projects = [
  {
    title: "E-Commerce Dashboard",
    description: "A comprehensive dashboard for online store management with real-time analytics, inventory tracking, and order processing.",
    tags: ["React", "Next.js", "Tailwind CSS", "Chart.js", "Firebase"],
    image: "/api/placeholder/600/400",
    demoLink: "#",
    codeLink: "#"
  },
  {
    title: "Social Media App",
    description: "A modern social networking platform with real-time messaging, news feed, and user profiles.",
    tags: ["React", "Node.js", "MongoDB", "Socket.io", "AWS"],
    image: "/api/placeholder/600/400",
    demoLink: "#",
    codeLink: "#"
  },
  {
    title: "Weather Forecast App",
    description: "A beautiful weather application with 7-day forecasts, location-based weather data, and interactive maps.",
    tags: ["JavaScript", "API Integration", "CSS3", "Responsive Design"],
    image: "/api/placeholder/600/400",
    demoLink: "#",
    codeLink: "#"
  },
  {
    title: "Task Management System",
    description: "A productivity tool for teams to manage projects, assign tasks, track progress, and meet deadlines.",
    tags: ["TypeScript", "React", "Express", "PostgreSQL", "Docker"],
    image: "/api/placeholder/600/400",
    demoLink: "#",
    codeLink: "#"
  }
];

interface Project {
  title: string;
  description: string;
  tags: string[];
  image: string;
  demoLink: string;
  codeLink: string;
}

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const [hovered, setHovered] = useState(false);
  const [cardRef, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={cardRef}
      className="glass-panel overflow-hidden group"
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative overflow-hidden aspect-video">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
          <div className="p-6 w-full">
            <div className="flex gap-3 mb-4">
              <a 
                href={project.demoLink} 
                className="glass-button text-sm"
                target="_blank" 
                rel="noopener noreferrer"
              >
                Live Demo
              </a>
              <a 
                href={project.codeLink} 
                className="glass-button text-sm"
                target="_blank" 
                rel="noopener noreferrer"
              >
                View Code
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 gradient-text">{project.title}</h3>
        <p className="text-gray-300 mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag: string) => (
            <span 
              key={tag} 
              className="text-xs px-2 py-1 rounded-full glass-panel text-cyan-300"
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
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="section-title gradient-text">My Projects</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Here are some of the projects I've worked on. Each one represents different skills and technologies I've mastered.
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