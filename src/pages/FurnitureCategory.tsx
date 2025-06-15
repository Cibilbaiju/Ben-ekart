import { PhotoScroller } from "@/components/PhotoScroller";
import { ProductCard } from "@/components/ProductCard";
import { FurnitureCollection } from "@/components/home/FurnitureCollection";
import { CategoryHeroCarousel } from "@/components/CategoryHeroCarousel";

const furniturePhotos = [
  { src: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=900&q=80", alt: "Modern sofa" },
  { src: "https://images.unsplash.com/photo-1567016549460-95379524f87b?auto=format&fit=crop&w=900&q=80", alt: "Dining table set" },
  { src: "https://images.unsplash.com/photo-1499914485622-a88fac53632e?auto=format&fit=crop&w=900&q=80", alt: "Bedroom furniture" },
];

const bestSellers = [
  {
    id: "601",
    name: "Premium Sectional Sofa",
    price: 49999,
    originalPrice: 64999,
    image: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=400&h=300&fit=crop",
    rating: 4.8,
    reviews: 112,
    category: "Furniture"
  }
];

const furnitureProducts = [
  {
    id: "602",
    name: "6-Seater Dining Table",
    price: 39999,
    originalPrice: 48999,
    image: "https://images.unsplash.com/photo-1567016549460-95379524f87b?w=400&h=300&fit=crop",
    rating: 4.7,
    reviews: 84,
    category: "Furniture"
  },
  {
    id: "603",
    name: "Comfort Bed with Storage",
    price: 34999,
    originalPrice: 43999,
    image: "https://images.unsplash.com/photo-1499914485622-a88fac53632e?w=400&h=300&fit=crop",
    rating: 4.6,
    reviews: 70,
    category: "Furniture"
  }
];

const FurnitureCategory = () => (
  <div className="min-h-screen bg-gradient-to-br from-rose-900 via-gray-950 to-black text-foreground py-12 px-4">
    <div className="container mx-auto max-w-5xl">
      <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">Furniture</h1>
      <CategoryHeroCarousel images={furniturePhotos} />

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
        <h2 className="text-2xl font-bold mb-4 text-primary">All Furniture</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {furnitureProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </section>
      {/* Optionally, the FurnitureCollection can be rendered below */}
      <div className="mt-10">
        <FurnitureCollection />
      </div>
    </div>
  </div>
);

export default FurnitureCategory;
