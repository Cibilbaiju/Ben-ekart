import React from 'react';

import { CategoryHorizontalScroll } from "@/components/CategoryHorizontalScroll";

const Televisions = () => {
  

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-900 text-white py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Premium Televisions</h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            Experience entertainment like never before with our collection of premium televisions
          </p>
        </div>
      </div>

      {/* Horizontal Scroll Animation */}
      <CategoryHorizontalScroll category="televisions" />

      {/* Product Grid */}
      
    </div>
  );
};

export default Televisions;
