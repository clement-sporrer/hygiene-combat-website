import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface ScrollArrowProps {
  targetId?: string;
  className?: string;
  variant?: "light" | "dark";
}

/**
 * Calcule la position absolue du haut d'un élément dans le document.
 * Utilise getBoundingClientRect() + window.scrollY pour une méthode robuste
 * qui fonctionne même avec des transformations CSS et des positions relatives.
 */
const getAbsoluteTop = (element: HTMLElement): number => {
  const rect = element.getBoundingClientRect();
  return rect.top + window.scrollY;
};

/**
 * Trouve la section suivante de manière fiable.
 * Parcourt toutes les sections et trouve celle qui vient après la section actuelle.
 */
const findNextSection = (currentSection: HTMLElement | null): HTMLElement | null => {
  if (!currentSection) return null;
  
  const allSections = Array.from(document.querySelectorAll("section")) as HTMLElement[];
  const currentIndex = allSections.indexOf(currentSection);
  
  if (currentIndex >= 0 && currentIndex < allSections.length - 1) {
    return allSections[currentIndex + 1];
  }
  
  return null;
};

/**
 * Trouve la section actuellement visible dans le viewport.
 * Utilise une méthode plus fiable que elementFromPoint.
 */
const findCurrentSection = (): HTMLElement | null => {
  const allSections = Array.from(document.querySelectorAll("section")) as HTMLElement[];
  const viewportCenter = window.innerHeight / 2;
  const scrollY = window.scrollY;
  const centerY = scrollY + viewportCenter;
  
  // Trouve la section qui contient le centre du viewport
  for (const section of allSections) {
    const sectionTop = getAbsoluteTop(section);
    const sectionBottom = sectionTop + section.offsetHeight;
    
    if (centerY >= sectionTop && centerY <= sectionBottom) {
      return section;
    }
  }
  
  // Si aucune section ne contient le centre, trouve la section la plus proche
  let closestSection: HTMLElement | null = null;
  let minDistance = Infinity;
  
  for (const section of allSections) {
    const sectionTop = getAbsoluteTop(section);
    const distance = Math.abs(sectionTop - centerY);
    
    if (distance < minDistance) {
      minDistance = distance;
      closestSection = section;
    }
  }
  
  return closestSection;
};

const ScrollArrow = ({ targetId, className, variant = "light" }: ScrollArrowProps) => {
  const handleClick = () => {
    // Récupère la hauteur réelle de la navbar depuis le DOM
    const header = document.querySelector("header");
    const navbarHeight = header 
      ? header.getBoundingClientRect().height 
      : (window.innerWidth >= 768 ? 80 : 64); // Fallback: 5rem (80px) md, 4rem (64px) mobile
    
    if (targetId) {
      // Scroll vers une section spécifique par son ID
      const target = document.getElementById(targetId);
      if (target) {
        // Position absolue du haut réel de la section (avant le padding)
        const elementAbsoluteTop = getAbsoluteTop(target);
        
        // Position de scroll = position absolue - hauteur navbar
        // Cela place le haut de la section exactement à navbarHeight pixels sous le haut de la fenêtre
        // La navbar (fixe) recouvrira donc les premiers pixels de la section
        const scrollPosition = elementAbsoluteTop - navbarHeight;

        window.scrollTo({
          top: Math.max(0, scrollPosition), // S'assure qu'on ne scroll pas à une position négative
          behavior: "smooth"
        });
      }
    } else {
      // Scroll vers la section suivante
      const currentSection = findCurrentSection();
      const nextSection = findNextSection(currentSection);
      
      if (nextSection) {
        // Position absolue du haut réel de la section suivante
        const elementAbsoluteTop = getAbsoluteTop(nextSection);
        
        // Position de scroll = position absolue - hauteur navbar
        const scrollPosition = elementAbsoluteTop - navbarHeight;

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

