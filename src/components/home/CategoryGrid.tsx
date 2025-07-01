
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
    color: "from-blue-500 to-blue-600",
    route: "/category/washing-machines"
  },
  {
    name: "Tablets",
    icon: Tv,
    color: "from-gray-600 to-gray-700",
    route: "/category/tablets"
  },
  {
    name: "Wearables",
    icon: Watch,
    color: "from-purple-500 to-purple-600",
    route: "/category/wearables"
  },
  {
    name: "Kitchen Appliances",
    icon: ChefHat,
    color: "from-orange-500 to-orange-600",
    route: "/category/kitchen-appliances"
  },
  {
    name: "Home Theatres & Soundbars",
    icon: Volume2,
    color: "from-red-500 to-red-600",
    route: "/category/home-theatre"
  },
  {
    name: "Grooming",
    icon: Scissors,
    color: "from-green-500 to-green-600",
    route: "/category/grooming"
  },
  {
    name: "Microwaves",
    icon: Microwave,
    color: "from-yellow-500 to-yellow-600",
    route: "/category/microwaves"
  },
  {
    name: "Speakers & Media Players",
    icon: Headphones,
    color: "from-indigo-500 to-indigo-600",
    route: "/category/speakers"
  },
  {
    name: "Cameras",
    icon: Camera,
    color: "from-pink-500 to-pink-600",
    route: "/category/cameras"
  },
  {
    name: "Fans",
    icon: Fan,
    color: "from-cyan-500 to-cyan-600",
    route: "/category/fans"
  },
  {
    name: "Televisions",
    icon: Tv,
    color: "from-slate-600 to-slate-700",
    route: "/category/televisions"
  },
  {
    name: "Refrigerators",
    icon: Refrigerator,
    color: "from-teal-500 to-teal-600",
    route: "/category/refrigerators"
  },
  {
    name: "Air Conditioners",
    icon: Wind,
    color: "from-blue-400 to-blue-500",
    route: "/category/air-conditioners"
  },
  {
    name: "Coffee Machines",
    icon: Coffee,
    color: "from-amber-600 to-amber-700",
    route: "/category/coffee-machines"
  },
  {
    name: "Cookware",
    icon: UtensilsCrossed,
    color: "from-gray-500 to-gray-600",
    route: "/category/cookware"
  },
  {
    name: "Crockery",
    icon: Wine,
    color: "from-rose-500 to-rose-600",
    route: "/category/crockery"
  },
  {
    name: "Furniture",
    icon: Sofa,
    color: "from-brown-500 to-brown-600",
    route: "/category/furniture"
  },
  {
    name: "Wardrobe",
    icon: Shirt,
    color: "from-emerald-500 to-emerald-600",
    route: "/category/wardrobe"
  },
  {
    name: "Small Appliances",
    icon: Zap,
    color: "from-violet-500 to-violet-600",
    route: "/category/small-appliances"
  },
  {
    name: "Home Decor",
    icon: Home,
    color: "from-lime-500 to-lime-600",
    route: "/category/home-decor"
  },
  {
    name: "Lighting",
    icon: Lightbulb,
    color: "from-yellow-400 to-yellow-500",
    route: "/category/lighting"
  }
];

export const CategoryGrid = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(titleRef.current, { opacity: 0, y: 30 });

      // Title animation
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

  return (
    <section ref={sectionRef} className="py-8 bg-background">
      <div className="container mx-auto px-4">
        <div ref={titleRef} className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            Shop by Category
          </h2>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            Discover our comprehensive range of premium products
          </p>
        </div>
        
        {/* Horizontal Scrollable Category Grid */}
        <div className="relative">
          <div 
            ref={scrollContainerRef}
            className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide pb-4 px-2"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {categories.map((category, index) => (
              <Link
                key={category.name}
                to={category.route}
                className="flex-shrink-0 group"
              >
                <div className="flex flex-col items-center space-y-3 min-w-[100px] md:min-w-[120px]">
                  {/* Circular Icon Container */}
                  <div className={`
                    relative w-16 h-16 md:w-20 md:h-20 rounded-full 
                    bg-gradient-to-br ${category.color} 
                    flex items-center justify-center 
                    shadow-lg group-hover:shadow-xl 
                    transition-all duration-300 
                    group-hover:scale-110 
                    group-hover:-translate-y-1
                    border-4 border-white/20
                  `}>
                    <category.icon className="h-7 w-7 md:h-9 md:w-9 text-white" />
                    
                    {/* Subtle glow effect */}
                    <div className={`
                      absolute inset-0 rounded-full 
                      bg-gradient-to-br ${category.color} 
                      opacity-0 group-hover:opacity-30 
                      transition-opacity duration-300 
                      blur-sm scale-110
                    `} />
                  </div>
                  
                  {/* Category Name */}
                  <div className="text-center">
                    <h3 className="font-medium text-foreground text-xs md:text-sm leading-tight max-w-[90px] md:max-w-[110px] line-clamp-2 group-hover:text-primary transition-colors duration-300">
                      {category.name}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          {/* Gradient Fade Effects */}
          <div className="absolute left-0 top-0 h-full w-8 bg-gradient-to-r from-background to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-background to-transparent pointer-events-none" />
        </div>
        
        {/* Navigation Dots Indicator */}
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: Math.ceil(categories.length / 8) }).map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-muted-foreground/30 transition-colors duration-300"
            />
          ))}
        </div>
      </div>
    </section>
  );
};
