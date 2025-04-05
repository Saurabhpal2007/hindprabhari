
import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> & {
    size?: "default" | "sm" | "lg";
  }
>(({ className, size = "default", ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer relative flex items-center justify-center border-2 border-primary outline-none transition-colors",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
      "rounded-sm overflow-hidden",
      size === "sm" ? "h-4 w-4" : size === "lg" ? "h-6 w-6" : "h-5 w-5",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn("flex items-center justify-center text-current")}
    >
      <Check className={cn(
        "h-full w-full p-0.5 transition-transform scale-90 data-[state=checked]:animate-in data-[state=unchecked]:animate-out data-[state=unchecked]:fade-out-0 data-[state=checked]:fade-in-0",
        size === "sm" ? "h-3 w-3" : size === "lg" ? "h-5 w-5" : "h-4 w-4"
      )} />
    </CheckboxPrimitive.Indicator>
    {/* Material Design 3 ripple effect */}
    <span className="absolute inset-0 bg-current opacity-0 transition-opacity peer-hover:opacity-8 peer-focus-visible:opacity-12 peer-active:opacity-16 dark:peer-hover:opacity-10 dark:peer-focus-visible:opacity-15 dark:peer-active:opacity-20"></span>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
