
import { HeroSection } from "@/components/home/HeroSection";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { NewArrivals } from "@/components/home/NewArrivals";
import { BestSellers } from "@/components/home/BestSellers";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-gray-800">
      <Header />
      
      <main>
        <HeroSection />
        <CategoryGrid />
        <NewArrivals />
        <BestSellers />
        <WhyChooseUs />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
