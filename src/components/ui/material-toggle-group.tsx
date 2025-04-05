
import * as React from "react"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Check, DollarSign } from "lucide-react"
import { cn } from "@/lib/utils"

export interface MaterialToggleGroupProps {
  type?: "single" | "multiple"
  value?: string | string[]
  defaultValue?: string | string[]
  onValueChange?: (value: string | string[]) => void
  options: {
    value: string
    label: React.ReactNode
    icon?: React.ReactNode
  }[]
  className?: string
  variant?: "default" | "price" | "pills"
}

export function MaterialToggleGroup({
  type = "single",
  value,
  defaultValue,
  onValueChange,
  options,
  className,
  variant = "default",
}: MaterialToggleGroupProps) {
  return (
    <ToggleGroup
      type={type as "single"}
      value={type === "single" ? value as string : undefined}
      defaultValue={type === "single" ? defaultValue as string : undefined}
      onValueChange={onValueChange as (value: string) => void}
      className={cn(
        "inline-flex rounded-full border border-border p-1 bg-background",
        variant === "pills" && "overflow-hidden",
        className
      )}
    >
      {options.map((option) => (
        <ToggleGroupItem
          key={option.value}
          value={option.value}
          className={cn(
            "flex h-9 items-center justify-center gap-1.5 px-4 text-sm font-medium transition-all rounded-full",
            variant === "price" && "data-[state=on]:bg-primary/10 data-[state=on]:text-primary data-[state=off]:text-foreground/70"
          )}
          aria-label={typeof option.label === "string" ? option.label : undefined}
        >
          {variant === "default" && type === "single" && (
            <div className="w-4 h-4 flex items-center justify-center">
              {value === option.value && <Check className="h-3.5 w-3.5" />}
            </div>
          )}
          {variant === "price" && (
            <DollarSign className={cn(
              "h-3.5 w-3.5",
              option.value.length > 1 && "opacity-0"
            )} />
          )}
          {option.icon}
          {option.label}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  )
}
