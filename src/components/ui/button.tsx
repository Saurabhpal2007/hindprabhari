
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 relative overflow-hidden",
  {
    variants: {
      variant: {
        // Primary solid button
        default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm rounded-md", 
        
        // Destructive button for critical actions
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-sm rounded-md",
        
        // Outlined button with border
        outlined: "border border-input bg-background hover:bg-accent/80 hover:text-accent-foreground rounded-md",
        
        // Alias for outlined
        outline: "border border-input bg-background hover:bg-accent/80 hover:text-accent-foreground rounded-md",
        
        // Filled tonal button (secondary emphasis)
        tonal: "bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-md",
        
        // Text button (minimal)
        text: "bg-transparent hover:bg-accent/40 hover:text-accent-foreground",
        
        // Elevated button with shadow
        elevated: "bg-background text-foreground shadow-md hover:shadow-lg hover:bg-accent/10 hover:text-accent-foreground transition-all rounded-md",
        
        // Secondary button
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-sm rounded-md",
        
        // Ghost button (minimal background)
        ghost: "hover:bg-accent/50 hover:text-accent-foreground",
        
        // Link style button
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-9 rounded-md px-4",
        lg: "h-11 rounded-md px-8 text-base",
        icon: "h-10 w-10 rounded-md",
        
        // Additional Material You specific sizes
        fab: "h-14 w-14 rounded-full shadow-md",
        "fab-sm": "h-10 w-10 rounded-full shadow-sm",
        "fab-lg": "h-20 w-20 rounded-full shadow-lg",
        "extended-fab": "h-14 px-6 rounded-full shadow-md",
      },
      shape: {
        default: "rounded-md", // Medium roundness
        full: "rounded-full",  // Circular/pill
        none: "rounded-none",  // No rounding
        sm: "rounded-sm",      // Smallest rounding
        lg: "rounded-lg",      // Large rounding
        xl: "rounded-xl",      // Extra large rounding
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      shape: "default"
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, shape, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, shape, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
