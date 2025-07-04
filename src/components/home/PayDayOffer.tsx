
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Percent, Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

export const PayDayOffer = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const posterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(posterRef.current, { opacity: 0, scale: 0.9 });

      gsap.to(posterRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: posterRef.current,
          start: "top 85%",
          end: "bottom 15%",
          toggleActions: "play none none reverse"
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-12 bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 dark:from-orange-950/20 dark:via-red-950/20 dark:to-pink-950/20">
      <div className="container mx-auto px-4">
        <div 
          ref={posterRef}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 shadow-2xl"
        >
          {/* Background decorations */}
          <div className="absolute inset-0">
            <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-10 right-10 w-40 h-40 bg-yellow-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-spin-slow"></div>
          </div>

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between p-8 lg:p-16">
            {/* Left Content */}
            <div className="text-center lg:text-left lg:flex-1 mb-8 lg:mb-0">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 text-white px-4 py-2 rounded-full text-sm font-bold mb-4 animate-bounce">
                <Sparkles className="h-4 w-4 animate-pulse" />
                Limited Time Only
                <Sparkles className="h-4 w-4 animate-pulse" />
              </div>
              
              <h2 className="text-4xl lg:text-6xl font-black text-white mb-4 leading-tight">
                PAY DAY
                <br />
                <span className="text-yellow-300 animate-pulse">SPECIAL</span>
                <br />
                OFFER
              </h2>
              
              <p className="text-xl lg:text-2xl text-white/90 mb-6 max-w-lg">
                Get up to <span className="font-bold text-yellow-300">50% OFF</span> on all home appliances
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/offers">
                  <Button 
                    size="lg"
                    className="bg-white text-red-600 hover:bg-gray-100 font-bold text-lg px-8 py-4 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                  >
                    Shop Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                
                <Button 
                  variant="outline"
                  size="lg"
                  className="border-white/30 text-white hover:bg-white/10 font-bold text-lg px-8 py-4 backdrop-blur-sm"
                >
                  <Percent className="mr-2 h-5 w-5" />
                  View Deals
                </Button>
              </div>
            </div>

            {/* Right Image */}
            <div className="lg:flex-1 flex justify-center">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=500&h=400&fit=crop"
                  alt="Pay Day Special Offer"
                  className="w-80 h-80 lg:w-96 lg:h-96 object-cover rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
                />
                
                {/* Floating discount badge */}
                <div className="absolute -top-6 -right-6 bg-yellow-400 text-red-600 w-24 h-24 rounded-full flex items-center justify-center font-black text-lg shadow-2xl animate-bounce">
                  50%
                  <br />
                  OFF
                </div>
                
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-pink-500/20 rounded-2xl blur-xl scale-110 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
