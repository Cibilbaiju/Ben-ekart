
import { HeroCarousel } from "@/components/home/HeroCarousel";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { BestSellers } from "@/components/home/BestSellers";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { NewArrivals } from "@/components/home/NewArrivals";
import { FurnitureCollection } from "@/components/home/FurnitureCollection";
import { GenericHorizontalScroll } from "@/components/GenericHorizontalScroll";

const Index = () => {
  const heroScrollSections = [
    {
      id: 1,
      title: "Premium Electronics",
      subtitle: "Latest Technology at Your Fingertips",
      description: "Discover cutting-edge televisions, smart home devices, and entertainment systems that transform your living space.",
      image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800&h=600&fit=crop",
      bgColor: "from-blue-900 via-blue-800 to-purple-900",
      cta1: "Shop Electronics",
      cta2: "View Collection"
    },
    {
      id: 2,
      title: "Kitchen Appliances",
      subtitle: "Cook Like a Professional Chef",
      description: "Professional-grade refrigerators, dishwashers, and cooking appliances designed for the modern kitchen.",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop",
      bgColor: "from-green-900 via-green-800 to-teal-900",
      cta1: "Shop Kitchen",
      cta2: "Learn More"
    },
    {
      id: 3,
      title: "Home Comfort",
      subtitle: "Perfect Climate Control",
      description: "Energy-efficient air conditioners, heating systems, and smart home automation for ultimate comfort.",
      image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&h=600&fit=crop",
      bgColor: "from-orange-900 via-red-800 to-pink-900",
      cta1: "Shop Comfort",
      cta2: "View Features"
    },
    {
      id: 4,
      title: "Furniture Collection",
      subtitle: "Style Meets Functionality",
      description: "Premium furniture pieces that combine modern design with exceptional comfort and durability.",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
      bgColor: "from-purple-900 via-indigo-800 to-blue-900",
      cta1: "Shop Furniture",
      cta2: "Explore Styles"
    }
  ];

  const featuredScrollSections = [
    {
      id: 5,
      title: "Smart TVs",
      subtitle: "Entertainment Redefined",
      description: "Experience cinema-quality viewing with our range of smart TVs featuring 4K, 8K, and OLED technology.",
      image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800&h=600&fit=crop",
      bgColor: "from-slate-900 via-gray-800 to-zinc-900",
      cta1: "Shop TVs",
      cta2: "Compare Models"
    },
    {
      id: 6,
      title: "Washing Machines",
      subtitle: "Effortless Laundry Care",
      description: "Advanced washing machines with smart features, energy efficiency, and gentle fabric care technology.",
      image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&h=600&fit=crop",
      bgColor: "from-cyan-900 via-blue-800 to-indigo-900",
      cta1: "Shop Washers",
      cta2: "View Features"
    },
    {
      id: 7,
      title: "Refrigerators",
      subtitle: "Fresh Food Innovation",
      description: "Keep your food fresher for longer with our energy-efficient refrigerators featuring smart cooling technology.",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop",
      bgColor: "from-emerald-900 via-green-800 to-teal-900",
      cta1: "Shop Fridges",
      cta2: "Energy Guide"
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <HeroCarousel />
      
      {/* First Horizontal Scroll Section */}
      <GenericHorizontalScroll sections={heroScrollSections} />
      
      <div className="py-8 md:py-12">
        <CategoryGrid />
      </div>
      
      <div className="py-8 md:py-12 bg-gray-900/50">
        <BestSellers />
      </div>
      
      {/* Second Horizontal Scroll Section */}
      <GenericHorizontalScroll sections={featuredScrollSections} showScrollHint={false} />
      
      <FurnitureCollection />
      
      <div className="py-8 md:py-12">
        <NewArrivals />
      </div>
      
      <div className="py-8 md:py-12 bg-gray-900/50">
        <WhyChooseUs />
      </div>
    </div>
  );
};

export default Index;
