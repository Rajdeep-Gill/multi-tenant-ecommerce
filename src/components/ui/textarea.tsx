import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Renders a styled textarea element with customizable props and merged class names.
 *
 * Accepts all standard textarea attributes and merges additional class names with default styles for consistent appearance, including support for dark mode and accessibility states.
 */
function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-white px-3 py-2 text-base transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        "md:text-base",
        className
      )}
      {...props}
    />
  );
}

export { Textarea };
