
import { PhotoScroller } from "@/components/PhotoScroller";
import { ProductCard } from "@/components/ProductCard";

const refrigeratorPhotos = [
  { src: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=900&q=80", alt: "Modern fridge" },
  { src: "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?auto=format&fit=crop&w=900&q=80", alt: "Open fridge" },
  { src: "https://images.unsplash.com/photo-1511689983318-7c12cf43a1b7?auto=format&fit=crop&w=900&q=80", alt: "Fridge in kitchen" },
];

const bestSellers = [
  {
    id: "3",
    name: "Whirlpool French Door Refrigerator",
    price: 109999,
    originalPrice: 135999,
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=300&fit=crop",
    rating: 4.7,
    reviews: 156,
    category: "Refrigerator"
  }
];

const refrigerators = [
  {
    id: "301",
    name: "LG Double Door Fridge",
    price: 54999,
    originalPrice: 65999,
    image: "https://images.unsplash.com/photo-1511689983318-7c12cf43a1b7?w=400&h=300&fit=crop",
    rating: 4.6,
    reviews: 43,
    category: "Refrigerator"
  },
  {
    id: "302",
    name: "Samsung Smart Refrigerator",
    price: 99999,
    originalPrice: 114999,
    image: "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?auto=format&fit=crop&w=900&q=80",
    rating: 4.8,
    reviews: 92,
    category: "Refrigerator"
  },
];

const Refrigerators = () => (
  <div className="min-h-screen bg-gradient-to-br from-green-950 via-gray-950 to-black text-foreground py-12 px-4">
    <div className="container mx-auto max-w-5xl">
      <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">Refrigerators</h1>
      <PhotoScroller photos={refrigeratorPhotos} />

      {/* Best Sellers */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-primary">Best Sellers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </section>
      
      <section>
        <h2 className="text-2xl font-bold mb-4 text-primary">All Refrigerators</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {refrigerators.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </section>
    </div>
  </div>
);

export default Refrigerators;
