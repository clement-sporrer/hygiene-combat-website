import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface ScrollArrowProps {
  targetId?: string;
  className?: string;
  variant?: "light" | "dark";
}

const ScrollArrow = ({ targetId, className, variant = "light" }: ScrollArrowProps) => {
  const handleClick = () => {
    // Get actual navbar height from the header element
    const header = document.querySelector("header");
    const navbarHeight = header 
      ? header.getBoundingClientRect().height 
      : (window.innerWidth >= 768 ? 80 : 64); // Fallback: 5rem (80px) md, 4rem (64px) mobile
    
    if (targetId) {
      const target = document.getElementById(targetId);
      if (target) {
        // Get the absolute position of the section's top edge in the document
        const rect = target.getBoundingClientRect();
        const elementTop = rect.top + window.scrollY;
        
        // Scroll so that the section's top edge is exactly navbarHeight pixels from viewport top
        // This means the navbar will cover the first navbarHeight pixels of the section
        const scrollPosition = elementTop - navbarHeight;

        window.scrollTo({
          top: Math.max(0, scrollPosition), // Ensure we don't scroll to negative position
          behavior: "smooth"
        });
      }
    } else {
      // Scroll to next section
      const currentSection = document.elementFromPoint(
        window.innerWidth / 2,
        window.innerHeight / 2
      )?.closest("section");
      
      if (currentSection?.nextElementSibling) {
        const nextSection = currentSection.nextElementSibling as HTMLElement;
        const rect = nextSection.getBoundingClientRect();
        const elementTop = rect.top + window.scrollY;
        const scrollPosition = elementTop - navbarHeight;

        window.scrollTo({
          top: Math.max(0, scrollPosition),
          behavior: "smooth",
        });
      }
    }
  };

  const isDark = variant === "dark";

  return (
    <button
      onClick={handleClick}
      className={cn(
        "absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-10",
        "flex flex-col items-center gap-2",
        "opacity-60 hover:opacity-100 transition-opacity duration-300",
        "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-full",
        className
      )}
      aria-label="Aller à la section suivante"
    >
      <ChevronDown
        size={24}
        className={cn(
          "animate-bounce",
          isDark ? "text-brand-white" : "text-brand-black"
        )}
      />
    </button>
  );
};

export default ScrollArrow;

