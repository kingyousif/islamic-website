"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Settings,
  X,
  Moon,
  Sun,
  Type,
  Palette,
  Circle,
  Square,
  Monitor,
  TextIcon,
} from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslation } from "@/hooks/use-translation";
import { useLanguage } from "@/hooks/use-language";
import { useThemeCustomizer } from "@/hooks/use-theme-customizer";
import { ColorPicker } from "@/components/ui/color-picker";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

export function ThemeDrawer() {
  const [mounted, setMounted] = useState(false);
  const [activeColorPicker, setActiveColorPicker] = useState<
    "button" | "text" | null
  >(null);
  const [open, setOpen] = useState(false);
  const { theme } = useTheme();
  const { t } = useTranslation();
  const { language, setLanguage } = useLanguage();
  const [fontStyle, setFontStyle] = useState("default");
  const [activeTab, setActiveTab] = useState("general");

  const {
    buttonColor,
    setButtonColor,
    textColor,
    setTextColor,
    buttonRadius,
    setButtonRadius,
    resetTheme,
    predefinedRadii,
    recentColors,
    addRecentColor,
    themeMode,
    applyThemeMode,
    isCustomTheme,
  } = useThemeCustomizer();

  // Ensure we only render theme changes on the client to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const fonts = [
    { value: "default", label: t("defaultFont") },
    { value: "serif", label: t("serifFont") },
    { value: "mono", label: t("monoFont") },
  ];

  const handleFontChange = (value: string) => {
    setFontStyle(value);

    if (value === "serif") {
      document.documentElement.classList.add("font-serif");
      document.documentElement.classList.remove("font-mono");
    } else if (value === "mono") {
      document.documentElement.classList.add("font-mono");
      document.documentElement.classList.remove("font-serif");
    } else {
      document.documentElement.classList.remove("font-serif", "font-mono");
    }
  };

  useEffect(() => {
    // Initialize font style
    if (mounted) {
      handleFontChange(fontStyle);
    }
  }, [fontStyle, mounted]);

  // Don't render theme controls until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        <Button
          variant="outline"
          size="icon"
          className="h-12 w-12 rounded-full bg-background shadow-lg border-2 border-primary"
        >
          <Settings className="h-6 w-6" />
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        <Button
          variant="outline"
          size="icon"
          className="h-12 w-12 rounded-full bg-background shadow-lg border-2 border-primary relative overflow-hidden group"
          onClick={() => setOpen(true)}
        >
          <Settings className="h-6 w-6 relative z-10" />
          <span className="absolute inset-0 bg-primary opacity-20 group-hover:opacity-30 transition-opacity" />
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-0 right-0 h-3 w-3 rounded-full bg-primary"
          />
        </Button>
        <div className="bg-card rounded-lg shadow-lg p-2 border text-xs text-center font-medium">
          {t("clickToCustomize")}
        </div>
      </div>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="right"
          className="w-[90vw] sm:w-[400px] max-w-[400px] p-4 overflow-y-auto flex flex-col h-full"
        >
          <SheetHeader className="text-left mb-4">
            <div className="flex items-center justify-between">
              <SheetTitle>{t("customize")}</SheetTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto pr-1 -mr-1">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="general">{t("general")}</TabsTrigger>
                <TabsTrigger value="appearance" className="relative">
                  {t("appearance")}
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-primary"
                  />
                </TabsTrigger>
              </TabsList>

              <TabsContent value="general" className="space-y-6 mt-0" dir="rtl">
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Type className="mr-2 h-4 w-4" />
                    <span>{t("fontStyle")}</span>
                  </div>
                  <Select
                    value={fontStyle}
                    onValueChange={handleFontChange}
                    dir="rtl"
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={t("selectFont")} />
                    </SelectTrigger>
                    <SelectContent>
                      {fonts.map((font) => (
                        <SelectItem key={font.value} value={font.value}>
                          {font.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center">
                    <span className="mr-2">🌐</span>
                    <span>{t("language")}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className={`justify-start ${
                        language === "ku" ? "border-primary" : ""
                      }`}
                      onClick={() => setLanguage("ku")}
                    >
                      {t("kurdish")}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className={`justify-start ${
                        language === "ar" ? "border-primary" : ""
                      }`}
                      onClick={() => setLanguage("ar")}
                    >
                      {t("arabic")}
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent
                value="appearance"
                className="space-y-6 mt-0 me-3"
                dir="rtl"
              >
                {/* Theme Mode Selection */}
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Moon className="mr-2 h-4 w-4" />
                    <span>{t("themeMode")}</span>
                  </div>
                  <RadioGroup
                    value={themeMode}
                    onValueChange={(value) =>
                      applyThemeMode(
                        value as "light" | "dark" | "system" | "custom"
                      )
                    }
                    className="grid grid-cols-2 gap-2"
                  >
                    <div>
                      <RadioGroupItem
                        value="light"
                        id="theme-light"
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor="theme-light"
                        className={cn(
                          "flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary",
                          themeMode === "light" && "border-primary"
                        )}
                      >
                        <Sun className="mb-3 h-6 w-6" />
                        <span className="text-sm font-medium">
                          {t("light")}
                        </span>
                      </Label>
                    </div>

                    <div>
                      <RadioGroupItem
                        value="dark"
                        id="theme-dark"
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor="theme-dark"
                        className={cn(
                          "flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary",
                          themeMode === "dark" && "border-primary"
                        )}
                      >
                        <Moon className="mb-3 h-6 w-6" />
                        <span className="text-sm font-medium">{t("dark")}</span>
                      </Label>
                    </div>

                    <div>
                      <RadioGroupItem
                        value="custom"
                        id="theme-custom"
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor="theme-custom"
                        className={cn(
                          "flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary",
                          themeMode === "custom" && "border-primary"
                        )}
                      >
                        <Palette className="mb-3 h-6 w-6" />
                        <span className="text-sm font-medium">
                          {t("custom")}
                        </span>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Custom Theme Options - only enabled when custom theme is selected */}
                <div
                  className={cn(
                    "space-y-6",
                    !isCustomTheme && "opacity-50 pointer-events-none"
                  )}
                >
                  <h4 className="text-sm font-medium border-b pb-1">
                    {t("customThemeOptions")}
                  </h4>

                  {/* Text Color */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <TextIcon className="mr-2 h-4 w-4" />
                        <span>{t("textColor")}</span>
                      </div>
                      {activeColorPicker === "text" ? (
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 px-2"
                          onClick={() => setActiveColorPicker(null)}
                        >
                          <X className="h-4 w-4 mr-1" /> {t("close")}
                        </Button>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-10 h-10 p-0 border-2 overflow-hidden"
                          style={{ borderColor: textColor }}
                          onClick={() => setActiveColorPicker("text")}
                          disabled={!isCustomTheme}
                        >
                          <span
                            className="w-full h-full"
                            style={{ backgroundColor: textColor }}
                          />
                        </Button>
                      )}
                    </div>

                    {activeColorPicker === "text" && (
                      <div className="mt-2">
                        <ColorPicker
                          color={textColor}
                          onChange={setTextColor}
                          recentColors={recentColors}
                          onAddRecentColor={addRecentColor}
                        />
                      </div>
                    )}
                  </div>

                  {/* Button Color */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Circle className="mr-2 h-4 w-4" />
                        <span>{t("buttonColor")}</span>
                      </div>
                      {activeColorPicker === "button" ? (
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 px-2"
                          onClick={() => setActiveColorPicker(null)}
                        >
                          <X className="h-4 w-4 mr-1" /> {t("close")}
                        </Button>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-10 h-10 p-0 border-2 overflow-hidden"
                          style={{ borderColor: buttonColor }}
                          onClick={() => setActiveColorPicker("button")}
                          disabled={!isCustomTheme}
                        >
                          <span
                            className="w-full h-full"
                            style={{ backgroundColor: buttonColor }}
                          />
                        </Button>
                      )}
                    </div>

                    {activeColorPicker === "button" && (
                      <div className="mt-2">
                        <ColorPicker
                          color={buttonColor}
                          onChange={setButtonColor}
                          recentColors={recentColors}
                          onAddRecentColor={addRecentColor}
                        />
                      </div>
                    )}
                  </div>

                  {/* Button Border Radius */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Square className="mr-2 h-4 w-4" />
                      <span>{t("buttonRadius")}</span>
                    </div>
                    <div className="grid grid-cols-4 gap-2 mb-4">
                      {predefinedRadii.map((radius) => (
                        <Button
                          key={radius.value}
                          variant="outline"
                          size="sm"
                          className={`p-2 h-10 ${
                            buttonRadius === radius.value
                              ? "border-primary"
                              : ""
                          }`}
                          style={{ borderRadius: radius.preview }}
                          onClick={() => setButtonRadius(radius.value)}
                          disabled={!isCustomTheme}
                        >
                          <span className="text-xs">{radius.label}</span>
                        </Button>
                      ))}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs w-8">{buttonRadius}px</span>
                      <Slider
                        value={[Number.parseInt(buttonRadius)]}
                        min={0}
                        max={28}
                        step={1}
                        onValueChange={(value) =>
                          setButtonRadius(value[0].toString())
                        }
                        disabled={!isCustomTheme}
                      />
                    </div>
                  </div>
                </div>

                {/* Preview Section */}
                <div className="border rounded-lg p-4">
                  <h4 className="text-sm font-medium mb-2">{t("preview")}</h4>
                  <div className="p-3 rounded-lg mb-3">
                    <div className="h-4 w-1/2 bg-muted rounded-md mb-2"></div>
                    <div className="h-3 w-3/4 bg-muted rounded-md"></div>
                    <p
                      className="mt-2 text-sm"
                      style={{ color: isCustomTheme ? textColor : "" }}
                    >
                      {t("previewText")}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      className="text-xs"
                      style={{
                        backgroundColor: isCustomTheme ? buttonColor : "",
                        borderRadius: `${buttonRadius}px`,
                      }}
                    >
                      {t("primaryButton")}
                    </Button>
                    <Button
                      variant="outline"
                      className="text-xs"
                      style={{ borderRadius: `${buttonRadius}px` }}
                    >
                      {t("secondaryButton")}
                    </Button>
                  </div>
                </div>

                {/* Reset Button */}
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={resetTheme}
                >
                  {t("resetAppearance")}
                </Button>
              </TabsContent>
            </Tabs>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
