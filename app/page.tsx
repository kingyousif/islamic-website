"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslation } from "@/hooks/use-translation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LoadingAnimation } from "@/components/loading-animation";
import { SectionAnimation } from "@/components/section-animation";
import { QuranIcon } from "@/components/quran-icon";
import { ProphetQuotesSlideshow } from "@/components/prophet-quotes-slideshow";
import { IslamicHistoryCards } from "@/components/islamic-history-cards";
import { QuestionOfTheDay } from "@/components/question-of-the-day";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { t } = useTranslation();

  useEffect(() => {
    // Simulate loading for better UX
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleGetStarted = () => {
    router.push("/under-maintenance");
  };

  if (isLoading) {
    return <LoadingAnimation />;
  }

  return (
    <main className="container mx-auto px-4 py-0">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-xl">
        {/* Background with overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/quran-cover.jpg"
            alt="Quran Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/20 to-background/95" />
        </div>

        <SectionAnimation>
          <div className="relative z-10 flex min-h-[90vh] flex-col items-center justify-center py-16 text-center">
            <div className="mb-6 rounded-full bg-primary/20 p-4 backdrop-blur-sm">
              <QuranIcon className="h-16 w-16 text-primary-foreground" />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-6 max-w-3xl"
            >
              <h1 className="mb-4 font-arabic text-4xl font-bold tracking-tight text-primary-foreground md:text-5xl lg:text-6xl">
                {t("quranQA")}
              </h1>
              <p className="mx-auto mb-8 max-w-2xl font-arabic text-xl text-primary-foreground/90 md:text-2xl">
                {t("heroDescription")}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col gap-4 sm:flex-row"
            >
              <Button
                size="lg"
                onClick={handleGetStarted}
                className="bg-white px-8 text-lg font-bold text-primary hover:bg-white/90"
              >
                {t("getStarted")}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white px-8 text-lg font-bold  hover:bg-white/10"
              >
                {t("learnMore")}
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-16 flex flex-wrap items-center justify-center gap-8"
            >
              <div className="flex flex-col items-center">
                <span className="text-3xl font-bold text-white">1000+</span>
                <span className="text-sm text-white/80">{t("question")}</span>
              </div>
              <div className="h-10 w-px bg-white/20" />
              <div className="flex flex-col items-center">
                <span className="text-3xl font-bold text-white">114</span>
                <span className="text-sm text-white/80">{t("surahs")}</span>
              </div>
              <div className="h-10 w-px bg-white/20" />
              <div className="flex flex-col items-center">
                <span className="text-3xl font-bold text-white">10K+</span>
                <span className="text-sm text-white/80">{t("users")}</span>
              </div>
            </motion.div>
          </div>
        </SectionAnimation>
      </section>

      {/* Section 1: Prophet Muhammad Quotes Slideshow */}
      <SectionAnimation delay={0.2}>
        <div className="py-16">
          <h2 className="mb-8 text-center font-arabic text-3xl font-bold">
            {t("prophetQuotes")}
          </h2>
          <ProphetQuotesSlideshow />
        </div>
      </SectionAnimation>

      {/* Section 2: Islamic History Overview */}
      <SectionAnimation delay={0.3}>
        <div className="py-16 bg-muted/30 rounded-xl">
          <h2 className="mb-8 text-center font-arabic text-3xl font-bold">
            {t("islamicHistory")}
          </h2>
          <IslamicHistoryCards />
        </div>
      </SectionAnimation>

      {/* Section 3: Question of the Day */}
      <SectionAnimation delay={0.4}>
        <div className="py-16">
          <h2 className="mb-8 text-center font-arabic text-3xl font-bold">
            {t("questionOfTheDay")}
          </h2>
          <QuestionOfTheDay />
        </div>
      </SectionAnimation>

      {/* Featured Questions Section */}
      <SectionAnimation delay={0.5}>
        <div className="py-16">
          <h2 className="mb-8 text-center font-arabic text-3xl font-bold">
            {t("featuredQuestions")}
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredQuestions.map((question, index) => (
              <Card key={index} className="overflow-hidden border-primary/10">
                <CardHeader>
                  <CardTitle className="font-arabic">
                    {t(`questions.${index}.title`)}
                  </CardTitle>
                  <CardDescription className="font-arabic">
                    {t(`questions.${index}.description`)}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="font-arabic">
                    {t(`questions.${index}.content`)}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full font-arabic">
                    {t("readMore")}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </SectionAnimation>

      {/* Community Section */}
      <SectionAnimation delay={0.6}>
        <div className="rounded-lg bg-muted p-8 text-center">
          <h2 className="mb-4 font-arabic text-2xl font-bold">
            {t("joinCommunity")}
          </h2>
          <p className="mb-6 font-arabic text-muted-foreground">
            {t("communityDescription")}
          </p>
          <Button
            variant="secondary"
            onClick={handleGetStarted}
            className="font-arabic"
          >
            {t("joinNow")}
          </Button>
        </div>
      </SectionAnimation>
    </main>
  );
}

// Placeholder data
const featuredQuestions = [{ id: 0 }, { id: 1 }, { id: 2 }];
