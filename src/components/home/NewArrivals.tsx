
import { useEffect, useRef } from "react";
import { ProductCard } from "@/components/ProductCard";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const newArrivals = [
  {
    id: "5",
    name: "Sony 75\" OLED Smart TV",
    price: 189999,
    originalPrice: 229999,
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=300&fit=crop",
    rating: 4.9,
    reviews: 87,
    category: "Television",
    isNew: true,
  },
  {
    id: "6",
    name: "Bosch Series 8 Dishwasher",
    price: 89999,
    originalPrice: 109999,
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
    rating: 4.7,
    reviews: 45,
    category: "Dishwasher",
    isNew: true,
  },
  {
    id: "7",
    name: "Dyson Pure Cool Air Purifier",
    price: 54999,
    originalPrice: 69999,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
    rating: 4.8,
    reviews: 123,
    category: "Air Purifier",
    isNew: true,
  },
  {
    id: "8",
    name: "KitchenAid Stand Mixer",
    price: 37999,
    originalPrice: 44999,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
    rating: 4.9,
    reviews: 267,
    category: "Kitchen Appliance",
    isNew: true,
  },
];

export const NewArrivals = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const productsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(titleRef.current, { opacity: 0, y: 50 });
      gsap.set(productsRef.current, { opacity: 0, y: 80, rotationY: 15 });

      // Title animation
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

      // Products animation with 3D effect
      gsap.to(productsRef.current, {
        opacity: 1,
        y: 0,
        rotationY: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: productsRef.current[0],
          start: "top 85%",
          end: "bottom 15%",
          toggleActions: "play none none reverse"
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div ref={titleRef} className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            New Arrivals
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Be the first to experience the latest innovations in home appliance technology
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {newArrivals.map((product, index) => (
            <div 
              key={product.id}
              ref={(el) => el && (productsRef.current[index] = el)}
            >
              <ProductCard 
                id={product.id}
                name={product.name}
                price={product.price}
                originalPrice={product.originalPrice}
                image={product.image}
                rating={product.rating}
                reviews={product.reviews}
                category={product.category}
                isNew={product.isNew}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
