
import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { Circle } from "lucide-react"

import { cn } from "@/lib/utils"

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn("grid gap-2", className)}
      {...props}
      ref={ref}
    />
  )
})
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> & {
    size?: "default" | "sm" | "lg";
  }
>(({ className, size = "default", ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        "aspect-square rounded-full border-2 border-primary text-primary relative",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "overflow-hidden",
        size === "sm" ? "h-4 w-4" : size === "lg" ? "h-6 w-6" : "h-5 w-5",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <Circle className={cn(
          "fill-current transition-transform scale-0 data-[state=checked]:scale-90 transition-all duration-200",
          size === "sm" ? "h-2 w-2" : size === "lg" ? "h-3.5 w-3.5" : "h-2.5 w-2.5"
        )} />
      </RadioGroupPrimitive.Indicator>
      {/* Material Design 3 ripple effect */}
      <span className="absolute inset-0 rounded-full bg-primary opacity-0 transition-opacity hover:opacity-8 focus-visible:opacity-12 active:opacity-16 data-[state=checked]:opacity-0 dark:hover:opacity-10 dark:focus-visible:opacity-15 dark:active:opacity-20"></span>
    </RadioGroupPrimitive.Item>
  )
})
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

export { RadioGroup, RadioGroupItem }
