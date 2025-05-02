"use client"

import type * as React from "react"
import { useEffect, useState } from "react"
import { Check, Copy, Pipette } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface ColorPickerProps {
  color: string
  onChange: (color: string) => void
  className?: string
  recentColors?: string[]
  onAddRecentColor?: (color: string) => void
}

export function ColorPicker({ color, onChange, className, recentColors = [], onAddRecentColor }: ColorPickerProps) {
  const [localColor, setLocalColor] = useState(color)
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState("palette")

  // Sync local color with prop
  useEffect(() => {
    setLocalColor(color)
  }, [color])

  // Handle color change from palette
  const handleColorChange = (newColor: string) => {
    setLocalColor(newColor)
    onChange(newColor)
    if (onAddRecentColor) {
      onAddRecentColor(newColor)
    }
  }

  // Handle hex input change
  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setLocalColor(value)

    // Only update if it's a valid hex color
    if (/^#([0-9A-F]{3}){1,2}$/i.test(value)) {
      onChange(value)
      if (onAddRecentColor) {
        onAddRecentColor(value)
      }
    }
  }

  // Handle color input change
  const handleColorInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setLocalColor(value)
    onChange(value)
    if (onAddRecentColor) {
      onAddRecentColor(value)
    }
  }

  // Copy color to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(localColor)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Common colors palette
  const commonColors = [
    "#000000",
    "#ffffff",
    "#f8fafc",
    "#f1f5f9",
    "#e2e8f0",
    "#cbd5e1",
    "#94a3b8",
    "#64748b",
    "#475569",
    "#334155",
    "#1e293b",
    "#0f172a",
    "#ef4444",
    "#f97316",
    "#f59e0b",
    "#eab308",
    "#84cc16",
    "#22c55e",
    "#10b981",
    "#14b8a6",
    "#06b6d4",
    "#0ea5e9",
    "#3b82f6",
    "#6366f1",
    "#8b5cf6",
    "#a855f7",
    "#d946ef",
    "#ec4899",
    "#f43f5e",
  ]

  // Material colors palette
  const materialColors = [
    "#f44336",
    "#e91e63",
    "#9c27b0",
    "#673ab7",
    "#3f51b5",
    "#2196f3",
    "#03a9f4",
    "#00bcd4",
    "#009688",
    "#4caf50",
    "#8bc34a",
    "#cddc39",
    "#ffeb3b",
    "#ffc107",
    "#ff9800",
    "#ff5722",
    "#795548",
    "#9e9e9e",
    "#607d8b",
  ]

  return (
    <div className={cn("w-full space-y-3", className)}>
      {/* Color preview and hex input */}
      <div className="flex items-center gap-2">
        <div className="h-10 w-10 rounded-md border border-border shadow-sm" style={{ backgroundColor: localColor }} />
        <div className="flex-1 flex items-center gap-2">
          <Input
            value={localColor}
            onChange={handleHexChange}
            className="h-9 font-mono text-sm"
            placeholder="#000000"
            aria-label="Hex color value"
          />
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-9 w-9"
                  onClick={copyToClipboard}
                  aria-label="Copy color to clipboard"
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{copied ? "Copied!" : "Copy hex"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-9 w-9"
                  onClick={() => document.getElementById("color-input")?.click()}
                  aria-label="Open color picker"
                >
                  <Pipette className="h-4 w-4" />
                  <input
                    id="color-input"
                    type="color"
                    value={localColor}
                    onChange={handleColorInputChange}
                    className="sr-only"
                  />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Color picker</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      {/* Color selection tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="palette">Palette</TabsTrigger>
          <TabsTrigger value="material">Material</TabsTrigger>
          <TabsTrigger value="recent">Recent</TabsTrigger>
        </TabsList>

        {/* Palette tab */}
        <TabsContent value="palette" className="mt-2">
          <div className="grid grid-cols-8 gap-1 md:grid-cols-10">
            {commonColors.map((colorValue) => (
              <ColorButton
                key={colorValue}
                color={colorValue}
                selected={localColor.toLowerCase() === colorValue.toLowerCase()}
                onClick={() => handleColorChange(colorValue)}
              />
            ))}
          </div>
        </TabsContent>

        {/* Material tab */}
        <TabsContent value="material" className="mt-2">
          <div className="grid grid-cols-8 gap-1 md:grid-cols-10">
            {materialColors.map((colorValue) => (
              <ColorButton
                key={colorValue}
                color={colorValue}
                selected={localColor.toLowerCase() === colorValue.toLowerCase()}
                onClick={() => handleColorChange(colorValue)}
              />
            ))}
          </div>
        </TabsContent>

        {/* Recent tab */}
        <TabsContent value="recent" className="mt-2">
          {recentColors.length > 0 ? (
            <div className="grid grid-cols-8 gap-1 md:grid-cols-10">
              {recentColors.map((colorValue, index) => (
                <ColorButton
                  key={`${colorValue}-${index}`}
                  color={colorValue}
                  selected={localColor.toLowerCase() === colorValue.toLowerCase()}
                  onClick={() => handleColorChange(colorValue)}
                />
              ))}
            </div>
          ) : (
            <p className="text-center text-sm text-muted-foreground py-4">
              No recent colors. Select colors to see them here.
            </p>
          )}
        </TabsContent>
      </Tabs>

      {/* Color spectrum */}
      <div className="w-full h-24 rounded-md relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black" />
        <input
          type="color"
          value={localColor}
          onChange={handleColorInputChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-crosshair"
          aria-label="Color spectrum"
        />
      </div>
    </div>
  )
}

interface ColorButtonProps {
  color: string
  selected?: boolean
  onClick: () => void
}

function ColorButton({ color, selected, onClick }: ColorButtonProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            type="button"
            className={cn(
              "h-6 w-6 rounded-md border border-border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              selected && "ring-2 ring-ring ring-offset-1",
            )}
            style={{ backgroundColor: color }}
            onClick={onClick}
            aria-label={`Select color ${color}`}
          >
            {selected && <Check className={cn("h-4 w-4 text-white stroke-[3]", isLightColor(color) && "text-black")} />}
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{color}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

// Helper to determine if a color is light or dark
function isLightColor(color: string): boolean {
  // Remove # if present
  const hex = color.replace("#", "")

  // Convert to RGB
  const r = Number.parseInt(hex.length === 3 ? hex[0] + hex[0] : hex.substring(0, 2), 16)
  const g = Number.parseInt(hex.length === 3 ? hex[1] + hex[1] : hex.substring(2, 4), 16)
  const b = Number.parseInt(hex.length === 3 ? hex[2] + hex[2] : hex.substring(4, 6), 16)

  // Calculate luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255

  return luminance > 0.5
}
