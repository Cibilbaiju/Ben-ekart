
import { useEffect, useRef } from "react";
import { ProductCard } from "@/components/ProductCard";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const bestSellers = [
  {
    id: "1",
    name: "Samsung 65\" 4K Smart TV",
    price: 74999,
    originalPrice: 109999,
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=400&h=300&fit=crop",
    rating: 4.8,
    reviews: 234,
    category: "Television"
  },
  {
    id: "2",
    name: "LG Front Load Washing Machine",
    price: 54999,
    originalPrice: 67999,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop",
    rating: 4.6,
    reviews: 189,
    category: "Washing Machine"
  },
  {
    id: "3",
    name: "Whirlpool French Door Refrigerator",
    price: 109999,
    originalPrice: 135999,
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=300&fit=crop",
    rating: 4.7,
    reviews: 156,
    category: "Refrigerator"
  },
  {
    id: "4",
    name: "Panasonic Inverter Microwave",
    price: 25999,
    originalPrice: 33999,
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=300&fit=crop",
    rating: 4.5,
    reviews: 298,
    category: "Microwave"
  },
];

export const BestSellers = () => {
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
            Best Sellers
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our most popular appliances trusted by thousands of satisfied customers
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((product, index) => (
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
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
