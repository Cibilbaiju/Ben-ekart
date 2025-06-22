import { CategoryHorizontalScroll } from "@/components/CategoryHorizontalScroll";

const FurnitureCategory = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-amber-900 via-orange-900 to-red-900 text-white py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Premium Furniture</h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            Transform your home with our collection of premium furniture pieces
          </p>
        </div>
      </div>

      {/* Horizontal Scroll Animation */}
      <CategoryHorizontalScroll category="furniture" />
    </div>
  );
};

export default FurnitureCategory;
