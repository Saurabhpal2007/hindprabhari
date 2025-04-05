
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const segmentedControlVariants = cva(
  "group flex w-full overflow-hidden rounded-full p-1 bg-background border border-input",
  {
    variants: {
      variant: {
        default: "",
        outline: "bg-transparent",
      },
      size: {
        default: "h-10",
        sm: "h-8",
        lg: "h-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface SegmentedControlProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof segmentedControlVariants> {
  value: string;
  onValueChange: (value: string) => void;
}

const SegmentedControl = React.forwardRef<HTMLDivElement, SegmentedControlProps>(
  ({ className, children, variant, size, value, onValueChange, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(segmentedControlVariants({ variant, size, className }))}
        {...props}
      >
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, {
              onClick: () => {
                onValueChange(child.props.value);
              },
              active: child.props.value === value,
            });
          }
          return child;
        })}
      </div>
    );
  }
);
SegmentedControl.displayName = "SegmentedControl";

export interface SegmentedControlItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
  active?: boolean;
}

const SegmentedControlItem = React.forwardRef<HTMLButtonElement, SegmentedControlItemProps>(
  ({ className, children, value, active, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          "relative flex-1 flex items-center justify-center px-3 py-1 text-sm font-medium transition-all",
          "focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "overflow-hidden transition-all duration-200 ease-in-out",
          active
            ? "text-primary-foreground"
            : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
          className
        )}
        {...props}
      >
        {children}
        {active && (
          <span className="absolute inset-0 bg-primary rounded-full shadow-sm z-[-1]"></span>
        )}
        <span className="absolute inset-0 rounded-full bg-current opacity-0 transition-opacity group-hover:opacity-5 peer-hover:opacity-10 active:opacity-16"></span>
      </button>
    );
  }
);
SegmentedControlItem.displayName = "SegmentedControlItem";

export { SegmentedControl, SegmentedControlItem };
