
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
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
  Tablet,
  Car,
  Home,
  Shirt,
  Book,
  Dumbbell,
  Utensils,
  Flower,
  Baby,
  PawPrint,
  Briefcase
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const categories = [
  { name: "TVs & Electronics", path: "/televisions", icon: Tv, items: "50+" },
  { name: "Home Appliances", path: "/refrigerators", icon: Refrigerator, items: "30+" },
  { name: "Washing Machines", path: "/washing-machines", icon: WashingMachine, items: "25+" },
  { name: "Air Conditioners", path: "/air-conditioners", icon: Wind, items: "40+" },
  { name: "Kitchen Appliances", path: "/microwaves", icon: Microwave, items: "20+" },
  { name: "Furniture", path: "/furniture", icon: Sofa, items: "60+" },
  { name: "Laptops & Computers", path: "/laptops", icon: Laptop, items: "35+" },
  { name: "Smartphones", path: "/smartphones", icon: Smartphone, items: "45+" },
  { name: "Audio & Headphones", path: "/headphones", icon: Headphones, items: "30+" },
  { name: "Cameras", path: "/cameras", icon: Camera, items: "25+" },
  { name: "Watches", path: "/watches", icon: Watch, items: "40+" },
  { name: "Gaming", path: "/gaming", icon: Gamepad2, items: "35+" },
  { name: "Monitors", path: "/monitors", icon: Monitor, items: "28+" },
  { name: "Speakers", path: "/speakers", icon: Speaker, items: "32+" },
  { name: "Tablets", path: "/tablets", icon: Tablet, items: "22+" },
  { name: "Automotive", path: "/automotive", icon: Car, items: "18+" },
  { name: "Home & Garden", path: "/home-garden", icon: Home, items: "55+" },
  { name: "Fashion & Style", path: "/fashion", icon: Shirt, items: "120+" },
  { name: "Books & Media", path: "/books", icon: Book, items: "80+" },
  { name: "Sports & Fitness", path: "/sports", icon: Dumbbell, items: "65+" },
  { name: "Food & Beverages", path: "/food", icon: Utensils, items: "90+" },
  { name: "Beauty & Health", path: "/beauty", icon: Flower, items: "75+" },
  { name: "Baby & Kids", path: "/baby-kids", icon: Baby, items: "45+" },
  { name: "Pets & Supplies", path: "/pets", icon: PawPrint, items: "38+" },
  { name: "Office & Business", path: "/office", icon: Briefcase, items: "42+" },
];

export const CategoryGrid = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.set(titleRef.current, { opacity: 0, y: 30 });
      gsap.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      });

      // Categories animation
      gsap.set(categoriesRef.current.filter(Boolean), { 
        opacity: 0, 
        y: 50, 
        scale: 0.8,
        rotateY: 15
      });

      gsap.to(categoriesRef.current.filter(Boolean), {
        opacity: 1,
        y: 0,
        scale: 1,
        rotateY: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: scrollContainerRef.current,
          start: "top 90%",
          toggleActions: "play none none reverse"
        }
      });

      // Continuous subtle animation for categories
      categoriesRef.current.filter(Boolean).forEach((card, index) => {
        if (card) {
          gsap.to(card, {
            y: Math.sin(index * 0.5) * 5,
            duration: 2 + (index * 0.1),
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: index * 0.1
          });
        }
      });

      // Scroll container animation
      if (scrollContainerRef.current) {
        gsap.fromTo(scrollContainerRef.current,
          { x: -100, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            delay: 0.3,
            scrollTrigger: {
              trigger: scrollContainerRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-8 md:py-12 bg-gradient-to-b from-black via-gray-950 to-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/5 via-purple-900/5 to-pink-900/5 pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div ref={titleRef} className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-2">
            Shop by Category
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-4 rounded-full" />
          <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto">
            Discover amazing products across all categories with the best deals and quality guaranteed
          </p>
        </div>
        
        <div ref={scrollContainerRef} className="relative">
          <ScrollArea className="w-full whitespace-nowrap rounded-xl">
            <div className="flex gap-4 md:gap-6 pb-4">
              {categories.map((category, index) => {
                const IconComponent = category.icon;
                return (
                  <Link
                    key={category.name}
                    to={category.path}
                    ref={(el) => {
                      categoriesRef.current[index] = el;
                    }}
                    className="group flex-shrink-0"
                  >
                    <Card className="w-32 h-36 md:w-40 md:h-44 bg-gradient-to-br from-gray-900/80 via-gray-800/90 to-gray-900/80 backdrop-blur-sm hover:from-gray-800/90 hover:via-gray-700/90 hover:to-gray-800/90 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20 border border-gray-700/50 hover:border-blue-500/30 relative overflow-hidden group">
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* Shine effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                      
                      <div className="p-3 md:p-4 h-full flex flex-col items-center justify-center relative z-10">
                        <div className="flex-1 flex items-center justify-center mb-2 md:mb-3">
                          <div className="p-2 md:p-3 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 group-hover:from-blue-500/30 group-hover:to-purple-500/30 transition-all duration-300 group-hover:scale-110">
                            <IconComponent className="w-6 h-6 md:w-8 md:h-8 text-blue-400 group-hover:text-blue-300 transition-colors duration-300" />
                          </div>
                        </div>
                        <div className="text-center">
                          <h3 className="font-semibold text-xs md:text-sm text-white mb-1 line-clamp-2 group-hover:text-blue-100 transition-colors duration-300">
                            {category.name}
                          </h3>
                          <p className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                            {category.items}
                          </p>
                        </div>
                      </div>
                    </Card>
                  </Link>
                );
              })}
            </div>
            <ScrollBar orientation="horizontal" className="h-2 bg-gray-800/50 rounded-full">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
            </ScrollBar>
          </ScrollArea>
          
          {/* Scroll indicators */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-full bg-gradient-to-r from-black/80 to-transparent pointer-events-none md:block hidden" />
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-full bg-gradient-to-l from-black/80 to-transparent pointer-events-none md:block hidden" />
        </div>
        
        {/* Call to action */}
        <div className="text-center mt-8 md:mt-12">
          <p className="text-gray-400 text-sm mb-4">Can't find what you're looking for?</p>
          <Link 
            to="/search" 
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            Browse All Categories
          </Link>
        </div>
      </div>
    </section>
  );
};
