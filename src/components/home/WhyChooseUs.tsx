
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Truck, HeadphonesIcon, Award } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "5-Year Warranty",
    description: "Comprehensive protection on all premium appliances with extended warranty coverage.",
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: Truck,
    title: "Free Delivery",
    description: "Complimentary delivery and installation on orders over $500. Professional setup included.",
    color: "from-green-500 to-green-600",
  },
  {
    icon: HeadphonesIcon,
    title: "24/7 Support",
    description: "Round-the-clock customer service with expert technicians ready to assist you.",
    color: "from-purple-500 to-purple-600",
  },
  {
    icon: Award,
    title: "Certified Quality",
    description: "All products undergo rigorous testing and come with industry-leading certifications.",
    color: "from-orange-500 to-orange-600",
  },
];

export const WhyChooseUs = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Why Choose HomeHaven?
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We're committed to providing exceptional service and premium quality products that exceed your expectations
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <Card key={feature.title} className="text-center hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 shadow-lg overflow-hidden group">
              <CardContent className="p-8 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50/50 opacity-90"></div>
                <div className="relative z-10">
                  <div className={`bg-gradient-to-br ${feature.color} rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-4 text-xl group-hover:text-blue-600 transition-colors">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
