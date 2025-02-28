import { motion } from 'framer-motion'

export default function GooLoader() {
  return (
    <div className="goo-container">
      <motion.div
        className="goo-blob"
        animate={{
          scale: [1, 1.2, 0.9, 1.1, 1],
          x: [0, 30, -20, 10, 0],
          y: [0, -40, 20, -10, 0],
        }}
        transition={{
          duration: 8,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
    </div>
  )
}