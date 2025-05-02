import type React from "react";
import { Mona_Sans as FontSans } from "next/font/google";
import localFont from "next/font/local";
import { cookies } from "next/headers";

import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/components/language-provider";
import { ThemeDrawer } from "@/components/theme-drawer";
import { ThemeCustomizerProvider } from "@/hooks/use-theme-customizer";
import "@/app/globals.css";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

// Arabic font
const fontArabic = localFont({
  src: [
    {
      path: "../public/fonts/Amiri-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Amiri-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/NRT-Reg.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-arabic",
  display: "swap",
});

export const metadata = {
  title: "Quran Q&A",
  description: "A question-and-answer website focused on the Quran",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const direction = cookieStore.get("direction")?.value || "rtl";
  const language = cookieStore.get("language")?.value || "ku";

  return (
    <html lang={language} dir={direction} suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background antialiased",
          fontSans.variable,
          fontArabic.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <ThemeCustomizerProvider>
            <LanguageProvider defaultLanguage={language}>
              <div className="relative flex min-h-screen flex-col">
                <div className="flex-1">{children}</div>
              </div>
              <ThemeDrawer />
            </LanguageProvider>
          </ThemeCustomizerProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
