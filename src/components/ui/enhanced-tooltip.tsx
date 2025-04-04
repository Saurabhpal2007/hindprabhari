
import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cn } from "@/lib/utils";

const EnhancedTooltipProvider = TooltipPrimitive.Provider;

const EnhancedTooltip = TooltipPrimitive.Root;

const EnhancedTooltipTrigger = TooltipPrimitive.Trigger;

interface EnhancedTooltipContentProps extends React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content> {
  variant?: "plain" | "rich";
  title?: string;
  action?: React.ReactNode;
}

const EnhancedTooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  EnhancedTooltipContentProps
>(({ className, variant = "plain", title, action, children, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      "z-50 overflow-hidden rounded-md shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      variant === "plain" 
        ? "bg-foreground px-3 py-1.5 text-sm text-background" 
        : "bg-background border border-border p-4 text-sm text-foreground max-w-xs",
      className
    )}
    {...props}
  >
    {variant === "rich" && title ? (
      <div className="space-y-2">
        <h4 className="font-medium">{title}</h4>
        <div className="text-sm text-muted-foreground">{children}</div>
        {action && (
          <div className="pt-2 text-primary text-sm">{action}</div>
        )}
      </div>
    ) : (
      children
    )}
  </TooltipPrimitive.Content>
));

EnhancedTooltipContent.displayName = TooltipPrimitive.Content.displayName;

export { 
  EnhancedTooltip, 
  EnhancedTooltipTrigger, 
  EnhancedTooltipContent, 
  EnhancedTooltipProvider 
};
