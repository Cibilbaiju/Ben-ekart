
import { Card, CardContent } from "@/components/ui/card";
import { Tv, Waves, Refrigerator, Microwave, Wind } from "lucide-react";

const categories = [
  {
    name: "Televisions",
    icon: Tv,
    description: "Smart TVs & Entertainment",
    color: "from-blue-500 to-blue-600",
    hoverColor: "from-blue-600 to-blue-700",
  },
  {
    name: "Washing Machines",
    icon: Waves,
    description: "Front & Top Load",
    color: "from-cyan-500 to-cyan-600",
    hoverColor: "from-cyan-600 to-cyan-700",
  },
  {
    name: "Refrigerators",
    icon: Refrigerator,
    description: "Energy Efficient Cooling",
    color: "from-green-500 to-green-600",
    hoverColor: "from-green-600 to-green-700",
  },
  {
    name: "Microwaves",
    icon: Microwave,
    description: "Quick & Convenient",
    color: "from-purple-500 to-purple-600",
    hoverColor: "from-purple-600 to-purple-700",
  },
  {
    name: "Air Conditioners",
    icon: Wind,
    description: "Smart Climate Control",
    color: "from-orange-500 to-orange-600",
    hoverColor: "from-orange-600 to-orange-700",
  },
];

export const CategoryGrid = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Shop by Category
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Explore our extensive range of premium home appliances designed to make your life easier and more comfortable
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {categories.map((category) => (
            <Card key={category.name} className="group cursor-pointer hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 shadow-lg overflow-hidden">
              <CardContent className="p-8 text-center relative">
                <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 opacity-90"></div>
                <div className="relative z-10">
                  <div className={`bg-gradient-to-br ${category.color} group-hover:bg-gradient-to-br group-hover:${category.hoverColor} rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300 shadow-lg`}>
                    <category.icon className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-3 text-lg group-hover:text-blue-600 transition-colors">{category.name}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{category.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
