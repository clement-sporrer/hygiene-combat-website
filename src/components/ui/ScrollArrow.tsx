import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface ScrollArrowProps {
  targetId?: string;
  className?: string;
  variant?: "light" | "dark";
}

const ScrollArrow = ({ targetId, className, variant = "light" }: ScrollArrowProps) => {
  const handleClick = () => {
    if (targetId) {
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      // Scroll to next section
      const currentSection = document.elementFromPoint(
        window.innerWidth / 2,
        window.innerHeight / 2
      )?.closest("section");
      
      if (currentSection?.nextElementSibling) {
        (currentSection.nextElementSibling as HTMLElement).scrollIntoView({
          behavior: "smooth",
          block: "start",
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

