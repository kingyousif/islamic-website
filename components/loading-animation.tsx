"use client"

import { motion } from "framer-motion"
import { QuranIcon } from "@/components/quran-icon"

export function LoadingAnimation() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-b from-primary/20 to-background">
      <div className="flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.5,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
          className="rounded-full bg-primary/20 p-6 backdrop-blur-sm"
        >
          <QuranIcon className="h-16 w-16 text-primary" />
        </motion.div>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 200 }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
          }}
          className="mt-8 h-1 rounded-full bg-primary"
        />
      </div>
    </div>
  )
}
