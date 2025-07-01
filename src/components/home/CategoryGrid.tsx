
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
    color: "from-blue-500 to-cyan-500",
    route: "/washing-machines"
  },
  {
    name: "Tablets",
    icon: Tv,
    color: "from-gray-600 to-slate-700",
    route: "/category/tablets"
  },
  {
    name: "Wearables",
    icon: Watch,
    color: "from-purple-500 to-pink-500",
    route: "/category/wearables"
  },
  {
    name: "Kitchen Appliances",
    icon: ChefHat,
    color: "from-orange-500 to-red-500",
    route: "/category/kitchen-appliances"
  },
  {
    name: "Home Theatre",
    icon: Volume2,
    color: "from-red-500 to-rose-600",
    route: "/category/home-theatre"
  },
  {
    name: "Grooming",
    icon: Scissors,
    color: "from-green-500 to-emerald-600",
    route: "/category/grooming"
  },
  {
    name: "Microwaves",
    icon: Microwave,
    color: "from-yellow-500 to-amber-600",
    route: "/microwaves"
  },
  {
    name: "Speakers",
    icon: Headphones,
    color: "from-indigo-500 to-blue-600",
    route: "/category/speakers"
  },
  {
    name: "Cameras",
    icon: Camera,
    color: "from-pink-500 to-purple-600",
    route: "/category/cameras"
  },
  {
    name: "Fans",
    icon: Fan,
    color: "from-cyan-500 to-teal-600",
    route: "/category/fans"
  },
  {
    name: "Televisions",
    icon: Tv,
    color: "from-slate-600 to-gray-800",
    route: "/televisions"
  },
  {
    name: "Refrigerators",
    icon: Refrigerator,
    color: "from-teal-500 to-green-600",
    route: "/refrigerators"
  },
  {
    name: "Air Conditioners",
    icon: Wind,
    color: "from-blue-400 to-cyan-500",
    route: "/air-conditioners"
  },
  {
    name: "Coffee Machines",
    icon: Coffee,
    color: "from-amber-600 to-orange-700",
    route: "/category/coffee-machines"
  },
  {
    name: "Cookware",
    icon: UtensilsCrossed,
    color: "from-gray-500 to-slate-600",
    route: "/category/cookware"
  },
  {
    name: "Crockery",
    icon: Wine,
    color: "from-rose-500 to-pink-600",
    route: "/category/crockery"
  },
  {
    name: "Furniture",
    icon: Sofa,
    color: "from-brown-500 to-amber-700",
    route: "/furniture"
  },
  {
    name: "Wardrobe",
    icon: Shirt,
    color: "from-emerald-500 to-green-600",
    route: "/category/wardrobe"
  },
  {
    name: "Small Appliances",
    icon: Zap,
    color: "from-violet-500 to-purple-600",
    route: "/category/small-appliances"
  },
  {
    name: "Home Decor",
    icon: Home,
    color: "from-lime-500 to-green-600",
    route: "/category/home-decor"
  },
  {
    name: "Lighting",
    icon: Lightbulb,
    color: "from-yellow-400 to-amber-500",
    route: "/category/lighting"
  }
];

export const CategoryGrid = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(titleRef.current, { opacity: 0, y: 30 });

      gsap.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 85%",
          end: "bottom 15%",
          toggleActions: "play none none reverse"
        }
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
    <section ref={sectionRef} className="py-12 bg-gradient-to-br from-background via-muted/5 to-background">
      <div className="container mx-auto px-4">
        <div ref={titleRef} className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            Shop by Category
          </h2>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            Discover our comprehensive range of premium products across all categories
          </p>
        </div>
        
        <div className="relative group">
          <div 
            ref={scrollContainerRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 px-2 cursor-grab select-none scroll-smooth"
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
                className="flex-shrink-0 group/item"
              >
                <Card className="relative overflow-hidden bg-gradient-to-br from-white/50 to-white/30 backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:scale-105 min-w-[120px] max-w-[120px]">
                  <CardContent className="p-4 flex flex-col items-center space-y-3">
                    <div className={`
                      relative w-14 h-14 rounded-2xl 
                      bg-gradient-to-br ${category.color} 
                      flex items-center justify-center 
                      shadow-lg group-hover/item:shadow-xl 
                      transition-all duration-300 
                      group-hover/item:rotate-6
                      border-2 border-white/30
                    `}>
                      <category.icon className="h-7 w-7 text-white drop-shadow-sm" />
                      
                      <div className={`
                        absolute inset-0 rounded-2xl 
                        bg-gradient-to-br ${category.color} 
                        opacity-0 group-hover/item:opacity-50 
                        transition-opacity duration-300 
                        blur-lg scale-110
                      `} />
                    </div>
                    
                    <div className="text-center">
                      <h3 className="font-semibold text-foreground text-xs leading-tight max-w-[90px] line-clamp-2 group-hover/item:text-primary transition-colors duration-300">
                        {category.name}
                      </h3>
                    </div>
                  </CardContent>
                  
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-primary/5 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300" />
                </Card>
              </Link>
            ))}
          </div>
          
          <div className="absolute left-0 top-0 h-full w-12 bg-gradient-to-r from-background via-background/80 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-background via-background/80 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        
        <div className="flex justify-center mt-6">
          <div className="text-xs text-muted-foreground bg-muted/50 px-3 py-1 rounded-full">
            Scroll horizontally to see more categories
          </div>
        </div>
      </div>
    </section>
  );
};
