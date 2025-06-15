
import { PhotoScroller } from "@/components/PhotoScroller";
import { ProductCard } from "@/components/ProductCard";

const washingMachinePhotos = [
  { src: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80", alt: "Modern washing machine macro" },
  { src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=900&q=80", alt: "Washer in laundry room" },
  { src: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80", alt: "Front load washing machine" },
];

const bestSellers = [
  {
    id: "2",
    name: "LG Front Load Washing Machine",
    price: 54999,
    originalPrice: 67999,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop",
    rating: 4.6,
    reviews: 189,
    category: "Washing Machine"
  }
];

const washingMachines = [
  {
    id: "201",
    name: "Samsung EcoBubble",
    price: 38999,
    originalPrice: 48999,
    image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=400&h=300&fit=crop",
    rating: 4.5,
    reviews: 56,
    category: "Washing Machine"
  },
  {
    id: "202",
    name: "Bosch Fully Automatic",
    price: 35999,
    originalPrice: 41999,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop",
    rating: 4.4,
    reviews: 80,
    category: "Washing Machine"
  },
];

const WashingMachines = () => (
  <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-gray-950 to-black text-foreground py-12 px-4">
    <div className="container mx-auto max-w-5xl">
      <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">Washing Machines</h1>
      <PhotoScroller photos={washingMachinePhotos} />

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
        <h2 className="text-2xl font-bold mb-4 text-primary">All Washing Machines</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {washingMachines.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </section>
    </div>
  </div>
);

export default WashingMachines;
