
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/90",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/90",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "text-foreground",
        // Material Design 3 badge variants
        filled: "border-transparent bg-primary text-primary-foreground hover:bg-primary/90",
        tonal: "border-transparent bg-primary-container text-on-primary-container hover:bg-primary-container/90",
        tertiary: "border-transparent bg-tertiary text-on-tertiary hover:bg-tertiary/90",
        "tertiary-container": "border-transparent bg-tertiary-container text-on-tertiary-container hover:bg-tertiary-container/90",
        outlined: "border-primary text-primary bg-transparent hover:bg-primary/10",
      },
      size: {
        default: "px-2.5 py-0.5 text-xs",
        sm: "px-2 py-0.5 text-[0.625rem]",
        lg: "px-3 py-1 text-sm",
      },
      elevation: {
        none: "",
        low: "shadow-sm",
        medium: "shadow",
        high: "shadow-md",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      elevation: "none",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, elevation, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, size, elevation }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
