import { cn } from "@/lib/utils";

interface SectionProps {
  children: React.ReactNode;
  variant?: "light" | "dark" | "muted";
  className?: string;
  containerClassName?: string;
  id?: string;
  fullScreen?: boolean;
}

const Section = ({
  children,
  variant = "light",
  className,
  containerClassName,
  id,
  fullScreen,
}: SectionProps) => {
  const variants = {
    light: "bg-brand-white text-brand-black",
    dark: "bg-brand-black text-brand-white",
    muted: "bg-muted/30 text-foreground",
  };

  // Navbar heights: h-16 (4rem/64px) mobile, h-20 (5rem/80px) desktop
  // If fullScreen:
  // 1. Section covers full viewport (min-h-screen)
  // 2. We add top padding to account for fixed navbar (pt-16 md:pt-20)
  // 3. Container takes remaining height (min-h-[calc(100vh-navbar)])
  
  return (
    <section
      id={id}
      className={cn(
        variants[variant],
        // Scroll margin for anchors
        "scroll-mt-16 md:scroll-mt-20",
        fullScreen ? "min-h-screen pt-16 md:pt-20 flex flex-col" : "py-16 md:py-20 lg:py-24",
        className
      )}
    >
      <div
        className={cn(
          "container mx-auto px-6 md:px-10 lg:px-16",
          // If fullScreen, center content in the available space
          fullScreen && "flex-1 flex flex-col justify-center min-h-[calc(100vh-4rem)] md:min-h-[calc(100vh-5rem)]",
          containerClassName
        )}
      >
        {children}
      </div>
    </section>
  );
};

export default Section;

