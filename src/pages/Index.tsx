
import { HeroCarousel } from "@/components/home/HeroCarousel";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { BestSellers } from "@/components/home/BestSellers";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { NewArrivals } from "@/components/home/NewArrivals";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <HeroCarousel />
      <div className="py-8 md:py-12">
        <CategoryGrid />
      </div>
      <div className="py-8 md:py-12 bg-gray-900/50">
        <BestSellers />
      </div>
      <div className="py-8 md:py-12">
        <NewArrivals />
      </div>
       <div className="py-8 md:py-12 bg-gray-900/50">
        <WhyChooseUs />
      </div>
    </div>
  );
};

export default Index;
