
import { PhotoScroller } from "@/components/PhotoScroller";
import { ProductCard } from "@/components/ProductCard";

const microwavePhotos = [
  { src: "https://images.unsplash.com/photo-1506368083636-6defb67639b7?auto=format&fit=crop&w=900&q=80", alt: "Open microwave oven" },
  { src: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=900&q=80", alt: "Countertop microwave" },
  { src: "https://images.unsplash.com/photo-1457296898342-cdd24585d095?auto=format&fit=crop&w=900&q=80", alt: "Microwave in kitchen" },
];

const bestSellers = [
  {
    id: "4",
    name: "Panasonic Inverter Microwave",
    price: 25999,
    originalPrice: 33999,
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=300&fit=crop",
    rating: 4.5,
    reviews: 298,
    category: "Microwave"
  }
];

const microwaves = [
  {
    id: "401",
    name: "Samsung Grill Microwave",
    price: 10999,
    originalPrice: 13999,
    image: "https://images.unsplash.com/photo-1506368083636-6defb67639b7?w=400&h=300&fit=crop",
    rating: 4.4,
    reviews: 48,
    category: "Microwave"
  },
  {
    id: "402",
    name: "LG NeoChef",
    price: 17999,
    originalPrice: 22999,
    image: "https://images.unsplash.com/photo-1457296898342-cdd24585d095?w=400&h=300&fit=crop",
    rating: 4.3,
    reviews: 52,
    category: "Microwave"
  },
];

const Microwaves = () => (
  <div className="min-h-screen bg-gradient-to-br from-purple-900 via-gray-950 to-black text-foreground py-12 px-4">
    <div className="container mx-auto max-w-5xl">
      <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">Microwaves</h1>
      <PhotoScroller photos={microwavePhotos} />

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
        <h2 className="text-2xl font-bold mb-4 text-primary">All Microwaves</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {microwaves.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </section>
    </div>
  </div>
);

export default Microwaves;
