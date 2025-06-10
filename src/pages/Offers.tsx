
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { Timer, Zap, Gift, Percent } from "lucide-react";
import { useEffect, useState } from "react";

const offerProducts = [
  {
    id: 1,
    name: "Samsung 65\" 4K Smart TV",
    price: 899,
    originalPrice: 1299,
    image: "/placeholder.svg",
    rating: 4.8,
    reviews: 234,
  },
  {
    id: 2,
    name: "LG Front Load Washing Machine",
    price: 649,
    originalPrice: 799,
    image: "/placeholder.svg",
    rating: 4.6,
    reviews: 189,
  },
  {
    id: 3,
    name: "Whirlpool French Door Refrigerator",
    price: 1299,
    originalPrice: 1599,
    image: "/placeholder.svg",
    rating: 4.7,
    reviews: 156,
  },
  {
    id: 4,
    name: "Panasonic Inverter Microwave",
    price: 299,
    originalPrice: 399,
    image: "/placeholder.svg",
    rating: 4.5,
    reviews: 298,
  },
];

const Offers = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 14,
    minutes: 32,
    seconds: 45,
  });

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-500 to-red-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Special Offers
          </h1>
          <p className="text-xl mb-8 opacity-90">
            Don't miss out on these incredible deals on premium home appliances
          </p>
        </div>
      </section>

      {/* Flash Sale */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-to-r from-red-500 to-pink-600 text-white border-0">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center mb-4">
                <Zap className="h-8 w-8 mr-2" />
                <CardTitle className="text-3xl">Flash Sale!</CardTitle>
              </div>
              <p className="text-lg opacity-90">Up to 50% off on selected items</p>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center mb-6">
                <div className="grid grid-cols-4 gap-4 text-center">
                  <div className="bg-white/20 rounded-lg p-3">
                    <div className="text-2xl font-bold">{timeLeft.days}</div>
                    <div className="text-sm opacity-75">Days</div>
                  </div>
                  <div className="bg-white/20 rounded-lg p-3">
                    <div className="text-2xl font-bold">{timeLeft.hours}</div>
                    <div className="text-sm opacity-75">Hours</div>
                  </div>
                  <div className="bg-white/20 rounded-lg p-3">
                    <div className="text-2xl font-bold">{timeLeft.minutes}</div>
                    <div className="text-sm opacity-75">Minutes</div>
                  </div>
                  <div className="bg-white/20 rounded-lg p-3">
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
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Percent className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Seasonal Sale</h3>
                <p className="text-gray-600 mb-4">Up to 40% off on winter appliances</p>
                <Button className="bg-blue-600 hover:bg-blue-700">Shop Now</Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Gift className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Bundle Deals</h3>
                <p className="text-gray-600 mb-4">Save more when you buy together</p>
                <Button className="bg-green-600 hover:bg-green-700">View Bundles</Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Timer className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Limited Time</h3>
                <p className="text-gray-600 mb-4">Exclusive deals ending soon</p>
                <Button className="bg-orange-600 hover:bg-orange-700">Grab Now</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Offers */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Offers
            </h2>
            <p className="text-lg text-gray-600">
              Hand-picked deals with the biggest savings
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {offerProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Offers;
