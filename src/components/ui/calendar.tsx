
// Update the variant in calendar component to use the correct button variant

// Update Button.variant from "outline" to "outlined"
<div {...buttonProps}>
  <Button
    variant="outlined"
    className={cn(
      "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
      className
    )}
    {...props}
  >
    <ChevronLeft className="h-4 w-4" />
    <span className="sr-only">{label}</span>
  </Button>
</div>
