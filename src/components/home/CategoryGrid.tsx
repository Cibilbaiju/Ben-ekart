
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
    name: "Furniture",
    icon: Sofa,
    color: "from-brown-500 to-amber-700",
    route: "/furniture"
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
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([titleRef.current, gridRef.current], { opacity: 0, y: 30 });

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
      })
      .to(gridRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out"
      }, "-=0.3");

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-12 bg-gradient-to-br from-background via-muted/10 to-background">
      <div className="container mx-auto px-4">
        <div ref={titleRef} className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            Shop by Category
          </h2>
          <p className="text-base text-muted-foreground max-w-xl mx-auto">
            Discover our premium products across all categories
          </p>
        </div>
        
        <div ref={gridRef} className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-8 xl:grid-cols-8 gap-4">
          {categories.map((category, index) => (
            <Link
              key={category.name}
              to={category.route}
              className="group block"
            >
              <Card className="hover-lift bg-gradient-to-br from-card via-card to-muted/20 border border-border/50 shadow-md hover:shadow-xl transition-all duration-300 group-hover:border-primary/20">
                <CardContent className="p-4 flex flex-col items-center space-y-3">
                  <div className={`
                    relative w-12 h-12 rounded-full 
                    bg-gradient-to-br ${category.color} 
                    flex items-center justify-center 
                    shadow-md group-hover:shadow-lg 
                    transition-all duration-300 
                    group-hover:scale-110
                  `}>
                    <category.icon className="h-6 w-6 text-white" />
                    
                    <div className={`
                      absolute inset-0 rounded-full 
                      bg-gradient-to-br ${category.color} 
                      opacity-0 group-hover:opacity-30 
                      transition-opacity duration-300 
                      blur-lg scale-125
                    `} />
                  </div>
                  
                  <div className="text-center">
                    <h3 className="font-medium text-foreground text-xs leading-tight group-hover:text-primary transition-colors duration-300">
                      {category.name}
                    </h3>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
