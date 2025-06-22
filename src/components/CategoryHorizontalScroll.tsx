
import { GenericHorizontalScroll } from "./GenericHorizontalScroll";

interface CategoryHorizontalScrollProps {
  category: string;
}

export const CategoryHorizontalScroll = ({ category }: CategoryHorizontalScrollProps) => {
  const getCategorySections = (category: string) => {
    switch (category) {
      case 'televisions':
        return [
          {
            id: 1,
            title: "OLED Technology",
            subtitle: "Perfect Blacks, Infinite Contrast",
            description: "Experience true-to-life colors and perfect blacks with our premium OLED television collection.",
            image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800&h=600&fit=crop",
            bgColor: "from-purple-900 via-indigo-800 to-blue-900",
            cta1: "Shop OLED",
            cta2: "Compare Models"
          },
          {
            id: 2,
            title: "8K Resolution",
            subtitle: "Four Times the Detail",
            description: "Discover the future of viewing with 8K resolution that brings every detail to life.",
            image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800&h=600&fit=crop",
            bgColor: "from-red-900 via-pink-800 to-purple-900",
            cta1: "Shop 8K",
            cta2: "Learn More"
          },
          {
            id: 3,
            title: "Smart Features",
            subtitle: "Entertainment Hub",
            description: "Access streaming services, games, and apps with our smart TV ecosystem.",
            image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800&h=600&fit=crop",
            bgColor: "from-green-900 via-teal-800 to-cyan-900",
            cta1: "Explore Smart",
            cta2: "View Apps"
          }
        ];
      case 'furniture':
        return [
          {
            id: 1,
            title: "Living Room",
            subtitle: "Comfort Meets Style",
            description: "Transform your living space with our premium sofas, chairs, and entertainment centers.",
            image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
            bgColor: "from-amber-900 via-orange-800 to-red-900",
            cta1: "Shop Living",
            cta2: "View Collection"
          },
          {
            id: 2,
            title: "Bedroom",
            subtitle: "Rest & Relaxation",
            description: "Create your perfect sanctuary with our bedroom furniture and storage solutions.",
            image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
            bgColor: "from-slate-900 via-gray-800 to-zinc-900",
            cta1: "Shop Bedroom",
            cta2: "Design Ideas"
          },
          {
            id: 3,
            title: "Dining Room",
            subtitle: "Gather Together",
            description: "Make every meal special with our dining tables, chairs, and storage pieces.",
            image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
            bgColor: "from-emerald-900 via-green-800 to-teal-900",
            cta1: "Shop Dining",
            cta2: "View Sets"
          }
        ];
      default:
        return [
          {
            id: 1,
            title: "Quality Products",
            subtitle: "Premium Selection",
            description: "Discover our carefully curated collection of premium home appliances and furniture.",
            image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&h=600&fit=crop",
            bgColor: "from-blue-900 via-indigo-800 to-purple-900",
            cta1: "Shop Now",
            cta2: "Learn More"
          }
        ];
    }
  };

  const sections = getCategorySections(category);

  return <GenericHorizontalScroll sections={sections} />;
};
