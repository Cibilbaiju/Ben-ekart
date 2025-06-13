
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { Timer, Zap, Gift, Percent } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const offerProducts = [
  {
    id: "1",
    name: "Samsung 65\" 4K Smart TV",
    price: 74999,
    originalPrice: 109999,
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=400&h=300&fit=crop",
    rating: 4.8,
    reviews: 234,
    category: "Television"
  },
  {
    id: "2", 
    name: "LG Front Load Washing Machine",
    price: 54999,
    originalPrice: 67999,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop",
    rating: 4.6,
    reviews: 189,
    category: "Washing Machine"
  },
  {
    id: "3",
    name: "Whirlpool French Door Refrigerator", 
    price: 109999,
    originalPrice: 135999,
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=300&fit=crop",
    rating: 4.7,
    reviews: 156,
    category: "Refrigerator"
  },
  {
    id: "4",
    name: "Panasonic Inverter Microwave",
    price: 25999,
    originalPrice: 33999,
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=300&fit=crop",
    rating: 4.5,
    reviews: 298,
    category: "Microwave"
  },
];

const Offers = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 14,
    minutes: 32,
    seconds: 45,
  });

  const heroRef = useRef<HTMLElement>(null);
  const flashSaleRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement[]>([]);
  const productsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation
      gsap.fromTo(heroRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      );

      // Flash sale animation
      gsap.fromTo(flashSaleRef.current,
        { opacity: 0, scale: 0.8 },
        { 
          opacity: 1, 
          scale: 1, 
          duration: 0.8, 
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: flashSaleRef.current,
            start: "top 80%"
          }
        }
      );

      // Categories animation
      gsap.fromTo(categoriesRef.current,
        { opacity: 0, y: 60 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.6,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: categoriesRef.current[0],
            start: "top 85%"
          }
        }
      );

      // Products animation
      gsap.fromTo(productsRef.current,
        { opacity: 0, y: 40 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: productsRef.current,
            start: "top 85%"
          }
        }
      );

    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <section ref={heroRef} className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-600 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-float">
            🔥 Special Offers 🔥
          </h1>
          <p className="text-xl mb-8 opacity-90">
            Don't miss out on these incredible deals on premium home appliances
          </p>
          <div className="flex justify-center">
            <img 
              src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&h=300&fit=crop"
              alt="Special Offers"
              className="rounded-2xl shadow-2xl max-w-md animate-shimmer"
            />
          </div>
        </div>
      </section>

      {/* Flash Sale */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <Card ref={flashSaleRef} className="bg-gradient-to-r from-red-500 to-pink-600 text-white border-0 shadow-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-red-600/50 to-pink-700/50"></div>
            <CardHeader className="text-center relative z-10">
              <div className="flex items-center justify-center mb-4">
                <Zap className="h-8 w-8 mr-2 animate-pulse" />
                <CardTitle className="text-3xl">⚡ Flash Sale! ⚡</CardTitle>
              </div>
              <p className="text-lg opacity-90">Up to 50% off on selected items</p>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="flex justify-center mb-6">
                <div className="grid grid-cols-4 gap-4 text-center">
                  <div className="bg-white/20 rounded-lg p-3 hover:bg-white/30 transition-all">
                    <div className="text-2xl font-bold">{timeLeft.days}</div>
                    <div className="text-sm opacity-75">Days</div>
                  </div>
                  <div className="bg-white/20 rounded-lg p-3 hover:bg-white/30 transition-all">
                    <div className="text-2xl font-bold">{timeLeft.hours}</div>
                    <div className="text-sm opacity-75">Hours</div>
                  </div>
                  <div className="bg-white/20 rounded-lg p-3 hover:bg-white/30 transition-all">
                    <div className="text-2xl font-bold">{timeLeft.minutes}</div>
                    <div className="text-sm opacity-75">Minutes</div>
                  </div>
                  <div className="bg-white/20 rounded-lg p-3 hover:bg-white/30 transition-all">
                    <div className="text-2xl font-bold">{timeLeft.seconds}</div>
                    <div className="text-sm opacity-75">Seconds</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Offer Categories */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card 
              ref={(el) => el && (categoriesRef.current[0] = el)}
              className="text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 bg-white/80 backdrop-blur-sm"
            >
              <CardContent className="p-6">
                <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Percent className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Seasonal Sale</h3>
                <p className="text-gray-600 mb-4">Up to 40% off on winter appliances</p>
                <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg">
                  Shop Now
                </Button>
              </CardContent>
            </Card>

            <Card 
              ref={(el) => el && (categoriesRef.current[1] = el)}
              className="text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 bg-white/80 backdrop-blur-sm"
            >
              <CardContent className="p-6">
                <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Gift className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Bundle Deals</h3>
                <p className="text-gray-600 mb-4">Save more when you buy together</p>
                <Button className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 shadow-lg">
                  View Bundles
                </Button>
              </CardContent>
            </Card>

            <Card 
              ref={(el) => el && (categoriesRef.current[2] = el)}
              className="text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 bg-white/80 backdrop-blur-sm"
            >
              <CardContent className="p-6">
                <div className="bg-gradient-to-br from-orange-100 to-orange-200 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Timer className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Limited Time</h3>
                <p className="text-gray-600 mb-4">Exclusive deals ending soon</p>
                <Button className="bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 shadow-lg">
                  Grab Now
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Offers */}
      <section className="py-12 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Featured Offers
            </h2>
            <p className="text-lg text-gray-600">
              Hand-picked deals with the biggest savings
            </p>
          </div>
          
          <div ref={productsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {offerProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                id={product.id}
                name={product.name}
                price={product.price}
                originalPrice={product.originalPrice}
                image={product.image}
                rating={product.rating}
                reviews={product.reviews}
                category={product.category}
                badge="HOT DEAL"
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Offers;
