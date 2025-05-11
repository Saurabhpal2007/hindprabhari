
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 relative overflow-hidden transition-all duration-300",
  {
    variants: {
      variant: {
        // Material Design 3 specific button variants
        filled: "bg-primary text-on-primary hover:bg-primary/90 active:bg-primary/80",
        tonal: "bg-primary-container text-on-primary-container hover:bg-primary-container/90 active:bg-primary-container/80",
        elevated: "bg-surface-container-low text-on-surface shadow-sm hover:shadow-md hover:bg-surface-container-low/90",
        text: "bg-transparent text-primary hover:bg-primary/8 active:bg-primary/16",
        outlined: "border border-outline bg-transparent text-primary hover:bg-surface-container active:bg-surface-container/80",
        tertiary: "bg-tertiary text-on-tertiary hover:bg-tertiary/90 active:bg-tertiary/80",
        "tertiary-container": "bg-tertiary-container text-on-tertiary-container hover:bg-tertiary-container/90 active:bg-tertiary-container/80",
        
        // Standard shadcn/ui variants for compatibility
        default: "bg-primary text-on-primary hover:bg-primary/90", // alias for filled
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground", // alias for outlined
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        xs: "h-8 px-2.5 py-1.5 text-xs rounded-sm",
        sm: "h-9 px-3 py-1.5 text-sm",
        lg: "h-12 px-6 py-3 text-base",
        icon: "h-10 w-10 p-2",
        "icon-sm": "h-8 w-8 p-1.5",
        "icon-lg": "h-12 w-12 p-3",
      },
      shape: {
        default: "rounded-md",
        full: "rounded-full",
        pill: "rounded-[999px]",
        none: "rounded-none",
      },
      elevation: {
        none: "",
        low: "shadow-sm hover:shadow active:shadow-none",
        medium: "shadow hover:shadow-md active:shadow",
        high: "shadow-md hover:shadow-lg active:shadow-md",
      },
      stateLayer: {
        true: "after:absolute after:inset-0 after:rounded-[inherit] after:bg-current after:opacity-0 after:transition-opacity hover:after:opacity-[var(--md-state-hover-opacity)] focus-visible:after:opacity-[var(--md-state-focus-opacity)] active:after:opacity-[var(--md-state-pressed-opacity)]",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      shape: "default",
      elevation: "none",
      stateLayer: true,
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, shape, elevation, stateLayer, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, shape, elevation, stateLayer, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
