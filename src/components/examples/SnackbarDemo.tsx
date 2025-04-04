
import React, { useState } from "react";
import { Snackbar } from "@/components/ui/snackbar";
import { Button } from "@/components/ui/button";

const SnackbarDemo: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [variant, setVariant] = useState<"default" | "primary" | "destructive">("default");

  const showSnackbar = (newVariant: "default" | "primary" | "destructive") => {
    setVariant(newVariant);
    setOpen(true);
    setTimeout(() => setOpen(false), 5000);
  };

  return (
    <div className="space-y-4 p-6 bg-background rounded-xl border shadow-sm">
      <h3 className="text-lg font-medium mb-3">Snackbars</h3>
      
      <div className="flex flex-wrap gap-4">
        <Button onClick={() => showSnackbar("default")}>Show Default Snackbar</Button>
        <Button onClick={() => showSnackbar("primary")}>Show Primary Snackbar</Button>
        <Button variant="destructive" onClick={() => showSnackbar("destructive")}>
          Show Error Snackbar
        </Button>
      </div>

      <Snackbar
        open={open}
        variant={variant}
        onClose={() => setOpen(false)}
        action={
          <Button 
            variant="text" 
            size="sm" 
            className="text-primary-foreground font-medium"
          >
            Action
          </Button>
        }
      >
        {variant === "default" && "Single-line snackbar with action"}
        {variant === "primary" && "Operation completed successfully"}
        {variant === "destructive" && "An error occurred. Please try again"}
      </Snackbar>
    </div>
  );
};

export default SnackbarDemo;
