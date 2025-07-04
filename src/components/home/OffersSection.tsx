
import { useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Percent, Clock, Tag, Zap, Gift, Star } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const offers = [
  {
    id: 1,
    title: "MEGA SALE",
    subtitle: "Up to 70% Off",
    description: "Premium appliances at unbeatable prices",
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&h=300&fit=crop",
    discount: "70% OFF",
    bgGradient: "from-red-500 via-pink-500 to-orange-500",
    timer: "2d 14h 32m"
  },
  {
    id: 2,
    title: "Kitchen Special",
    subtitle: "Up to 50% Off",
    description: "Transform your kitchen with smart appliances",
    image: "https://images.unsplash.com/photo-1556909114-4f6e7ad7d3136?w=400&h=300&fit=crop",
    discount: "50% OFF",
    bgGradient: "from-green-500 via-emerald-500 to-teal-500",
    timer: "5d 8h 45m"
  },
  {
    id: 3,
    title: "Home Theater",
    subtitle: "Up to 60% Off",
    description: "Ultimate entertainment experience at home",
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=300&fit=crop",
    discount: "60% OFF",
    bgGradient: "from-blue-500 via-purple-500 to-indigo-500",
    timer: "1d 22h 15m"
  },
  {
    id: 4,
    title: "Smart Home",
    subtitle: "Up to 45% Off",
    description: "Automate your home with smart devices",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
    discount: "45% OFF",
    bgGradient: "from-purple-500 via-violet-500 to-pink-500",
    timer: "3d 6h 28m"
  },
  {
    id: 5,
    title: "Furniture Sale",
    subtitle: "Up to 55% Off",
    description: "Stylish furniture for every room",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
    discount: "55% OFF",
    bgGradient: "from-amber-500 via-yellow-500 to-orange-500",
    timer: "4d 12h 10m"
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
    <section ref={sectionRef} className="py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-pink-400/20 to-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-purple-500/10 rounded-full blur-3xl animate-spin-slow"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div ref={titleRef} className="text-center mb-12">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-red-500/20 to-orange-500/20 backdrop-blur-sm border border-red-400/30 text-red-300 px-6 py-3 rounded-full text-lg font-bold mb-6 animate-bounce">
            <Zap className="h-6 w-6 animate-pulse" />
            🔥 LIMITED TIME DEALS 🔥
            <Zap className="h-6 w-6 animate-pulse" />
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-transparent bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 bg-clip-text mb-4 animate-gradient">
            FLASH SALE
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-4">
            Don't miss out on these incredible offers - Limited Stock Available!
          </p>
          <div className="inline-flex items-center gap-2 text-yellow-400 font-semibold">
            <Clock className="h-5 w-5 animate-spin" />
            Hurry! Sale ends soon
          </div>
        </div>
        
        <div className="relative group">
          <div 
            ref={scrollContainerRef}
            className="flex gap-8 overflow-x-auto scrollbar-hide pb-6 px-4 cursor-grab select-none scroll-smooth"
            style={{ 
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none',
              scrollBehavior: 'smooth'
            }}
          >
            {offers.map((offer, index) => (
              <div key={offer.id} className="flex-shrink-0 w-96">
                <Card className="relative overflow-hidden bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl border-2 border-gray-700/50 shadow-2xl hover:shadow-purple-500/25 transition-all duration-700 hover:-translate-y-4 hover:scale-105 group/card h-full">
                  <CardContent className="p-0 relative">
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={offer.image}
                        alt={offer.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110"
                      />
                      
                      {/* Animated discount badge */}
                      <div className="absolute top-4 right-4">
                        <div className={`relative bg-gradient-to-r ${offer.bgGradient} text-white px-4 py-2 rounded-full font-black text-lg shadow-2xl`}>
                          {offer.discount}
                          <div className="absolute inset-0 bg-white/20 rounded-full animate-ping"></div>
                        </div>
                      </div>
                      
                      {/* Timer badge */}
                      <div className="absolute top-4 left-4">
                        <div className="bg-black/70 backdrop-blur-sm text-yellow-400 px-3 py-1 rounded-full text-sm font-bold border border-yellow-400/30">
                          <Clock className="inline h-4 w-4 mr-1" />
                          {offer.timer}
                        </div>
                      </div>
                      
                      {/* Gradient overlay */}
                      <div className={`absolute inset-0 bg-gradient-to-t ${offer.bgGradient} opacity-30`} />
                    </div>
                    
                    <div className="p-8 space-y-6 relative">
                      {/* Glowing background effect */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${offer.bgGradient} opacity-5 rounded-b-lg`}></div>
                      
                      <div className="relative z-10">
                        <h3 className="text-3xl font-black text-white mb-2 group-hover/card:text-transparent group-hover/card:bg-gradient-to-r group-hover/card:from-yellow-400 group-hover/card:to-pink-500 group-hover/card:bg-clip-text transition-all duration-500">
                          {offer.title}
                        </h3>
                        <p className={`text-2xl font-bold bg-gradient-to-r ${offer.bgGradient} bg-clip-text text-transparent mb-3`}>
                          {offer.subtitle}
                        </p>
                        <p className="text-gray-300 text-base leading-relaxed">
                          {offer.description}
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-3 text-xs relative z-10">
                        <div className="flex items-center gap-1 bg-orange-500/20 text-orange-300 px-3 py-2 rounded-full border border-orange-500/30">
                          <Gift className="h-4 w-4" />
                          Limited Stock
                        </div>
                        <div className="flex items-center gap-1 bg-green-500/20 text-green-300 px-3 py-2 rounded-full border border-green-500/30">
                          <Star className="h-4 w-4" />
                          Best Price
                        </div>
                      </div>
                      
                      <Button 
                        className={`w-full bg-gradient-to-r ${offer.bgGradient} hover:opacity-90 text-white font-bold text-lg py-4 shadow-2xl hover:shadow-xl transition-all duration-500 transform hover:scale-105 relative z-10 border-2 border-white/20 hover:border-white/40`}
                      >
                        <Zap className="mr-2 h-5 w-5 animate-pulse" />
                        GRAB NOW
                        <ArrowRight className="ml-2 h-5 w-5 animate-bounce" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
          
          {/* Enhanced scroll indicators */}
          <div className="absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-slate-900 via-slate-900/60 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-slate-900 via-slate-900/60 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
        
        <div className="flex justify-center mt-8">
          <div className="text-sm text-gray-400 bg-gray-800/50 backdrop-blur-sm px-6 py-3 rounded-full border border-gray-700/50">
            <ArrowRight className="inline h-4 w-4 mr-2 animate-pulse" />
            Scroll horizontally to explore more amazing deals
          </div>
        </div>
      </div>
    </section>
  );
};
