
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import { 
  Tv, 
  Refrigerator, 
  WashingMachine, 
  AirVent, 
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
  Bike,
  Car,
  Dumbbell,
  Book,
  Shirt,
  Home,
  Gift,
  Music,
  Plane,
  Coffee
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const categories = [
  { name: "TVs", icon: Tv, path: "/televisions", gradient: "from-purple-600 to-blue-600" },
  { name: "Fridges", icon: Refrigerator, path: "/refrigerators", gradient: "from-blue-600 to-cyan-600" },
  { name: "Washing", icon: WashingMachine, path: "/washing-machines", gradient: "from-green-600 to-teal-600" },
  { name: "ACs", icon: AirVent, path: "/air-conditioners", gradient: "from-cyan-600 to-blue-600" },
  { name: "Microwaves", icon: Microwave, path: "/microwaves", gradient: "from-orange-600 to-red-600" },
  { name: "Furniture", icon: Sofa, path: "/furniture", gradient: "from-amber-600 to-orange-600" },
  { name: "Laptops", icon: Laptop, path: "/laptops", gradient: "from-gray-600 to-slate-600" },
  { name: "Phones", icon: Smartphone, path: "/phones", gradient: "from-indigo-600 to-purple-600" },
  { name: "Audio", icon: Headphones, path: "/audio", gradient: "from-pink-600 to-rose-600" },
  { name: "Cameras", icon: Camera, path: "/cameras", gradient: "from-emerald-600 to-green-600" },
  { name: "Watches", icon: Watch, path: "/watches", gradient: "from-yellow-600 to-amber-600" },
  { name: "Gaming", icon: Gamepad2, path: "/gaming", gradient: "from-red-600 to-pink-600" },
  { name: "Monitors", icon: Monitor, path: "/monitors", gradient: "from-violet-600 to-purple-600" },
  { name: "Speakers", icon: Speaker, path: "/speakers", gradient: "from-teal-600 to-cyan-600" },
  { name: "Tablets", icon: Tablet, path: "/tablets", gradient: "from-lime-600 to-green-600" },
  { name: "Bikes", icon: Bike, path: "/bikes", gradient: "from-slate-600 to-gray-600" },
  { name: "Cars", icon: Car, path: "/cars", gradient: "from-blue-700 to-indigo-700" },
  { name: "Fitness", icon: Dumbbell, path: "/fitness", gradient: "from-red-700 to-orange-700" },
  { name: "Books", icon: Book, path: "/books", gradient: "from-brown-600 to-amber-700" },
  { name: "Fashion", icon: Shirt, path: "/fashion", gradient: "from-pink-700 to-purple-700" },
  { name: "Home", icon: Home, path: "/home", gradient: "from-green-700 to-teal-700" },
  { name: "Gifts", icon: Gift, path: "/gifts", gradient: "from-rose-600 to-pink-600" },
  { name: "Music", icon: Music, path: "/music", gradient: "from-purple-700 to-indigo-700" },
  { name: "Travel", icon: Plane, path: "/travel", gradient: "from-sky-600 to-blue-600" },
  { name: "Lifestyle", icon: Coffee, path: "/lifestyle", gradient: "from-amber-700 to-yellow-600" },
];

export const CategoryGrid = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const scrollContainer = scrollContainerRef.current;
    
    if (!container || !scrollContainer) return;

    gsap.fromTo(
      container.children,
      { 
        opacity: 0,
        y: 20
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: container,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        scrollContainer.scrollLeft += e.deltaY;
      }
    };

    scrollContainer.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      scrollContainer.removeEventListener('wheel', handleWheel);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section className="py-16 bg-gradient-to-br from-gray-900 via-gray-950 to-black relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]" />
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text mb-4">
            Shop by Category
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Discover amazing products across all categories with the best deals and quality
          </p>
        </div>

        {/* Desktop: Single row with horizontal scroll */}
        <div className="hidden lg:block">
          <div 
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto pb-4"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
          >
            <style jsx>{`
              div::-webkit-scrollbar {
                display: none;
              }
            `}</style>
            <div ref={containerRef} className="flex gap-6 min-w-max">
              {categories.map((category, index) => {
                const IconComponent = category.icon;
                return (
                  <Link
                    key={index}
                    to={category.path}
                    className="group flex-shrink-0"
                  >
                    <div className="relative w-32 h-32 rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 hover:scale-105 group-hover:shadow-2xl group-hover:shadow-blue-500/20">
                      <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-2xl`} />
                      
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                        <IconComponent className="h-8 w-8 text-gray-300 group-hover:text-white transition-colors duration-300 mb-2" />
                        <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors duration-300 text-center leading-tight">
                          {category.name}
                        </span>
                      </div>
                      
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
          
          <div className="flex justify-center mt-6">
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <div className="w-1 h-1 bg-gray-500 rounded-full animate-pulse" />
              <span>Scroll horizontally to see more</span>
              <div className="w-1 h-1 bg-gray-500 rounded-full animate-pulse" />
            </div>
          </div>
        </div>

        {/* Mobile: Two rows with horizontal scroll */}
        <div className="lg:hidden">
          <div className="space-y-6">
            {/* First row */}
            <div 
              className="flex gap-4 overflow-x-auto pb-2"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
              }}
            >
              <style jsx>{`
                div::-webkit-scrollbar {
                  display: none;
                }
              `}</style>
              <div className="flex gap-4 min-w-max">
                {categories.slice(0, Math.ceil(categories.length / 2)).map((category, index) => {
                  const IconComponent = category.icon;
                  return (
                    <Link
                      key={index}
                      to={category.path}
                      className="group flex-shrink-0"
                    >
                      <div className="relative w-24 h-24 rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 hover:scale-105">
                        <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-xl`} />
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-3">
                          <IconComponent className="h-6 w-6 text-gray-300 group-hover:text-white transition-colors duration-300 mb-1" />
                          <span className="text-xs font-medium text-gray-300 group-hover:text-white transition-colors duration-300 text-center leading-tight">
                            {category.name}
                          </span>
                        </div>
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Second row */}
            <div 
              className="flex gap-4 overflow-x-auto pb-2"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
              }}
            >
              <style jsx>{`
                div::-webkit-scrollbar {
                  display: none;
                }
              `}</style>
              <div className="flex gap-4 min-w-max">
                {categories.slice(Math.ceil(categories.length / 2)).map((category, index) => {
                  const IconComponent = category.icon;
                  return (
                    <Link
                      key={index + Math.ceil(categories.length / 2)}
                      to={category.path}
                      className="group flex-shrink-0"
                    >
                      <div className="relative w-24 h-24 rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 hover:scale-105">
                        <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-xl`} />
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-3">
                          <IconComponent className="h-6 w-6 text-gray-300 group-hover:text-white transition-colors duration-300 mb-1" />
                          <span className="text-xs font-medium text-gray-300 group-hover:text-white transition-colors duration-300 text-center leading-tight">
                            {category.name}
                          </span>
                        </div>
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
