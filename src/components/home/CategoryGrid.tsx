
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const categories = [
  { name: "Televisions", path: "/televisions", image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=200&h=150&fit=crop", items: "50+" },
  { name: "Refrigerators", path: "/refrigerators", image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=200&h=150&fit=crop", items: "30+" },
  { name: "Washing Machines", path: "/washing-machines", image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=200&h=150&fit=crop", items: "25+" },
  { name: "Air Conditioners", path: "/air-conditioners", image: "https://images.unsplash.com/photo-1585338447937-7082f8fc763d?w=200&h=150&fit=crop", items: "40+" },
  { name: "Microwaves", path: "/microwaves", image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=200&h=150&fit=crop", items: "20+" },
  { name: "Furniture", path: "/furniture", image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=200&h=150&fit=crop", items: "60+" },
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
    <section ref={sectionRef} className="py-12 bg-gray-900">
      <div className="container mx-auto px-4">
        <div ref={titleRef} className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Shop by Category
          </h2>
          <p className="text-gray-300">
            Find the perfect appliances for your home
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category, index) => (
            <Link
              key={category.name}
              to={category.path}
              ref={(el) => {
                categoriesRef.current[index] = el;
              }}
            >
              <Card className="h-40 bg-gray-800 hover:bg-gray-700 hover:shadow-lg transition-all duration-300 hover:scale-105 border border-gray-700 hover:border-gray-600">
                <div className="p-4 h-full flex flex-col">
                  <div className="flex-1 flex items-center justify-center mb-3">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-16 h-16 object-cover rounded-lg shadow-sm"
                    />
                  </div>
                  <div className="text-center">
                    <h3 className="font-semibold text-sm text-white mb-1 line-clamp-2">
                      {category.name}
                    </h3>
                    <p className="text-xs text-gray-400">
                      {category.items} items
                    </p>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
