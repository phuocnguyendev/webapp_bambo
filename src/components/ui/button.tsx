import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "cursor-pointer inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-green-700 text-white rounded-lg gap-x-1",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-lg",
        outline:
          "border border-input bg-background hover:bg-muted hover:text-foreground rounded-lg",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-lg",
        ghost: "hover:bg-muted hover:text-foreground rounded-lg",
        muted: "bg-muted font-bold hover:bg-muted/90 rounded-lg",
        link: "text-primary underline-offset-4 hover:underline",
        custom:
          "p-0 m-0 bg-transparent border-none shadow-none rounded-none text-inherit hover:bg-transparent hover:text-inherit",
      },
      size: {
        default: "h-[40px] rounded-lg px-4 py-2",
        sm: "h-[36px] rounded-lg px-3",
        lg: "h-[44px] rounded-lg px-8",
        icon: "h-[40px] w-[40px] rounded-lg",
        custom: "h-auto w-auto p-0 m-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  icon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, asChild = false, icon, children, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    if (variant === "custom") {
      return (
        <Comp
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          type="button"
          {...props}
        >
          {icon ? (
            <span className="inline-flex items-center">{icon}</span>
          ) : null}
        </Comp>
      );
    }
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        type="button"
        {...props}
      >
        {icon ? (
          <span className="inline-flex items-center -ml-1">{icon}</span>
        ) : null}
        {children}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
