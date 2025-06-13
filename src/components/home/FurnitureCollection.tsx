
import { useEffect, useRef } from "react";
import { ProductCard } from "@/components/ProductCard";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const furnitureProducts = [
  {
    id: "f1",
    name: "Modern L-Shaped Sofa",
    price: 89999,
    originalPrice: 119999,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
    rating: 4.8,
    reviews: 156,
    category: "Sofa",
    badge: "BESTSELLER"
  },
  {
    id: "f2",
    name: "Wooden Dining Table Set",
    price: 65999,
    originalPrice: 85999,
    image: "https://images.unsplash.com/photo-1449247709967-d4461a6a6103?w=400&h=300&fit=crop",
    rating: 4.7,
    reviews: 234,
    category: "Dining",
    isNew: true
  },
  {
    id: "f3",
    name: "King Size Bed with Storage",
    price: 79999,
    originalPrice: 99999,
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&h=300&fit=crop",
    rating: 4.9,
    reviews: 189,
    category: "Bedroom"
  },
  {
    id: "f4",
    name: "Executive Office Chair",
    price: 25999,
    originalPrice: 34999,
    image: "https://images.unsplash.com/photo-1541558869434-2840d308329a?w=400&h=300&fit=crop",
    rating: 4.6,
    reviews: 312,
    category: "Office",
    badge: "ERGONOMIC"
  },
  {
    id: "f5",
    name: "Glass Coffee Table",
    price: 18999,
    originalPrice: 24999,
    image: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400&h=300&fit=crop",
    rating: 4.5,
    reviews: 98,
    category: "Living Room"
  },
  {
    id: "f6",
    name: "Bookshelf Wardrobe",
    price: 55999,
    originalPrice: 72999,
    image: "https://images.unsplash.com/photo-1549497538-303791108f95?w=400&h=300&fit=crop",
    rating: 4.7,
    reviews: 145,
    category: "Storage",
    isNew: true
  },
  {
    id: "f7",
    name: "Recliner Armchair",
    price: 45999,
    originalPrice: 59999,
    image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=400&h=300&fit=crop",
    rating: 4.8,
    reviews: 87,
    category: "Seating"
  },
  {
    id: "f8",
    name: "Study Desk with Drawers",
    price: 22999,
    originalPrice: 29999,
    image: "https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=400&h=300&fit=crop",
    rating: 4.6,
    reviews: 203,
    category: "Study"
  }
];

export const FurnitureCollection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(titleRef.current, { opacity: 0, y: 50 });

      gsap.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <div ref={titleRef} className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Premium Furniture Collection
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Transform your space with our curated selection of modern and classic furniture pieces
          </p>
        </div>
        
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {furnitureProducts.map((product) => (
              <CarouselItem key={product.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                <ProductCard 
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  originalPrice={product.originalPrice}
                  image={product.image}
                  rating={product.rating}
                  reviews={product.reviews}
                  category={product.category}
                  badge={product.badge}
                  isNew={product.isNew}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </div>
    </section>
  );
};
