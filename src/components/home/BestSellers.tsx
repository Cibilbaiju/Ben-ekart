
import { useEffect, useRef } from "react";
import { ProductCard } from "@/components/ProductCard";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const bestSellers = [
  {
    id: 1,
    name: "Samsung 65\" 4K Smart TV",
    price: 899,
    originalPrice: 1299,
    image: "/placeholder.svg",
    rating: 4.8,
    reviews: 234,
  },
  {
    id: 2,
    name: "LG Front Load Washing Machine",
    price: 649,
    originalPrice: 799,
    image: "/placeholder.svg",
    rating: 4.6,
    reviews: 189,
  },
  {
    id: 3,
    name: "Whirlpool French Door Refrigerator",
    price: 1299,
    originalPrice: 1599,
    image: "/placeholder.svg",
    rating: 4.7,
    reviews: 156,
  },
  {
    id: 4,
    name: "Panasonic Inverter Microwave",
    price: 299,
    originalPrice: 399,
    image: "/placeholder.svg",
    rating: 4.5,
    reviews: 298,
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
    <section ref={sectionRef} className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div ref={titleRef} className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Best Sellers
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our most popular appliances trusted by thousands of satisfied customers
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((product, index) => (
            <div 
              key={product.id}
              ref={(el) => el && (productsRef.current[index] = el)}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
