
import { useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Tv, 
  Waves, 
  Refrigerator, 
  Microwave, 
  Wind, 
  Sofa, 
  ChefHat,
  Coffee,
  UtensilsCrossed,
  Wine,
  Shirt,
  Zap,
  Home,
  Lightbulb,
  Watch,
  Camera,
  Fan,
  Scissors,
  Volume2,
  Headphones
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const categories = [
  {
    name: "Washing Machines",
    icon: Waves,
    route: "/washing-machines"
  },
  {
    name: "Tablets",
    icon: Tv,
    route: "/category/tablets"
  },
  {
    name: "Wearables",
    icon: Watch,
    route: "/category/wearables"
  },
  {
    name: "Kitchen Appliances",
    icon: ChefHat,
    route: "/category/kitchen-appliances"
  },
  {
    name: "Home Theatre",
    icon: Volume2,
    route: "/category/home-theatre"
  },
  {
    name: "Grooming",
    icon: Scissors,
    route: "/category/grooming"
  },
  {
    name: "Microwaves",
    icon: Microwave,
    route: "/microwaves"
  },
  {
    name: "Speakers",
    icon: Headphones,
    route: "/category/speakers"
  },
  {
    name: "Cameras",
    icon: Camera,
    route: "/category/cameras"
  },
  {
    name: "Fans",
    icon: Fan,
    route: "/category/fans"
  },
  {
    name: "Televisions",
    icon: Tv,
    route: "/televisions"
  },
  {
    name: "Refrigerators",
    icon: Refrigerator,
    route: "/refrigerators"
  },
  {
    name: "Air Conditioners",
    icon: Wind,
    route: "/air-conditioners"
  },
  {
    name: "Coffee Machines",
    icon: Coffee,
    route: "/category/coffee-machines"
  },
  {
    name: "Furniture",
    icon: Sofa,
    route: "/furniture"
  },
  {
    name: "Lighting",
    icon: Lightbulb,
    route: "/category/lighting"
  }
];

export const CategoryGrid = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([titleRef.current], { opacity: 0, y: 30 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      });

      tl.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out"
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let isDown = false;
    let startX: number;
    let scrollLeft: number;

    const handleMouseDown = (e: MouseEvent) => {
      isDown = true;
      container.style.cursor = 'grabbing';
      startX = e.pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
    };

    const handleMouseLeave = () => {
      isDown = false;
      container.style.cursor = 'grab';
    };

    const handleMouseUp = () => {
      isDown = false;
      container.style.cursor = 'grab';
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX) * 2;
      container.scrollLeft = scrollLeft - walk;
    };

    container.addEventListener('mousedown', handleMouseDown);
    container.addEventListener('mouseleave', handleMouseLeave);
    container.addEventListener('mouseup', handleMouseUp);
    container.addEventListener('mousemove', handleMouseMove);

    return () => {
      container.removeEventListener('mousedown', handleMouseDown);
      container.removeEventListener('mouseleave', handleMouseLeave);
      container.removeEventListener('mouseup', handleMouseUp);
      container.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-8 bg-gradient-to-br from-background via-muted/10 to-background">
      <div className="container mx-auto px-4">
        <div ref={titleRef} className="text-center mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-foreground mb-2">
            Shop by Category
          </h2>
          <p className="text-sm text-muted-foreground">
            Discover our premium products across all categories
          </p>
        </div>
        
        <div className="relative">
          <div 
            ref={scrollContainerRef}
            className="flex gap-3 overflow-x-auto scrollbar-hide pb-4 cursor-grab select-none scroll-smooth"
            style={{ 
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none',
              scrollBehavior: 'smooth'
            }}
          >
            {categories.map((category, index) => (
              <Link
                key={category.name}
                to={category.route}
                className="group block flex-shrink-0"
              >
                <Card className="hover-lift bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border border-blue-200/50 dark:border-blue-700/50 shadow-sm hover:shadow-md transition-all duration-300 group-hover:border-blue-300/70 dark:group-hover:border-blue-600/70 w-24 h-24 md:w-28 md:h-28">
                  <CardContent className="p-3 flex flex-col items-center justify-center space-y-2 h-full">
                    <div className="relative w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-sm group-hover:shadow-md transition-all duration-300 group-hover:scale-110">
                      <category.icon className="h-4 w-4 md:h-5 md:w-5 text-white" />
                      
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-sm scale-125" />
                    </div>
                    
                    <div className="text-center">
                      <h3 className="font-medium text-foreground text-[10px] md:text-xs leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 text-center">
                        {category.name}
                      </h3>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          
          {/* Scroll indicators */}
          <div className="absolute left-0 top-0 h-full w-8 bg-gradient-to-r from-background to-transparent pointer-events-none opacity-60" />
          <div className="absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-background to-transparent pointer-events-none opacity-60" />
        </div>
        
        <div className="flex justify-center mt-4">
          <div className="text-xs text-muted-foreground bg-muted/50 px-4 py-2 rounded-full">
            Swipe or drag to explore more categories
          </div>
        </div>
      </div>
    </section>
  );
};
