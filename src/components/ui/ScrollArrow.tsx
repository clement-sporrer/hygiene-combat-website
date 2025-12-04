import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface ScrollArrowProps {
  targetId?: string;
  className?: string;
  variant?: "light" | "dark";
}

/**
 * Obtient la hauteur réelle de la navbar depuis le DOM.
 */
const getNavbarHeight = (): number => {
  const header = document.querySelector("header");
  if (header) {
    return header.getBoundingClientRect().height;
  }
  return window.innerWidth >= 768 ? 80 : 64;
};

/**
 * Calcule la position absolue du haut d'un élément dans le document.
 * Utilise getBoundingClientRect() + window.scrollY pour une méthode robuste.
 */
const getElementAbsoluteTop = (element: HTMLElement): number => {
  const rect = element.getBoundingClientRect();
  return rect.top + window.scrollY;
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
    const sectionTop = getElementAbsoluteTop(section);
    const sectionBottom = sectionTop + section.offsetHeight;

    if (viewportCenter >= sectionTop && viewportCenter <= sectionBottom) {
      return section;
    }
  }

  let closestSection: HTMLElement | null = null;
  let minDistance = Infinity;

  for (const section of allSections) {
    const sectionTop = getElementAbsoluteTop(section);
    const distance = Math.abs(sectionTop - viewportCenter);

    if (distance < minDistance) {
      minDistance = distance;
      closestSection = section;
    }
  }

  return closestSection;
};

/**
 * Trouve la section suivante.
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

/**
 * Scroll vers une section en positionnant son haut réel exactement sous la navbar.
 * 
 * MÉTHODE ROBUSTE :
 * 1. Désactive le scroll-margin-top via style inline (override la classe CSS)
 * 2. Calcule la position absolue du haut de la section
 * 3. Soustrait la hauteur de la navbar
 * 4. Scroll directement à cette position avec smooth
 * 5. Réactive le scroll-margin-top après le scroll
 */
const scrollToSection = (section: HTMLElement): void => {
  const navbarHeight = getNavbarHeight();
  
  // Désactive le scroll-margin-top en forçant 0 via style inline avec !important
  // Cela override la classe CSS scroll-mt-16/md:scroll-mt-20
  const originalScrollMarginTop = section.style.scrollMarginTop;
  section.style.setProperty('scroll-margin-top', '0', 'important');
  
  // Utilise requestAnimationFrame pour s'assurer que le calcul se fait après le rendu
  requestAnimationFrame(() => {
    // Position absolue du haut de la section dans le document
    // getBoundingClientRect() donne la position du bord de l'élément (avant le padding)
    const rect = section.getBoundingClientRect();
    const sectionAbsoluteTop = rect.top + window.scrollY;
    
    // Position de scroll = position absolue - hauteur navbar
    // Le haut réel de la section sera à navbarHeight pixels sous le haut de la fenêtre
    // La navbar (fixe) recouvrira donc les premiers pixels de la section
    const targetScrollPosition = sectionAbsoluteTop - navbarHeight;
    const finalScrollPosition = Math.max(0, targetScrollPosition);

    // Scroll direct vers la position calculée
    window.scrollTo({
      top: finalScrollPosition,
      behavior: "smooth",
    });

    // Réactive le scroll-margin-top après le scroll (pour les ancres)
    setTimeout(() => {
      if (originalScrollMarginTop) {
        section.style.scrollMarginTop = originalScrollMarginTop;
      } else {
        section.style.removeProperty('scroll-margin-top');
      }
    }, 1000);
  });
};

const ScrollArrow = ({ targetId, className, variant = "light" }: ScrollArrowProps) => {
  const handleClick = () => {
    if (targetId) {
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        scrollToSection(targetSection);
      }
    } else {
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
