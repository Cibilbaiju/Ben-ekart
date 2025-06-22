
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const HorizontalScrollAnimation = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const sections = sectionsRef.current;
    
    if (!container || !sections) return;

    const ctx = gsap.context(() => {
      // Get all sections
      const sectionElements = sections.querySelectorAll('.scroll-section');
      
      // Calculate total width needed for horizontal scrolling
      const totalWidth = sectionElements.length * window.innerWidth;
      
      // Set the width of the sections container
      gsap.set(sections, { width: totalWidth });
      
      // Create horizontal scroll animation
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
          onUpdate: (self) => {
            // Optional: Add any updates during scroll
            console.log("Scroll progress:", self.progress);
          }
        }
      });

      // Individual section animations
      sectionElements.forEach((section, index) => {
        const content = section.querySelector('.section-content');
        
        if (content) {
          gsap.fromTo(content,
            { 
              opacity: 0, 
              y: 100,
              scale: 0.8
            },
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

    // Handle resize
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      ctx.revert();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const sections = [
    {
      id: 1,
      title: "Premium Electronics",
      subtitle: "Latest Technology at Your Fingertips",
      description: "Discover cutting-edge televisions, smart home devices, and entertainment systems that transform your living space.",
      image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800&h=600&fit=crop",
      bgColor: "from-blue-900 via-blue-800 to-purple-900"
    },
    {
      id: 2,
      title: "Kitchen Appliances",
      subtitle: "Cook Like a Professional Chef",
      description: "Professional-grade refrigerators, dishwashers, and cooking appliances designed for the modern kitchen.",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop",
      bgColor: "from-green-900 via-green-800 to-teal-900"
    },
    {
      id: 3,
      title: "Home Comfort",
      subtitle: "Perfect Climate Control",
      description: "Energy-efficient air conditioners, heating systems, and smart home automation for ultimate comfort.",
      image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&h=600&fit=crop",
      bgColor: "from-orange-900 via-red-800 to-pink-900"
    },
    {
      id: 4,
      title: "Furniture Collection",
      subtitle: "Style Meets Functionality",
      description: "Premium furniture pieces that combine modern design with exceptional comfort and durability.",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
      bgColor: "from-purple-900 via-indigo-800 to-blue-900"
    }
  ];

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-black"
    >
      <div 
        ref={sectionsRef}
        className="flex h-full"
      >
        {sections.map((section, index) => (
          <div
            key={section.id}
            className={`scroll-section flex-shrink-0 w-screen h-full relative overflow-hidden bg-gradient-to-br ${section.bgColor}`}
          >
            {/* Background Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
              style={{ backgroundImage: `url(${section.image})` }}
            />
            
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/40" />
            
            {/* Content */}
            <div className="section-content relative z-10 h-full flex items-center justify-center px-8 md:px-16">
              <div className="text-center text-white max-w-4xl">
                <div className="mb-4">
                  <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium border border-white/20">
                    Section {index + 1}
                  </span>
                </div>
                
                <h2 className="text-4xl md:text-7xl font-bold mb-6 leading-tight">
                  {section.title}
                </h2>
                
                <h3 className="text-xl md:text-3xl font-light mb-8 text-gray-200">
                  {section.subtitle}
                </h3>
                
                <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
                  {section.description}
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="px-8 py-4 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
                    Explore Collection
                  </button>
                  <button className="px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-black transition-all duration-300">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
            
            {/* Section Number Indicator */}
            <div className="absolute bottom-8 right-8 text-white/60 text-6xl md:text-8xl font-bold">
              0{index + 1}
            </div>
            
            {/* Progress Indicator */}
            <div className="absolute bottom-8 left-8 flex space-x-2">
              {sections.map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === index ? 'bg-white' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      
      {/* Scroll Hint */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/80 text-center pointer-events-none">
        <div className="flex flex-col items-center space-y-2">
          <span className="text-sm font-medium">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-bounce" />
          </div>
        </div>
      </div>
    </div>
  );
};
