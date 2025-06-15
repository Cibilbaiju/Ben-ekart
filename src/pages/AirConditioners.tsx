import { PhotoScroller } from "@/components/PhotoScroller";
import { ProductCard } from "@/components/ProductCard";
import { CategoryHeroCarousel } from "@/components/CategoryHeroCarousel";

const airConditionerPhotos = [
  { src: "https://images.unsplash.com/photo-1530133532239-01a4f96c1f5a?auto=format&fit=crop&w=900&q=80", alt: "Mounted air conditioner" },
  { src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=900&q=80", alt: "AC unit closeup" },
  { src: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=900&q=80", alt: "AC remote with air conditioner" },
];

const bestSellers = [
  {
    id: "501",
    name: "Daikin Inverter Split AC",
    price: 40999,
    originalPrice: 47999,
    image: "https://images.unsplash.com/photo-1530133532239-01a4f96c1f5a?w=400&h=300&fit=crop",
    rating: 4.7,
    reviews: 93,
    category: "Air Conditioner"
  }
];

const airConditioners = [
  {
    id: "502",
    name: "Voltas Window AC",
    price: 27999,
    originalPrice: 31999,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
    rating: 4.3,
    reviews: 48,
    category: "Air Conditioner"
  },
  {
    id: "503",
    name: "Blue Star Portable AC",
    price: 32999,
    originalPrice: 37999,
    image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400&h=300&fit=crop",
    rating: 4.4,
    reviews: 52,
    category: "Air Conditioner"
  },
];

const AirConditioners = () => (
  <div className="min-h-screen bg-gradient-to-b from-black via-neutral-900 to-neutral-950 text-foreground py-12 px-4">
    <div className="container mx-auto max-w-5xl">
      <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">Air Conditioners</h1>
      <CategoryHeroCarousel images={airConditionerPhotos} />

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
        <h2 className="text-2xl font-bold mb-4 text-primary">All Air Conditioners</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {airConditioners.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </section>
    </div>
  </div>
);

export default AirConditioners;
