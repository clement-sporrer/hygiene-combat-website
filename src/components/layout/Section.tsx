import { cn } from "@/lib/utils";

interface SectionProps {
  children: React.ReactNode;
  variant?: "light" | "dark" | "muted";
  className?: string;
  containerClassName?: string;
  id?: string;
  fullScreen?: boolean;
  size?: "default" | "narrow" | "wide";
  spacing?: "compact" | "default" | "relaxed" | "hero";
}

const Section = ({
  children,
  variant = "light",
  className,
  containerClassName,
  id,
  fullScreen,
  size = "wide",
  spacing = "default",
}: SectionProps) => {
  const variants = {
    light: "bg-brand-white text-brand-black",
    dark: "bg-brand-black text-brand-white",
    muted: "bg-muted/30 text-foreground",
  };

  const containerSizes = {
    default: "container-content",
    narrow: "container-narrow",
    wide: "container-wide",
  };

  // Refined spacing scale based on content density:
  // compact: py-12 sm:py-16 md:py-20 (for dense content)
  // default: py-16 sm:py-20 md:py-24 lg:py-32 (standard sections)
  // relaxed: py-20 sm:py-24 md:py-32 lg:py-40 (spacious sections)
  // hero: py-16 sm:py-20 md:py-24 (hero sections, compact)
  const spacingClasses = {
    compact: "py-12 sm:py-16 md:py-20",
    default: "py-16 sm:py-20 md:py-24 lg:py-32",
    relaxed: "py-20 sm:py-24 md:py-32 lg:py-40",
    hero: "py-16 sm:py-20 md:py-24",
  };

  // Navbar heights: h-16 (4rem/64px) mobile, h-20 (5rem/80px) desktop
  
  return (
    <section
      id={id}
      className={cn(
        variants[variant],
        fullScreen 
          ? "min-h-screen pt-16 md:pt-20 flex flex-col overflow-x-hidden" 
          : cn(spacingClasses[spacing], "overflow-x-hidden"),
        className
      )}
    >
      <div
        className={cn(
          containerSizes[size],
          "w-full",
          fullScreen && "flex-1 flex flex-col justify-center min-h-[calc(100vh-4rem)] md:min-h-[calc(100vh-5rem)]",
          "overflow-x-hidden",
          containerClassName
        )}
      >
        {children}
      </div>
    </section>
  );
};

export default Section;

