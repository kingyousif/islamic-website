"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface SectionAnimationProps {
  children: ReactNode
  delay?: number
}

export function SectionAnimation({ children, delay = 0.2 }: SectionAnimationProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  )
}
