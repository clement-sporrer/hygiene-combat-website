import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap font-medium rounded-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm hover:shadow-md",
        primary: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm hover:shadow-md",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-sm hover:shadow-md",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-sm hover:shadow-md",
        outline: "border-2 border-border text-foreground bg-transparent hover:bg-muted hover:border-foreground/20",
        ghost: "text-foreground hover:bg-muted",
        link: "text-primary underline-offset-4 hover:underline p-0 h-auto",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-6 text-base",
        lg: "h-12 px-8 text-lg",
        icon: "h-10 w-10",
        default: "h-10 px-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  asLink?: boolean;
  to?: string;
  href?: string;
  target?: string;
  rel?: string;
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant, 
    size, 
    asChild = false, 
    asLink = false,
    to,
    href,
    target,
    rel,
    icon: Icon,
    iconPosition = "right",
    children,
    ...props 
  }, ref) => {
    const classes = cn(buttonVariants({ variant, size, className }));

    const content = (
      <>
        {Icon && iconPosition === "left" && <Icon size={18} className="mr-2" />}
        {children}
        {Icon && iconPosition === "right" && <Icon size={18} className="ml-2" />}
      </>
    );

    if (asChild) {
      return (
        <Slot className={classes} ref={ref} {...props}>
          {children}
        </Slot>
      );
    }

    // External link
    if (href) {
      return (
        <a href={href} className={classes} target={target} rel={rel}>
          {content}
        </a>
      );
    }

    // Internal router link
    if (asLink && to) {
      return (
        <Link to={to} className={classes}>
          {content}
        </Link>
      );
    }

    return (
      <button className={classes} ref={ref} {...props}>
        {content}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
export default Button;
