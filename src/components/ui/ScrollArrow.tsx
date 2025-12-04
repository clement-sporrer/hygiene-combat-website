import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface ScrollArrowProps {
  targetId?: string;
  className?: string;
  variant?: "light" | "dark";
}

/**
 * Obtient la hauteur réelle de la navbar depuis le DOM.
 * La navbar est fixe (position: fixed) et sa hauteur peut varier selon le viewport.
 */
const getNavbarHeight = (): number => {
  const header = document.querySelector("header");
  if (header) {
    return header.getBoundingClientRect().height;
  }
  // Fallback basé sur les classes Tailwind : h-16 (64px) mobile, h-20 (80px) desktop
  return window.innerWidth >= 768 ? 80 : 64;
};

/**
 * Calcule la position absolue du haut d'un élément dans le document.
 * Utilise getBoundingClientRect() qui est la méthode la plus fiable
 * car elle fonctionne même avec des transformations CSS complexes.
 * 
 * getBoundingClientRect().top donne la position relative au viewport,
 * on ajoute window.scrollY pour obtenir la position absolue dans le document.
 */
const getElementAbsoluteTop = (element: HTMLElement): number => {
  const rect = element.getBoundingClientRect();
  return rect.top + window.scrollY;
};

/**
 * Trouve la section qui contient actuellement le centre du viewport.
 * Utilise une méthode basée sur les positions absolues pour plus de fiabilité.
 */
const getCurrentSection = (): HTMLElement | null => {
  const allSections = Array.from(document.querySelectorAll("section")) as HTMLElement[];
  if (allSections.length === 0) return null;

  const viewportCenter = window.scrollY + window.innerHeight / 2;

  // Trouve la section qui contient le centre du viewport
  for (const section of allSections) {
    const sectionTop = getElementAbsoluteTop(section);
    const sectionBottom = sectionTop + section.offsetHeight;

    if (viewportCenter >= sectionTop && viewportCenter <= sectionBottom) {
      return section;
    }
  }

  // Si aucune section ne contient le centre, trouve la section la plus proche
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

/**
 * Scroll vers une section en positionnant son haut réel exactement sous la navbar.
 * 
 * Méthode utilisée :
 * 1. Désactive temporairement le scroll-margin-top pour éviter toute interférence
 * 2. Obtient la position absolue du haut de la section dans le document
 * 3. Soustrait la hauteur de la navbar pour obtenir la position de scroll cible
 * 4. Utilise window.scrollTo() avec behavior: "smooth" pour un scroll fluide
 * 5. Réactive le scroll-margin-top après le scroll
 * 
 * Le calcul utilise getBoundingClientRect() qui donne la position relative au viewport,
 * puis on ajoute window.scrollY pour obtenir la position absolue dans le document.
 * 
 * Résultat attendu :
 * - Le haut réel de la section (avant le padding) est placé à navbarHeight pixels sous le haut de la fenêtre
 * - La navbar (fixe) recouvre les premiers pixels de la section
 * - Le contenu commence juste sous la navbar grâce au padding-top de la section
 */
const scrollToSection = (section: HTMLElement): void => {
  // Obtient la hauteur réelle de la navbar depuis le DOM
  const navbarHeight = getNavbarHeight();
  
  // Sauvegarde et désactive temporairement le scroll-margin-top pour éviter toute interférence
  const originalScrollMarginTop = section.style.scrollMarginTop;
  section.style.scrollMarginTop = "0";
  
  // Calcule la position absolue du haut de la section dans le document
  // getBoundingClientRect().top = position relative au viewport actuel
  // window.scrollY = position de scroll actuelle dans le document
  // sectionAbsoluteTop = position absolue du haut de la section dans le document
  const rect = section.getBoundingClientRect();
  const sectionAbsoluteTop = rect.top + window.scrollY;
  
  // Position de scroll cible = position absolue de la section - hauteur navbar
  // Cela place le haut réel de la section à navbarHeight pixels sous le haut de la fenêtre
  // La navbar (position: fixed, top: 0) recouvrira donc les premiers pixels de la section
  const targetScrollPosition = sectionAbsoluteTop - navbarHeight;
  const finalScrollPosition = Math.max(0, targetScrollPosition);

  // Scroll vers la position calculée avec animation smooth
  window.scrollTo({
    top: finalScrollPosition,
    behavior: "smooth",
  });

  // Réactive le scroll-margin-top après un court délai
  // (pour laisser le smooth scroll se terminer)
  setTimeout(() => {
    section.style.scrollMarginTop = originalScrollMarginTop;
  }, 1000);
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
