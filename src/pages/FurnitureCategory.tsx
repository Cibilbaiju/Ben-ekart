
import { FurnitureCollection } from "@/components/home/FurnitureCollection";

const FurnitureCategory = () => (
  <div className="min-h-screen bg-gradient-to-br from-rose-900 via-gray-950 to-black text-foreground py-12 px-4">
    <div className="container mx-auto max-w-5xl text-center">
      <h1 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-rose-300 to-pink-400 bg-clip-text text-transparent flex items-center justify-center">
        Furniture
      </h1>
      <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
        Discover our curated collection of modern and stylish furniture to transform your home. From sofas and beds to elegant dining sets—all under one category!
      </p>
      <FurnitureCollection />
    </div>
  </div>
);

export default FurnitureCategory;
