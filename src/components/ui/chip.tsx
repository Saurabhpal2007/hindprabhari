
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { X, Check } from "lucide-react"

import { cn } from "@/lib/utils"

const chipVariants = cva(
  "inline-flex items-center justify-center rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        assist: "border bg-background hover:bg-secondary/80",
        filter: "border bg-background hover:bg-secondary/80 data-[selected=true]:bg-secondary/20 data-[selected=true]:border-secondary",
        input: "border bg-background hover:bg-secondary/80 pr-2",
        suggestion: "border bg-background hover:bg-secondary/80",
      },
      size: {
        default: "h-8 px-4 py-2",
        sm: "h-7 px-3",
        lg: "h-9 px-5",
      },
    },
    defaultVariants: {
      variant: "assist",
      size: "default",
    },
  }
)

export interface ChipProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof chipVariants> {
  selected?: boolean
  onRemove?: () => void
  avatar?: React.ReactNode
  icon?: React.ReactNode
}

const Chip = React.forwardRef<HTMLButtonElement, ChipProps>(
  ({ className, variant, size, selected, onRemove, avatar, icon, children, ...props }, ref) => {
    return (
      <button
        type="button"
        className={cn(chipVariants({ variant, size }), className)}
        ref={ref}
        data-selected={selected}
        {...props}
      >
        {selected && variant === "filter" && (
          <Check className="mr-1 h-4 w-4" />
        )}
        {icon && <span className="mr-1">{icon}</span>}
        {avatar && <span className="mr-1">{avatar}</span>}
        {children}
        {variant === "input" && onRemove && (
          <X 
            className="ml-1 h-4 w-4 cursor-pointer opacity-70 hover:opacity-100" 
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }} 
          />
        )}
      </button>
    );
  }
);
Chip.displayName = "Chip";

export interface ChipGroupProps extends React.HTMLAttributes<HTMLDivElement> {}

const ChipGroup = React.forwardRef<HTMLDivElement, ChipGroupProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="group"
        className={cn("flex flex-wrap gap-2", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
ChipGroup.displayName = "ChipGroup";

export { Chip, ChipGroup };
