
import { ProductCard } from "@/components/ProductCard";

const newArrivals = [
  {
    id: 5,
    name: "Sony 75\" OLED Smart TV",
    price: 1899,
    originalPrice: 2299,
    image: "/placeholder.svg",
    rating: 4.9,
    reviews: 87,
    isNew: true,
  },
  {
    id: 6,
    name: "Bosch Series 8 Dishwasher",
    price: 899,
    originalPrice: 1099,
    image: "/placeholder.svg",
    rating: 4.7,
    reviews: 45,
    isNew: true,
  },
  {
    id: 7,
    name: "Dyson Pure Cool Air Purifier",
    price: 549,
    originalPrice: 699,
    image: "/placeholder.svg",
    rating: 4.8,
    reviews: 123,
    isNew: true,
  },
  {
    id: 8,
    name: "KitchenAid Stand Mixer",
    price: 379,
    originalPrice: 449,
    image: "/placeholder.svg",
    rating: 4.9,
    reviews: 267,
    isNew: true,
  },
];

export const NewArrivals = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            New Arrivals
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Be the first to experience the latest innovations in home appliance technology
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};
