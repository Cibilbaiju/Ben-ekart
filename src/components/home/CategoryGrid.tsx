
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
  Lightbulb
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const categories = [
  {
    name: "Televisions",
    icon: Tv,
    description: "Smart TVs & Entertainment",
    color: "from-blue-500 to-blue-600",
    hoverColor: "from-blue-600 to-blue-700",
  },
  {
    name: "Refrigerators",
    icon: Refrigerator,
    description: "Energy Efficient Cooling",
    color: "from-green-500 to-green-600",
    hoverColor: "from-green-600 to-green-700",
  },
  {
    name: "Washing Machines",
    icon: Waves,
    description: "Front & Top Load",
    color: "from-cyan-500 to-cyan-600",
    hoverColor: "from-cyan-600 to-cyan-700",
  },
  {
    name: "Air Conditioners",
    icon: Wind,
    description: "Smart Climate Control",
    color: "from-orange-500 to-orange-600",
    hoverColor: "from-orange-600 to-orange-700",
  },
  {
    name: "Microwaves",
    icon: Microwave,
    description: "Quick & Convenient",
    color: "from-purple-500 to-purple-600",
    hoverColor: "from-purple-600 to-purple-700",
  },
  {
    name: "Kitchen Appliances",
    icon: ChefHat,
    description: "Mixers, Blenders & More",
    color: "from-red-500 to-red-600",
    hoverColor: "from-red-600 to-red-700",
  },
  {
    name: "Coffee Machines",
    icon: Coffee,
    description: "Espresso & Filter Coffee",
    color: "from-amber-600 to-amber-700",
    hoverColor: "from-amber-700 to-amber-800",
  },
  {
    name: "Cookware",
    icon: UtensilsCrossed,
    description: "Pots, Pans & Utensils",
    color: "from-slate-600 to-slate-700",
    hoverColor: "from-slate-700 to-slate-800",
  },
  {
    name: "Crockery",
    icon: Wine,
    description: "Dinnerware & Glassware",
    color: "from-rose-500 to-rose-600",
    hoverColor: "from-rose-600 to-rose-700",
  },
  {
    name: "Furniture",
    icon: Sofa,
    description: "Sofas, Tables & Chairs",
    color: "from-indigo-500 to-indigo-600",
    hoverColor: "from-indigo-600 to-indigo-700",
  },
  {
    name: "Wardrobe",
    icon: Shirt,
    description: "Storage & Organization",
    color: "from-teal-500 to-teal-600",
    hoverColor: "from-teal-600 to-teal-700",
  },
  {
    name: "Small Appliances",
    icon: Zap,
    description: "Toasters, Kettles & More",
    color: "from-yellow-500 to-yellow-600",
    hoverColor: "from-yellow-600 to-yellow-700",
  },
  {
    name: "Home Decor",
    icon: Home,
    description: "Decorative Items",
    color: "from-pink-500 to-pink-600",
    hoverColor: "from-pink-600 to-pink-700",
  },
  {
    name: "Lighting",
    icon: Lightbulb,
    description: "LED & Smart Lights",
    color: "from-lime-500 to-lime-600",
    hoverColor: "from-lime-600 to-lime-700",
  },
];

const categoryRoutes = [
  "/category/televisions",
  "/category/refrigerators", 
  "/category/washing-machines",
  "/category/air-conditioners",
  "/category/microwaves",
  "/category/kitchen-appliances",
  "/category/coffee-machines",
  "/category/cookware",
  "/category/crockery",
  "/category/furniture",
  "/category/wardrobe",
  "/category/small-appliances",
  "/category/home-decor",
  "/category/lighting",
];

export const CategoryGrid = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(titleRef.current, { opacity: 0, y: 30 });
      gsap.set(cardsRef.current, { opacity: 0, y: 40, scale: 0.9 });

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

      // Cards animation with stagger
      gsap.to(cardsRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        stagger: 0.08,
        ease: "back.out(1.1)",
        scrollTrigger: {
          trigger: cardsRef.current[0],
          start: "top 90%",
          end: "bottom 10%",
          toggleActions: "play none none reverse"
        }
      });

      // Hover animations for cards
      cardsRef.current.forEach((card) => {
        if (card) {
          const icon = card.querySelector('.category-icon');
          
          card.addEventListener('mouseenter', () => {
            gsap.to(card, {
              y: -8,
              scale: 1.03,
              duration: 0.3,
              ease: "power2.out"
            });
            gsap.to(icon, {
              rotation: 360,
              duration: 0.6,
              ease: "power2.out"
            });
          });

          card.addEventListener('mouseleave', () => {
            gsap.to(card, {
              y: 0,
              scale: 1,
              duration: 0.3,
              ease: "power2.out"
            });
            gsap.to(icon, {
              rotation: 0,
              duration: 0.3,
              ease: "power2.out"
            });
          });
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-12 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <div ref={titleRef} className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 gradient-text">
            Shop by Category
          </h2>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Discover our comprehensive range of premium home appliances, furniture, and essentials
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 md:gap-6">
          {categories.map((category, index) => {
            const link = categoryRoutes[index] || "/category/general";
            const cardEl = (
              <Card
                key={category.name}
                ref={(el) => el && (cardsRef.current[index] = el)}
                className="group cursor-pointer border-0 shadow-md hover:shadow-xl overflow-hidden bg-card/80 backdrop-blur-sm transition-all duration-300"
              >
                <CardContent className="p-4 md:p-6 text-center relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-background/50 to-muted/30 opacity-90"></div>
                  <div className="relative z-10">
                    <div className={`category-icon bg-gradient-to-br ${category.color} rounded-xl w-12 h-12 md:w-16 md:h-16 flex items-center justify-center mx-auto mb-3 md:mb-4 shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
                      <category.icon className="h-6 w-6 md:h-8 md:w-8 text-white" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2 text-sm md:text-base leading-tight">{category.name}</h3>
                    <p className="text-xs md:text-sm text-muted-foreground leading-snug line-clamp-2">{category.description}</p>
                  </div>
                </CardContent>
              </Card>
            );
            return (
              <Link to={link} key={category.name} className="block h-full">
                {cardEl}
              </Link>
            );
          })}
        </div>
        
        {/* View All Categories Button */}
        <div className="text-center mt-8">
          <Link 
            to="/categories" 
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-lg font-medium hover:from-primary/90 hover:to-primary/70 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            View All Categories
          </Link>
        </div>
      </div>
    </section>
  );
};
