
import * as React from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

export interface SegmentedControlProps {
  options: {
    value: string
    label: React.ReactNode
    icon?: React.ReactNode
  }[]
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  className?: string
  size?: "sm" | "default" | "lg"
}

export function SegmentedControl({
  options,
  value: controlledValue,
  defaultValue,
  onChange,
  className,
  size = "default"
}: SegmentedControlProps) {
  const [value, setValue] = React.useState(defaultValue || options[0]?.value || "")
  
  const actualValue = controlledValue !== undefined ? controlledValue : value
  
  const handleChange = (newValue: string) => {
    if (controlledValue === undefined) {
      setValue(newValue)
    }
    onChange?.(newValue)
  }
  
  return (
    <div 
      className={cn(
        "inline-flex rounded-full border border-border bg-background p-1 transition-all",
        className
      )}
    >
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => handleChange(option.value)}
          className={cn(
            "flex items-center justify-center gap-2 transition-all rounded-full relative overflow-hidden",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            size === "sm" ? "px-3 py-1 text-xs" : 
            size === "lg" ? "px-6 py-2.5 text-base" : 
            "px-4 py-1.5 text-sm",
            option.value === actualValue
              ? "bg-primary/10 text-primary font-medium"
              : "text-foreground/70 hover:bg-muted hover:text-foreground"
          )}
        >
          {option.value === actualValue && (
            <Check className="h-3.5 w-3.5" />
          )}
          {option.icon}
          <span>{option.label}</span>
          <span className="absolute inset-0 rounded-full bg-current opacity-0 transition-opacity hover:opacity-8 active:opacity-16"></span>
        </button>
      ))}
    </div>
  )
}
