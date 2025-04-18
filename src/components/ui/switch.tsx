
import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> & {
    size?: "default" | "sm" | "lg";
  }
>(({ className, size = "default", ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "peer inline-flex shrink-0 cursor-pointer items-center relative",
      "rounded-full border-2 border-transparent transition-colors",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
      "overflow-hidden",
      size === "sm" 
        ? "h-5 w-9" 
        : size === "lg" 
          ? "h-7 w-14" 
          : "h-6 w-11",
      className
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "pointer-events-none block rounded-full bg-background shadow-md ring-0 transition-transform",
        "data-[state=checked]:shadow-lg data-[state=checked]:scale-105 data-[state=unchecked]:scale-100 transition-all",
        size === "sm" 
          ? "h-4 w-4 data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0" 
          : size === "lg" 
            ? "h-6 w-6 data-[state=checked]:translate-x-7 data-[state=unchecked]:translate-x-0" 
            : "h-5 w-5 data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
      )}
    />
    {/* Material Design 3 ripple effect */}
    <span className="absolute inset-0 rounded-full bg-current opacity-0 transition-opacity peer-hover:opacity-8 peer-focus-visible:opacity-12 peer-active:opacity-16 dark:peer-hover:opacity-10 dark:peer-focus-visible:opacity-15 dark:peer-active:opacity-20"></span>
  </SwitchPrimitives.Root>
))
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }
