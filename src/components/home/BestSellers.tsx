
import { ProductCard } from "@/components/ProductCard";

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
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Best Sellers
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our most popular appliances trusted by thousands of satisfied customers
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};
