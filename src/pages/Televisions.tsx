import { PhotoScroller } from "@/components/PhotoScroller";
import { ProductCard } from "@/components/ProductCard";
import { CategoryHeroCarousel } from "@/components/CategoryHeroCarousel";

const televisionPhotos = [
  { src: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=900&q=80", alt: "4K Smart TV in living room" },
  { src: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=900&q=80", alt: "Modern TV on stand" },
  { src: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=900&q=80", alt: "TV with vibrant display" },
];

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
    id: "5",
    name: "Sony 55\" OLED Smart TV",
    price: 92999,
    originalPrice: 129999,
    image: "https://images.unsplash.com/photo-1503602642458-232111445657?w=400&h=300&fit=crop",
    rating: 4.9,
    reviews: 102,
    category: "Television"
  },
];

const televisionProducts = [
  {
    id: "101",
    name: "LG NanoCell 50\" 4K TV",
    price: 44999,
    originalPrice: 59999,
    image: "https://images.unsplash.com/photo-1472224371017-08207f84aaae?w=400&h=300&fit=crop",
    rating: 4.6,
    reviews: 74,
    category: "Television"
  },
  {
    id: "102",
    name: "Panasonic Ultra HD Smart TV",
    price: 37999,
    originalPrice: 42999,
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=400&h=300&fit=crop",
    rating: 4.5,
    reviews: 67,
    category: "Television"
  },
];

const Televisions = () => (
  <div className="min-h-screen bg-gradient-to-b from-black via-neutral-900 to-neutral-950 text-foreground py-12 px-4">
    <div className="container mx-auto max-w-5xl">
      <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">Televisions</h1>
      <CategoryHeroCarousel images={televisionPhotos} />

      {/* Best Sellers */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-primary">Best Sellers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </section>

      {/* Main Products */}
      <section>
        <h2 className="text-2xl font-bold mb-4 text-primary">All Televisions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {televisionProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </section>
    </div>
  </div>
);

export default Televisions;
