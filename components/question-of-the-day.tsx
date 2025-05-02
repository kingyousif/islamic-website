"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "@/hooks/use-translation";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CheckCircle2, XCircle, HelpCircle } from "lucide-react";

interface Answer {
  id: string;
  text: string;
  isCorrect: boolean;
}

export function QuestionOfTheDay() {
  const { t } = useTranslation();
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0); // State for question rotatio
  // Get today's date to show a consistent question for the day
  const today = new Date().toISOString().split("T")[0];
  const [tryagain, setTryagain] = useState(false);

  useEffect(() => {
    if (questionIndex >= 4) {
      setQuestionIndex(0);
    } else {
      setQuestionIndex((prev) => prev + 1);
    }
  }, [tryagain]);
  const question = t(`questionOfDay${questionIndex + 1}`);
  const explanation = t(`questionOfDay${questionIndex + 1}Explanation`);

  const answers: Answer[] = [
    {
      id: "a",
      text: t(`questionOfDay${questionIndex + 1}AnswerA`),
      isCorrect: t(`questionOfDay${questionIndex + 1}Correct`) === "A",
    },
    {
      id: "b",
      text: t(`questionOfDay${questionIndex + 1}AnswerB`),
      isCorrect: t(`questionOfDay${questionIndex + 1}Correct`) === "B",
    },
    {
      id: "c",
      text: t(`questionOfDay${questionIndex + 1}AnswerC`),
      isCorrect: t(`questionOfDay${questionIndex + 1}Correct`) === "C",
    },
    {
      id: "d",
      text: t(`questionOfDay${questionIndex + 1}AnswerD`),
      isCorrect: t(`questionOfDay${questionIndex + 1}Correct`) === "D",
    },
  ];

  const handleSubmit = () => {
    if (!selectedAnswer) return;

    const correct =
      answers.find((answer) => answer.id === selectedAnswer)?.isCorrect ||
      false;
    setIsCorrect(correct);
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setSelectedAnswer(null);
    setIsSubmitted(false);
    setTryagain((prev) => !prev);
  };

  return (
    <div className="mx-auto max-w-3xl">
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-secondary/20 to-background p-8 shadow-lg">
        <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-secondary/10 opacity-70" />
        <div className="absolute -left-10 -bottom-10 h-32 w-32 rounded-full bg-secondary/10 opacity-50" />

        <div className="relative">
          <div className="mb-2 flex items-center">
            <HelpCircle className="mr-2 h-5 w-5 text-secondary" />
            <p className="text-sm font-medium ms-2">{today}</p>
          </div>

          <h3 className="mb-6 font-arabic text-2xl font-bold">{question}</h3>

          <RadioGroup
            value={selectedAnswer || ""}
            onValueChange={setSelectedAnswer}
            className="space-y-4"
            dir="rtl"
          >
            {answers.map((answer) => (
              <div
                key={answer.id}
                className={`relative flex items-center rounded-lg border transition-all ${
                  isSubmitted && answer.isCorrect
                    ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                    : isSubmitted &&
                      selectedAnswer === answer.id &&
                      !answer.isCorrect
                    ? "border-red-500 bg-red-50 dark:bg-red-900/20"
                    : "border-muted hover:border-secondary/50"
                }`}
              >
                <RadioGroupItem
                  value={answer.id}
                  id={`answer-${answer.id}`}
                  disabled={isSubmitted}
                  className="border-muted ms-2"
                />
                <Label
                  htmlFor={`answer-${answer.id}`}
                  className="flex w-full cursor-pointer font-arabic py-4 ps-4"
                >
                  {answer.text}
                </Label>
                {isSubmitted && answer.isCorrect && (
                  <CheckCircle2 className="ml-2 h-5 w-5 text-green-500" />
                )}
                {isSubmitted &&
                  selectedAnswer === answer.id &&
                  !answer.isCorrect && (
                    <XCircle className="ml-2 h-5 w-5 text-red-500" />
                  )}
              </div>
            ))}
          </RadioGroup>

          {isSubmitted && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mt-6 rounded-lg bg-secondary/10 p-4"
            >
              <h4 className="mb-2 font-arabic font-bold">
                {isCorrect ? t("correctAnswer") : t("incorrectAnswer")}
              </h4>
              <p className="font-arabic text-muted-foreground">{explanation}</p>
            </motion.div>
          )}

          <div className="mt-6 flex justify-end">
            {isSubmitted ? (
              <Button onClick={handleReset} className="font-arabic">
                {t("tryAnotherQuestion")}
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={!selectedAnswer}
                className=" font-arabic hover:bg-secondary/90"
              >
                {t("submitAnswer")}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
