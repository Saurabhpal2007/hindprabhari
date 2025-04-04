
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export interface SegmentedButtonProps {
  options: {
    value: string;
    label: string | React.ReactNode;
    icon?: React.ReactNode;
  }[];
  defaultValue?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  variant?: "default" | "price";
  size?: "default" | "sm" | "lg";
  fullWidth?: boolean;
}

export function SegmentedButton({
  options,
  defaultValue,
  value,
  onChange,
  className,
  variant = "default",
  size = "default",
  fullWidth = false,
}: SegmentedButtonProps) {
  const [selectedValue, setSelectedValue] = useState<string>(defaultValue || options[0]?.value || "");

  const handleValueChange = (newValue: string) => {
    if (!value) {
      setSelectedValue(newValue);
    }
    onChange?.(newValue);
  };

  const currentValue = value || selectedValue;

  return (
    <ToggleGroup
      type="single"
      value={currentValue}
      onValueChange={(newValue) => {
        if (newValue) handleValueChange(newValue);
      }}
      className={cn(
        "inline-flex rounded-full border border-border bg-background p-1 transition-all", 
        fullWidth && "w-full",
        className
      )}
    >
      {options.map((option) => (
        <ToggleGroupItem
          key={option.value}
          value={option.value}
          className={cn(
            "flex items-center justify-center gap-2 text-sm font-medium transition-all rounded-full",
            size === "sm" ? "px-3 py-1" : size === "lg" ? "px-6 py-2.5" : "px-4 py-1.5",
            fullWidth && "flex-1",
            option.value === currentValue
              ? "bg-primary/10 text-primary"
              : "text-foreground/70 hover:bg-muted hover:text-foreground"
          )}
          aria-label={typeof option.label === "string" ? option.label : undefined}
        >
          {option.value === currentValue && variant !== "price" && (
            <Check className="h-3.5 w-3.5" />
          )}
          {option.icon}
          {option.label}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}
