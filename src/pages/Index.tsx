
import { HeroSection } from "@/components/home/HeroSection";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { BestSellers } from "@/components/home/BestSellers";
import { NewArrivals } from "@/components/home/NewArrivals";
import { FurnitureCollection } from "@/components/home/FurnitureCollection";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <CategoryGrid />
      <BestSellers />
      <NewArrivals />
      <FurnitureCollection />
      <WhyChooseUs />
    </div>
  );
};

export default Index;
