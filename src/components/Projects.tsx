// File: src/components/Projects.js
'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'
import { useTranslations } from 'next-intl'

// Create a global cache to track loaded images
const loadedImages: { [key: string]: boolean } = {}

type Translator = (key: string) => string;
const ProjectCard = ({ project, index, t }: { project: Project; index: number; t: Translator }) => {
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

  // Mark all project images as preloaded
  useEffect(() => {
    project.images.forEach(img => {
      loadedImages[img] = true;
    });
  }, [project.images]);

  return (
    <motion.div
      ref={cardRef}
      className="glass-panel overflow-hidden group flex flex-col h-full"
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
              {...(loadedImages[image] ? { placeholder: "empty" } : {})}
            />
          </div>
        ))}

        {/* Image navigation dots */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
          {project.images.map((_, imageIndex) => (
            <button
              key={imageIndex}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${currentImageIndex === imageIndex
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
                  {t('liveDemo')}
                </a>
              )}
              {project.codeLink && (
                <a
                  href={project.codeLink}
                  className="glass-button text-sm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t('viewCode')}
                </a>
              )}
              {project.Link && (
                <a
                  href={project.Link}
                  className="glass-button text-sm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t('open')}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold mb-2 gradient-text">{project.title}</h3>
        <p className="text-[var(--secondary-text)] mb-4">{t(project.descriptionKey)}</p>
        <div className="mt-auto flex flex-wrap gap-2">
          {project.tags.map((tag: string) => (
            <span
              key={tag}
              className={`text-xs px-2 py-1 rounded-full glass-panel ${resolvedTheme !== 'dark' ? 'text-cyan-600' : 'text-cyan-300'
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

interface Project {
  title: string;
  descriptionKey: string;
  tags: string[];
  images: string[];
  demoLink?: string;
  codeLink?: string;
  Link?: string;
}

export default function Projects() {
  const t = useTranslations('projects');
  const [sectionRef, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const projects: Project[] = [
    {
      title: "Blockchain Explorer",
      descriptionKey: "explorer",
      tags: ["React", "API Integration", "Blockchain", "Chakra UI", "Docker", "Figma"],
      images: ["/My-Portfolio/images/explorer1.png", "/My-Portfolio/images/explorer2.png", "/My-Portfolio/images/explorer3.png", "/My-Portfolio/images/explorer4.png"],
      //Link: "https://explorer.co2offset.ai"
    },
    {
      title: "WiseBet",
      descriptionKey: "betwise",
      tags: ["Next.js", "Typescript", "Node.js", "MongoDB", "REST API", "Cookies", "Authentication"],
      images: ['/My-Portfolio/images/betwise1.png',
        '/My-Portfolio/images/betwise2.png',
        '/My-Portfolio/images/betwise3.png',],
      codeLink: "https://github.com/kcharles220/BetWise"
    },
    /*
    {
      title: "Point Of Sale Software",
      descriptionKey: "pos",
      tags: ["C#", ".NET MAUI", "SQLite"],
      images: ['/My-Portfolio/images/pos1.png',
        '/My-Portfolio/images/pos2.png'],


    },*/
    {
      title: "Disputed!",
      descriptionKey: "disputed",
      tags: ["Next.js", "Node.js", "Express", "MongoDB", "Socket.IO", "Tailwind CSS", "CI/CD", "Vercel", "AI Integration"],
      images: ['/My-Portfolio/images/disputed1.png',
        '/My-Portfolio/images/disputed2.png',
        '/My-Portfolio/images/disputed3.png',
      ],
      Link: "https://disputed.vercel.app",
      codeLink: "https://github.com/kcharles220/disputed"
    },
    {
      title: "GameZone",
      descriptionKey: "gamezone",
      tags: ["JavaScript", "HTML", "CSS", "Vite", "Three.js"],
      images: ['/My-Portfolio/images/gamezone1.png',
        '/My-Portfolio/images/gamezone2.png',
        '/My-Portfolio/images/gamezone3.png',],

    }
  ];

  return (
    <section id="projects" ref={sectionRef} className="py-20 relative grid-background">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="section-title gradient-text">{t('title')}</h2>
          <p className="text-[var(--secondary-text)] max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} t={t} />
          ))}
        </div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <a
            href="https://github.com/kcharles220"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-button glow"
          >
            {t('seeMore')}
          </a>
        </motion.div>
      </div>
    </section>
  );
}