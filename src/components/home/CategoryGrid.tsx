import { useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tv, Waves, Refrigerator, Microwave, Wind } from "lucide-react";
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
    name: "Washing Machines",
    icon: Waves,
    description: "Front & Top Load",
    color: "from-cyan-500 to-cyan-600",
    hoverColor: "from-cyan-600 to-cyan-700",
  },
  {
    name: "Refrigerators",
    icon: Refrigerator,
    description: "Energy Efficient Cooling",
    color: "from-green-500 to-green-600",
    hoverColor: "from-green-600 to-green-700",
  },
  {
    name: "Microwaves",
    icon: Microwave,
    description: "Quick & Convenient",
    color: "from-purple-500 to-purple-600",
    hoverColor: "from-purple-600 to-purple-700",
  },
  {
    name: "Air Conditioners",
    icon: Wind,
    description: "Smart Climate Control",
    color: "from-orange-500 to-orange-600",
    hoverColor: "from-orange-600 to-orange-700",
  },
];

const categoryRoutes = [
  "/category/televisions",
  "/category/washing-machines",
  "/category/refrigerators",
  "", // Microwaves (no separate page yet)
  "", // Air Conditioners (no separate page yet)
];

export const CategoryGrid = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(titleRef.current, { opacity: 0, y: 50 });
      gsap.set(cardsRef.current, { opacity: 0, y: 60, scale: 0.8 });

      // Title animation
      gsap.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      });

      // Cards animation with stagger
      gsap.to(cardsRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.2)",
        scrollTrigger: {
          trigger: cardsRef.current[0],
          start: "top 85%",
          end: "bottom 15%",
          toggleActions: "play none none reverse"
        }
      });

      // Hover animations for cards
      cardsRef.current.forEach((card, index) => {
        if (card) {
          const icon = card.querySelector('.category-icon');
          
          card.addEventListener('mouseenter', () => {
            gsap.to(card, {
              y: -10,
              scale: 1.05,
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
    <section ref={sectionRef} className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Shop by Category
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Explore our extensive range of premium home appliances designed to make your life easier and more comfortable
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {categories.map((category, index) => {
            const link = categoryRoutes[index];
            const isLinked = Boolean(link);
            const CardEl = isLinked ? Link : "div";
            const cardProps = isLinked ? { to: link } : {};
            return (
              <Card
                key={category.name}
                ref={(el) => el && (cardsRef.current[index] = el)}
                as={CardEl}
                {...cardProps}
                className={`group cursor-pointer border-0 shadow-lg overflow-hidden bg-muted hover-scale transition-all duration-200 ${
                  isLinked ? "" : "opacity-60 pointer-events-none"
                }`}
              >
                <CardContent className="p-8 text-center relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-muted to-background opacity-90"></div>
                  <div className="relative z-10">
                    <div className={`category-icon bg-gradient-to-br ${category.color} rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                      <category.icon className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="font-bold text-foreground mb-3 text-lg">{category.name}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{category.description}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
