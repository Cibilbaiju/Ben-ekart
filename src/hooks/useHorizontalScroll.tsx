
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollSection {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  bgColor: string;
}

export const useHorizontalScroll = (sections: ScrollSection[]) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const sectionsContainer = sectionsRef.current;
    
    if (!container || !sectionsContainer) return;

    const ctx = gsap.context(() => {
      const sectionElements = sectionsContainer.querySelectorAll('.scroll-section');
      const totalWidth = sectionElements.length * window.innerWidth;
      
      gsap.set(sectionsContainer, { width: totalWidth });
      
      const horizontalScroll = gsap.to(sectionElements, {
        xPercent: -100 * (sectionElements.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: container,
          pin: true,
          scrub: 1,
          snap: 1 / (sectionElements.length - 1),
          end: () => `+=${totalWidth - window.innerWidth}`,
          anticipatePin: 1,
        }
      });

      sectionElements.forEach((section) => {
        const content = section.querySelector('.section-content');
        
        if (content) {
          gsap.fromTo(content,
            { opacity: 0, y: 100, scale: 0.8 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: section,
                start: "left center",
                end: "right center",
                containerAnimation: horizontalScroll,
                scrub: 1
              }
            }
          );
        }
      });

    }, container);

    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      ctx.revert();
      window.removeEventListener('resize', handleResize);
    };
  }, [sections]);

  return { containerRef, sectionsRef };
};
