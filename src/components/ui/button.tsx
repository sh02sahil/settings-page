import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-base font-satoshi font-medium transition-colors duration-300 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-white-200 text-black-800 hover:bg-white-200/90",
        auth: "font-geist font-semibold bg-white-200 gap-3 text-black-800 hover:bg-white-200/90",
        destructive:
          "bg-transparent ring-1 ring-error-500 hover:ring-error-500/90 text-error-600 hover:text-error-600/90",
        specialRed: "border-red-gradient hover:opacity-70 transition-all",
        specialPurple: "border-purple-gradient hover:opacity-70 transition-all",
        link: "text-black-300 underline-offset-4 hover:underline transition-all",
        transparent: "bg-transparent",
        outline:
          "bg-transparent border border-black-400 focus:border-white-600",
      },
      size: {
        default: "px-4 py-2 h-10 rounded-lg",
        sm: "h-8 rounded-md px-3 text-xs",
        md: "h-9 rounded-md px-3 text-sm",
        lg: "h-12 rounded-xl px-6",
        icon: "h-fit w-fit",
        outline: "px-4 py-2 h-10 rounded-xl",
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
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        <span className="flex w-full items-center justify-center">
          {children}
        </span>
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
