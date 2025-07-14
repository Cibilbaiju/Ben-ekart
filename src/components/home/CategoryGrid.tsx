
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { 
  Tv, 
  Refrigerator, 
  WashingMachine, 
  Wind, 
  Microwave, 
  Sofa, 
  Laptop, 
  Smartphone, 
  Headphones, 
  Camera, 
  Watch, 
  Gamepad2,
  Monitor,
  Speaker,
  Tablet
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const categories = [
  { name: "TVs", path: "/televisions", icon: Tv, items: "50+" },
  { name: "Fridges", path: "/refrigerators", icon: Refrigerator, items: "30+" },
  { name: "Washing", path: "/washing-machines", icon: WashingMachine, items: "25+" },
  { name: "AC", path: "/air-conditioners", icon: Wind, items: "40+" },
  { name: "Microwave", path: "/microwaves", icon: Microwave, items: "20+" },
  { name: "Furniture", path: "/furniture", icon: Sofa, items: "60+" },
  { name: "Laptops", path: "/laptops", icon: Laptop, items: "35+" },
  { name: "Phones", path: "/smartphones", icon: Smartphone, items: "45+" },
  { name: "Audio", path: "/headphones", icon: Headphones, items: "30+" },
  { name: "Cameras", path: "/cameras", icon: Camera, items: "25+" },
  { name: "Watches", path: "/watches", icon: Watch, items: "40+" },
  { name: "Gaming", path: "/gaming", icon: Gamepad2, items: "35+" },
  { name: "Monitors", path: "/monitors", icon: Monitor, items: "28+" },
  { name: "Speakers", path: "/speakers", icon: Speaker, items: "32+" },
  { name: "Tablets", path: "/tablets", icon: Tablet, items: "22+" },
];

export const CategoryGrid = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(titleRef.current, { opacity: 0, y: 30 });
      gsap.set(categoriesRef.current.filter(Boolean), { opacity: 0, y: 40, scale: 0.9 });

      gsap.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      });

      gsap.to(categoriesRef.current.filter(Boolean), {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: categoriesRef.current[0],
          start: "top 90%",
          toggleActions: "play none none reverse"
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-6 bg-black">
      <div className="container mx-auto px-4">
        <div ref={titleRef} className="text-center mb-5">
          <h2 className="text-lg md:text-xl font-bold text-white mb-1">
            Shop by Category
          </h2>
          <p className="text-gray-400 text-xs">
            Find the perfect products for your needs
          </p>
        </div>
        
        <div className="grid grid-cols-5 md:grid-cols-15 gap-2 max-w-6xl mx-auto">
          {categories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <Link
                key={category.name}
                to={category.path}
                ref={(el) => {
                  categoriesRef.current[index] = el;
                }}
              >
                <Card className="h-16 bg-gray-900 hover:bg-gray-800 hover:shadow-lg transition-all duration-300 hover:scale-105 border border-gray-800 hover:border-gray-700">
                  <div className="p-2 h-full flex flex-col items-center justify-center">
                    <div className="flex-1 flex items-center justify-center mb-1">
                      <IconComponent className="w-4 h-4 text-white" />
                    </div>
                    <div className="text-center">
                      <h3 className="font-medium text-xs text-white mb-0.5 line-clamp-1">
                        {category.name}
                      </h3>
                      <p className="text-xs text-gray-400">
                        {category.items}
                      </p>
                    </div>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
