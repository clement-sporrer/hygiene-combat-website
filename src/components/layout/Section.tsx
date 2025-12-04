import { cn } from "@/lib/utils";

interface SectionProps {
  children: React.ReactNode;
  variant?: "light" | "dark" | "muted";
  className?: string;
  containerClassName?: string;
  id?: string;
}

const Section = ({
  children,
  variant = "light",
  className,
  containerClassName,
  id,
}: SectionProps) => {
  const variants = {
    light: "bg-brand-white text-brand-black",
    dark: "bg-brand-black text-brand-white",
    muted: "bg-muted/30 text-foreground",
  };

  // Don't apply default padding if h-screen is in className
  const hasFullHeight = className?.includes("h-screen");
  
  return (
    <section
      id={id}
      className={cn(
        !hasFullHeight && "py-16 md:py-20 lg:py-24",
        variants[variant],
        className
      )}
    >
      <div
        className={cn(
          "container mx-auto px-4 sm:px-6 lg:px-8",
          containerClassName
        )}
      >
        {children}
      </div>
    </section>
  );
};

export default Section;

