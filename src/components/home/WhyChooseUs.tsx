
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Truck, HeadphonesIcon, Award } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "5-Year Warranty",
    description: "Comprehensive protection on all premium appliances with extended warranty coverage.",
  },
  {
    icon: Truck,
    title: "Free Delivery",
    description: "Complimentary delivery and installation on orders over $500. Professional setup included.",
  },
  {
    icon: HeadphonesIcon,
    title: "24/7 Support",
    description: "Round-the-clock customer service with expert technicians ready to assist you.",
  },
  {
    icon: Award,
    title: "Certified Quality",
    description: "All products undergo rigorous testing and come with industry-leading certifications.",
  },
];

export const WhyChooseUs = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose HomeHaven?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We're committed to providing exceptional service and premium quality products
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <Card key={feature.title} className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
