
import { useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Clock, Star, ExternalLink } from "lucide-react";
import { gsap } from "gsap";

const FindStore = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  const stores = [
    {
      id: 1,
      name: "BEN Store - Mumbai Central",
      address: "Shop 15, Linking Road, Bandra West, Mumbai - 400050",
      phone: "+91 98765 43210",
      hours: "Mon-Sun: 10:00 AM - 9:00 PM",
      rating: 4.5,
      reviews: 324,
      googleMapsUrl: "https://maps.google.com/?q=Bandra+West+Mumbai",
      googleReviewUrl: "https://www.google.com/search?q=BEN+Store+Mumbai+reviews"
    },
    {
      id: 2,
      name: "BEN Store - Delhi CP",
      address: "Block A-12, Connaught Place, New Delhi - 110001",
      phone: "+91 98765 43211",
      hours: "Mon-Sun: 10:00 AM - 9:00 PM",
      rating: 4.7,
      reviews: 456,
      googleMapsUrl: "https://maps.google.com/?q=Connaught+Place+Delhi",
      googleReviewUrl: "https://www.google.com/search?q=BEN+Store+Delhi+reviews"
    },
    {
      id: 3,
      name: "BEN Store - Bangalore Koramangala",
      address: "80 Feet Road, Koramangala 4th Block, Bangalore - 560034",
      phone: "+91 98765 43212",
      hours: "Mon-Sun: 10:00 AM - 9:00 PM",
      rating: 4.6,
      reviews: 278,
      googleMapsUrl: "https://maps.google.com/?q=Koramangala+Bangalore",
      googleReviewUrl: "https://www.google.com/search?q=BEN+Store+Bangalore+reviews"
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate page entrance
      gsap.from(".page-header", {
        y: -50,
        opacity: 0,
        duration: 1,
        ease: "power2.out"
      });

      // Animate store cards with stagger
      gsap.from(".store-card", {
        y: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        delay: 0.3
      });

      // Hover animations for cards
      cardsRef.current.forEach((card, index) => {
        if (card) {
          const handleMouseEnter = () => {
            gsap.to(card, {
              y: -10,
              scale: 1.02,
              duration: 0.3,
              ease: "power2.out"
            });
          };

          const handleMouseLeave = () => {
            gsap.to(card, {
              y: 0,
              scale: 1,
              duration: 0.3,
              ease: "power2.out"
            });
          };

          card.addEventListener('mouseenter', handleMouseEnter);
          card.addEventListener('mouseleave', handleMouseLeave);

          return () => {
            card.removeEventListener('mouseenter', handleMouseEnter);
            card.removeEventListener('mouseleave', handleMouseLeave);
          };
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const addToRefs = (el: HTMLDivElement) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-gray-800 text-gray-100"
    >
      <div className="container mx-auto px-4 py-12">
        <div className="page-header text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            Find Our Stores
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Visit our premium appliance stores for hands-on experience and expert assistance
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stores.map((store, index) => (
            <Card 
              key={store.id}
              ref={addToRefs}
              className="store-card bg-gradient-to-br from-gray-800 via-gray-900 to-gray-950/95 shadow-2xl border border-gray-800/60 backdrop-blur-lg hover:border-blue-500/50 transition-all duration-300"
            >
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-100 flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-blue-400" />
                  {store.name}
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(store.rating)
                            ? "text-yellow-400 fill-current"
                            : "text-gray-400"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-300">
                    {store.rating} ({store.reviews} reviews)
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-4 w-4 text-gray-400 mt-1 flex-shrink-0" />
                    <p className="text-sm text-gray-300">{store.address}</p>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <p className="text-sm text-gray-300">{store.phone}</p>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <p className="text-sm text-gray-300">{store.hours}</p>
                  </div>
                </div>

                <div className="pt-4 space-y-3">
                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={() => window.open(store.googleMapsUrl, '_blank')}
                  >
                    <MapPin className="h-4 w-4 mr-2" />
                    Get Directions
                    <ExternalLink className="h-4 w-4 ml-2" />
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full border-yellow-500 text-yellow-400 hover:bg-yellow-500 hover:text-black"
                    onClick={() => window.open(store.googleReviewUrl, '_blank')}
                  >
                    <Star className="h-4 w-4 mr-2" />
                    Write a Google Review
                    <ExternalLink className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Card className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 border border-blue-500/30 backdrop-blur-lg max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4 text-gray-100">Can't Find a Store Near You?</h3>
              <p className="text-gray-300 mb-6">
                We offer nationwide delivery for all our premium appliances. Shop online and get your products delivered to your doorstep.
              </p>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3">
                Shop Online Now
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FindStore;
