
// Update the variant in alert dialog component to use the correct button variant

<AlertDialogCancel
  type="button"
  className={cn(
    buttonVariants({ variant: "outlined" }),
    "mt-2 sm:mt-0",
    className
  )}
  {...props}
/>
