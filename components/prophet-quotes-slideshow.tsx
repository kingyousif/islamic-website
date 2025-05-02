"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/use-translation";
import { cn } from "@/lib/utils";

interface QuoteType {
  id: number;
  text: string;
  source: string;
}

export function ProphetQuotesSlideshow() {
  const { t } = useTranslation();
  const [currentQuote, setCurrentQuote] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Get quotes from translations
  const quotes: QuoteType[] = [
    {
      id: 1,
      text: t("prophetQuote1"),
      source: t("prophetQuoteSource1"),
    },
    {
      id: 2,
      text: t("prophetQuote2"),
      source: t("prophetQuoteSource2"),
    },
    {
      id: 3,
      text: t("prophetQuote3"),
      source: t("prophetQuoteSource3"),
    },
    {
      id: 4,
      text: t("prophetQuote4"),
      source: t("prophetQuoteSource4"),
    },
    {
      id: 5,
      text: t("prophetQuote5"),
      source: t("prophetQuoteSource5"),
    },
  ];

  // Auto-advance the slideshow
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      nextQuote();
    }, 8000);

    return () => clearInterval(interval);
  }, [currentQuote, isAutoPlaying]);

  const nextQuote = () => {
    setDirection(-1);
    setCurrentQuote((prev) => (prev === quotes.length - 1 ? 0 : prev + 1));
  };

  const prevQuote = () => {
    setDirection(1);
    setCurrentQuote((prev) => (prev === 0 ? quotes.length - 1 : prev - 1));
  };

  const goToQuote = (index: number) => {
    setDirection(index > currentQuote ? 1 : -1);
    setCurrentQuote(index);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  return (
    <div className="relative mx-auto max-w-4xl overflow-hidden rounded-xl bg-gradient-to-r from-primary/10 to-secondary/10 p-8 shadow-lg">
      <div className="absolute right-4 top-4 rounded-full bg-primary/20 p-2">
        <Quote className="h-6 w-6 text-primary" />
      </div>

      <div className="relative h-[300px]">
        <AnimatePresence custom={direction} initial={false} mode="sync">
          <motion.div
            key={currentQuote}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center"
          >
            <h3 className="mb-6 font-arabic text-2xl font-bold text-primary md:text-3xl">
              {quotes[currentQuote].text}
            </h3>
            <p className="font-arabic text-sm text-muted-foreground md:text-base">
              {quotes[currentQuote].source}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-8 flex items-center justify-between">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full border-primary/20 hover:bg-primary/10"
          onClick={prevQuote}
          aria-label={t("previousQuote")}
        >
          <ChevronRight className="h-5 w-5" />
        </Button>

        <div className="flex space-x-2 w-32 justify-between">
          {quotes.map((_, index) => (
            <button
              key={index}
              onClick={() => goToQuote(index)}
              className={cn(
                "h-2 w-2 rounded-full transition-all",
                currentQuote === index ? "bg-primary" : "bg-primary/30"
              )}
              aria-label={`${t("goToQuote")} ${index + 1}`}
            />
          ))}
        </div>

        <Button
          variant="outline"
          size="icon"
          className="rounded-full border-primary/20 hover:bg-primary/10"
          onClick={nextQuote}
          aria-label={t("nextQuote")}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
