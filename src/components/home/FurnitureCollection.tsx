
import { ProductCard } from "@/components/ProductCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const furnitureProducts = [
  {
    id: "sofa-1",
    name: "Modern 3-Seater Sofa",
    price: 45000,
    originalPrice: 55000,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&h=300&fit=crop",
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=500&h=300&fit=crop",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=300&fit=crop",
    ],
    rating: 4.5,
    reviews: 89,
    badge: "18% OFF",
    category: "Furniture"
  },
  {
    id: "chair-1",
    name: "Ergonomic Office Chair",
    price: 15000,
    originalPrice: 20000,
    image: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=500&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=500&h=300&fit=crop",
      "https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=500&h=300&fit=crop",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=300&fit=crop",
    ],
    rating: 4.3,
    reviews: 67,
    badge: "25% OFF",
    category: "Furniture"
  },
  {
    id: "table-1",
    name: "Wooden Dining Table",
    price: 35000,
    image: "https://images.unsplash.com/photo-1449247709967-d4461a6a6103?w=500&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1449247709967-d4461a6a6103?w=500&h=300&fit=crop",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=300&fit=crop",
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=500&h=300&fit=crop",
    ],
    rating: 4.7,
    reviews: 134,
    isNew: true,
    category: "Furniture"
  },
  {
    id: "bed-1",
    name: "King Size Platform Bed",
    price: 60000,
    originalPrice: 75000,
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=500&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=500&h=300&fit=crop",
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=500&h=300&fit=crop",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=300&fit=crop",
    ],
    rating: 4.6,
    reviews: 98,
    badge: "20% OFF",
    category: "Furniture"
  },
  {
    id: "wardrobe-1",
    name: "3-Door Wardrobe",
    price: 40000,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=300&fit=crop",
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=500&h=300&fit=crop",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=500&h=300&fit=crop",
    ],
    rating: 4.4,
    reviews: 76,
    category: "Furniture"
  },
  {
    id: "dresser-1",
    name: "Modern Dresser with Mirror",
    price: 25000,
    originalPrice: 30000,
    image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=500&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=500&h=300&fit=crop",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=300&fit=crop",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=500&h=300&fit=crop",
    ],
    rating: 4.2,
    reviews: 54,
    badge: "17% OFF",
    category: "Furniture"
  }
];

export const FurnitureCollection = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Furniture Collection
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Transform your home with our premium furniture collection. From modern sofas to elegant dining sets.
          </p>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-7xl mx-auto"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {furnitureProducts.map((product) => (
              <CarouselItem key={product.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                <ProductCard {...product} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2" />
          <CarouselNext className="right-2" />
        </Carousel>
      </div>
    </section>
  );
};
