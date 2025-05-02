"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { useTranslation } from "@/hooks/use-translation"
import { Button } from "@/components/ui/button"
import { LoadingAnimation } from "@/components/loading-animation"
import { SectionAnimation } from "@/components/section-animation"
import { PenToolIcon as ToolsIcon } from "lucide-react"

export default function UnderMaintenance() {
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const { t } = useTranslation()

  useEffect(() => {
    // Simulate loading for better UX
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <LoadingAnimation />
  }

  return (
    <main className="container mx-auto flex min-h-screen flex-col items-center justify-center px-4 py-8 text-center">
      <SectionAnimation>
        <div className="flex flex-col items-center">
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="mb-6 rounded-full bg-muted p-6"
          >
            <ToolsIcon className="h-16 w-16 text-primary" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-4 text-4xl font-extrabold tracking-tight lg:text-5xl"
          >
            {t("underMaintenance")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-8 max-w-2xl text-lg text-muted-foreground"
          >
            {t("maintenanceDescription")}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Button size="lg" onClick={() => router.push("/")}>
              {t("backToHome")}
            </Button>
          </motion.div>
        </div>
      </SectionAnimation>
    </main>
  )
}
