import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface ScrollArrowProps {
  targetId?: string;
  className?: string;
  variant?: "light" | "dark";
}

/**
 * Scroll vers une section en positionnant son haut réel en haut de la fenêtre.
 * 
 * Comportement simple :
 * - Calcule la position absolue du haut de la section
 * - Scroll à cette position
 * - Le padding-top de la section gère l'espace sous la navbar
 * - Pas besoin de connaître la hauteur de la navbar
 */
const scrollToSection = (section: HTMLElement): void => {
  const rect = section.getBoundingClientRect();
  const absoluteTop = rect.top + window.scrollY;

  window.scrollTo({
    top: absoluteTop,
    behavior: "smooth",
  });
};

/**
 * Trouve la section actuellement visible dans le viewport.
 */
const getCurrentSection = (): HTMLElement | null => {
  const allSections = Array.from(document.querySelectorAll("section")) as HTMLElement[];
  if (allSections.length === 0) return null;

  const scrollY = window.scrollY;
  const viewportCenter = scrollY + window.innerHeight / 2;

  for (const section of allSections) {
    const rect = section.getBoundingClientRect();
    const sectionTop = rect.top + window.scrollY;
    const sectionBottom = sectionTop + section.offsetHeight;

    if (viewportCenter >= sectionTop && viewportCenter <= sectionBottom) {
      return section;
    }
  }

  // Si aucune section ne contient le centre, trouve la section la plus proche
  let closestSection: HTMLElement | null = null;
  let minDistance = Infinity;

  for (const section of allSections) {
    const rect = section.getBoundingClientRect();
    const sectionTop = rect.top + window.scrollY;
    const distance = Math.abs(sectionTop - viewportCenter);

    if (distance < minDistance) {
      minDistance = distance;
      closestSection = section;
    }
  }

  return closestSection;
};

/**
 * Trouve la section suivante après la section actuelle.
 */
const getNextSection = (currentSection: HTMLElement | null): HTMLElement | null => {
  if (!currentSection) return null;

  const allSections = Array.from(document.querySelectorAll("section")) as HTMLElement[];
  const currentIndex = allSections.indexOf(currentSection);

  if (currentIndex >= 0 && currentIndex < allSections.length - 1) {
    return allSections[currentIndex + 1];
  }

  return null;
};

const ScrollArrow = ({ targetId, className, variant = "light" }: ScrollArrowProps) => {
  const handleClick = () => {
    if (targetId) {
      // Scroll vers une section spécifique par son ID
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        scrollToSection(targetSection);
      }
    } else {
      // Scroll vers la section suivante
      const currentSection = getCurrentSection();
      const nextSection = getNextSection(currentSection);
      
      if (nextSection) {
        scrollToSection(nextSection);
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
