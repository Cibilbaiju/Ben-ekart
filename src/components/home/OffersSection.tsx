
import { useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Percent, Clock, Tag } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const offers = [
  {
    id: 1,
    title: "Big Sale",
    subtitle: "Up to 70% Off",
    description: "Premium appliances at unbeatable prices",
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&h=300&fit=crop",
    discount: "70% OFF",
    bgGradient: "from-red-500 to-orange-500"
  },
  {
    id: 2,
    title: "Kitchen Special",
    subtitle: "Up to 50% Off",
    description: "Transform your kitchen with smart appliances",
    image: "https://images.unsplash.com/photo-1556909114-4f6e7ad7d3136?w=400&h=300&fit=crop",
    discount: "50% OFF",
    bgGradient: "from-green-500 to-teal-500"
  },
  {
    id: 3,
    title: "Home Theater",
    subtitle: "Up to 60% Off",
    description: "Ultimate entertainment experience at home",
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=300&fit=crop",
    discount: "60% OFF",
    bgGradient: "from-blue-500 to-purple-500"
  },
  {
    id: 4,
    title: "Smart Home",
    subtitle: "Up to 45% Off",
    description: "Automate your home with smart devices",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
    discount: "45% OFF",
    bgGradient: "from-purple-500 to-pink-500"
  },
  {
    id: 5,
    title: "Furniture Sale",
    subtitle: "Up to 55% Off",
    description: "Stylish furniture for every room",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
    discount: "55% OFF",
    bgGradient: "from-amber-500 to-orange-500"
  }
];

export const OffersSection = () => {
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
    <section ref={sectionRef} className="py-16 bg-gradient-to-br from-orange-50/50 via-red-50/50 to-yellow-50/50 dark:from-orange-950/10 dark:via-red-950/10 dark:to-yellow-950/10">
      <div className="container mx-auto px-4">
        <div ref={titleRef} className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Tag className="h-4 w-4" />
            Special Offers
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Limited Time Deals
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Don't miss out on these incredible offers across all categories
          </p>
        </div>
        
        <div className="relative group">
          <div 
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 px-2 cursor-grab select-none scroll-smooth"
            style={{ 
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none',
              scrollBehavior: 'smooth'
            }}
          >
            {offers.map((offer) => (
              <div key={offer.id} className="flex-shrink-0 w-80">
                <Card className="relative overflow-hidden bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-sm border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full">
                  <CardContent className="p-0">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={offer.image}
                        alt={offer.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                      
                      {/* Discount Badge */}
                      <div className="absolute top-4 right-4">
                        <div className={`bg-gradient-to-r ${offer.bgGradient} text-white px-3 py-1 rounded-full font-bold text-sm shadow-lg animate-pulse`}>
                          {offer.discount}
                        </div>
                      </div>
                      
                      {/* Gradient Overlay */}
                      <div className={`absolute inset-0 bg-gradient-to-t ${offer.bgGradient} opacity-20`} />
                    </div>
                    
                    <div className="p-6 space-y-4">
                      <div>
                        <h3 className="text-2xl font-bold text-foreground mb-1">
                          {offer.title}
                        </h3>
                        <p className={`text-lg font-semibold bg-gradient-to-r ${offer.bgGradient} bg-clip-text text-transparent`}>
                          {offer.subtitle}
                        </p>
                        <p className="text-sm text-muted-foreground mt-2">
                          {offer.description}
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-2 text-xs">
                        <div className="flex items-center gap-1 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 px-2 py-1 rounded-full">
                          <Clock className="h-3 w-3" />
                          Limited Time
                        </div>
                        <div className="flex items-center gap-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 px-2 py-1 rounded-full">
                          <Percent className="h-3 w-3" />
                          Best Price
                        </div>
                      </div>
                      
                      <Button 
                        className={`w-full bg-gradient-to-r ${offer.bgGradient} hover:opacity-90 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105`}
                      >
                        Shop Now
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
          
          {/* Scroll Fade Effects */}
          <div className="absolute left-0 top-0 h-full w-12 bg-gradient-to-r from-background via-background/80 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-background via-background/80 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        
        <div className="flex justify-center mt-6">
          <div className="text-xs text-muted-foreground bg-muted/50 px-3 py-1 rounded-full">
            Scroll horizontally to see more offers
          </div>
        </div>
      </div>
    </section>
  );
};
