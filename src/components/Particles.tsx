'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  opacity: number
}

export default function Particles() {
  const { theme } = useTheme()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const contextRef = useRef<CanvasRenderingContext2D | null>(null)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const animationFrameRef = useRef<number | null>(null)

  // Move constants inside useEffect or make them useRef/useMemo
  const particleConfig = useRef({
    PARTICLE_COUNT: 100,
    PARTICLE_SIZE_RANGE: { min: 1, max: 3 },
    PARTICLE_SPEED: 0.35,
    CONNECTION_DISTANCE: 150,
    MOUSE_INFLUENCE_DISTANCE: 80,
    MOUSE_REPEL_STRENGTH: 0.5
  })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Use config from ref
    const { 
      PARTICLE_COUNT, 
      PARTICLE_SIZE_RANGE, 
      PARTICLE_SPEED,
      CONNECTION_DISTANCE,
      MOUSE_INFLUENCE_DISTANCE,
      MOUSE_REPEL_STRENGTH 
    } = particleConfig.current

    // Initialize canvas context
    const context = canvas.getContext('2d')
    if (!context) return
    contextRef.current = context

    // Set canvas size
    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    handleResize()
    window.addEventListener('resize', handleResize)

    // Initialize particles
    particlesRef.current = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * (PARTICLE_SIZE_RANGE.max - PARTICLE_SIZE_RANGE.min) + PARTICLE_SIZE_RANGE.min,
      speedX: (Math.random() - 0.5) * PARTICLE_SPEED,
      speedY: (Math.random() - 0.5) * PARTICLE_SPEED,
      opacity: Math.random() * 0.5 + 0.3
    }))

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY
      }
    }
    window.addEventListener('mousemove', handleMouseMove)

    // Animation loop
    const animate = () => {
      if (!canvas || !context) return

      context.clearRect(0, 0, canvas.width, canvas.height)
      context.globalCompositeOperation = 'lighter'

      particlesRef.current.forEach((particle, i) => {
        // Update particle position
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Mouse influence
        const dx = mouseRef.current.x - particle.x
        const dy = mouseRef.current.y - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < MOUSE_INFLUENCE_DISTANCE) {
          const force = (MOUSE_INFLUENCE_DISTANCE - distance) / MOUSE_INFLUENCE_DISTANCE
          particle.x -= dx * force * MOUSE_REPEL_STRENGTH
          particle.y -= dy * force * MOUSE_REPEL_STRENGTH
        }

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1

        const particleColor = theme === 'dark' ? '255, 255, 255' : '0, 0, 0'
        
        // Draw particle
        context.beginPath()
        context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        context.fillStyle = `rgba(${particleColor}, ${particle.opacity})`
        context.fill()

        // Draw connections
        particlesRef.current.slice(i + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < CONNECTION_DISTANCE) {
            const opacity = (1 - distance / CONNECTION_DISTANCE) * 0.2
            context.beginPath()
            context.moveTo(particle.x, particle.y)
            context.lineTo(otherParticle.x, otherParticle.y)
            context.strokeStyle = `rgba(${particleColor}, ${opacity})`
            context.lineWidth = 0.5
            context.stroke()
          }
        })
      })

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [theme]) // Add theme as a dependency

  return (
    <motion.canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    />
  )
}