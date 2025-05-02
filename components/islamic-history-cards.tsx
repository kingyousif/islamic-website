"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslation } from "@/hooks/use-translation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface HistoryPeriod {
  id: string;
  title: string;
  description: string;
  content: string;
  image: string;
  years: string;
}

export function IslamicHistoryCards() {
  const { t } = useTranslation();
  const [selectedPeriod, setSelectedPeriod] = useState<string>("early");

  const historyPeriods: HistoryPeriod[] = [
    {
      id: "early",
      title: t("earlyIslam"),
      description: t("earlyIslamDesc"),
      content: t("earlyIslamContent"),
      image: "images/start-islam.jpg",
      years: "610-661 زایینی",
    },
    {
      id: "golden",
      title: t("goldenAge"),
      description: t("goldenAgeDesc"),
      content: t("goldenAgeContent"),
      image: "images/golden-age.png",
      years: "750-1258 زایینی",
    },
    {
      id: "ottoman",
      title: t("ottomanEra"),
      description: t("ottomanEraDesc"),
      content: t("ottomanEraContent"),
      image: "images/osmani.jpg",
      years: "1299-1922 زایینی",
    },
    {
      id: "modern",
      title: t("modernEra"),
      description: t("modernEraDesc"),
      content: t("modernEraContent"),
      image: "images/new age.jpg",
      years: "1922-بەردەوامە",
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="mx-auto max-w-6xl">
      <Tabs
        defaultValue="early"
        value={selectedPeriod}
        onValueChange={setSelectedPeriod}
        className="w-full"
      >
        <TabsList className="mb-8 grid w-full grid-cols-2 gap-4 bg-transparent md:grid-cols-4">
          {historyPeriods.map((period) => (
            <TabsTrigger
              key={period.id}
              value={period.id}
              className="rounded-lg border border-primary/20 bg-card data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <span className="font-arabic">{period.title}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {historyPeriods.map((period) => (
          <TabsContent key={period.id} value={period.id} className="mt-0">
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="grid gap-8 md:grid-cols-2"
            >
              <motion.div
                variants={item}
                className="overflow-hidden rounded-xl"
              >
                <Image
                  src={period.image || "/placeholder.svg"}
                  alt={period.title}
                  width={600}
                  height={400}
                  className="h-full w-full object-cover mt-4 md:mt-0 rounded-xl"
                />
              </motion.div>

              <motion.div variants={item}>
                <Card className="h-full border-primary/10" dir="rtl">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="font-arabic text-2xl">
                        {period.title}
                      </CardTitle>
                      <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                        {period.years}
                      </span>
                    </div>
                    <CardDescription className="font-arabic">
                      {period.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="font-arabic">{period.content}</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full font-arabic">
                      {t("learnMore")}
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            </motion.div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
