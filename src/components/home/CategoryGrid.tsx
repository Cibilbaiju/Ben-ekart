
import { Card, CardContent } from "@/components/ui/card";
import { Tv, Waves, Refrigerator, Microwave, Wind } from "lucide-react";

const categories = [
  {
    name: "Televisions",
    icon: Tv,
    description: "Smart TVs & Entertainment",
    color: "bg-blue-500",
  },
  {
    name: "Washing Machines",
    icon: Waves,
    description: "Front & Top Load",
    color: "bg-cyan-500",
  },
  {
    name: "Refrigerators",
    icon: Refrigerator,
    description: "Energy Efficient Cooling",
    color: "bg-green-500",
  },
  {
    name: "Microwaves",
    icon: Microwave,
    description: "Quick & Convenient",
    color: "bg-purple-500",
  },
  {
    name: "Air Conditioners",
    icon: Wind,
    description: "Smart Climate Control",
    color: "bg-orange-500",
  },
];

export const CategoryGrid = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Shop by Category
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our extensive range of premium home appliances designed to make your life easier
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {categories.map((category) => (
            <Card key={category.name} className="group cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6 text-center">
                <div className={`${category.color} rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <category.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{category.name}</h3>
                <p className="text-sm text-gray-600">{category.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
