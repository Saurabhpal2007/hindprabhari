
import * as React from "react"
import { X } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const snackbarVariants = cva(
  "fixed bottom-4 left-1/2 -translate-x-1/2 flex w-full max-w-md items-center justify-between gap-2 rounded-lg p-4 shadow-md transition-all data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:slide-out-to-bottom-4 data-[state=open]:slide-in-from-bottom-4 md:max-w-lg",
  {
    variants: {
      variant: {
        default: "bg-background border text-foreground",
        primary: "bg-primary text-primary-foreground",
        destructive: "bg-destructive text-destructive-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface SnackbarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof snackbarVariants> {
  open?: boolean
  onClose?: () => void
  action?: React.ReactNode
  hasCloseButton?: boolean
}

const Snackbar = React.forwardRef<HTMLDivElement, SnackbarProps>(
  ({ className, variant, open = false, onClose, action, hasCloseButton = true, children, ...props }, ref) => {
    return open ? (
      <div
        ref={ref}
        role="alert"
        aria-live="assertive"
        className={cn(snackbarVariants({ variant }), className)}
        data-state={open ? "open" : "closed"}
        {...props}
      >
        <div className="flex-1">{children}</div>
        <div className="flex items-center gap-2">
          {action}
          {hasCloseButton && onClose && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-6 w-6 rounded-full p-0 hover:bg-background/20"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          )}
        </div>
      </div>
    ) : null
  }
)
Snackbar.displayName = "Snackbar"

export { Snackbar }
