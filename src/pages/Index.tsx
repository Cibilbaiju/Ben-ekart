
import { HeroSection } from "@/components/home/HeroSection";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { NewArrivals } from "@/components/home/NewArrivals";
import { PayDayOffer } from "@/components/home/PayDayOffer";
import { BestSellers } from "@/components/home/BestSellers";
import { BankOffers } from "@/components/home/BankOffers";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";

const Index = () => {
  return (
    <div className="min-h-screen bg-black">
      <main className="relative">
        {/* Hero Section */}
        <div className="relative">
          <HeroSection />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 pointer-events-none"></div>
        </div>
        
        {/* Main content sections */}
        <div className="relative z-10 space-y-0 bg-black">
          <CategoryGrid />
          
          {/* Enhanced section separators */}
          <div className="bg-gray-900 py-12 md:py-16">
            <NewArrivals />
          </div>
          
          <PayDayOffer />
          
          <div className="bg-black py-12 md:py-16">
            <BestSellers />
          </div>
          
          <div className="bg-gray-900 py-12 md:py-16">
            <BankOffers />
          </div>
          
          <div className="bg-black py-12 md:py-16">
            <WhyChooseUs />
          </div>
        </div>
        
        {/* Decorative elements - dark theme */}
        <div className="absolute top-1/4 left-0 w-64 h-64 bg-gradient-to-r from-gray-900/10 to-transparent rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-gradient-to-l from-gray-800/10 to-transparent rounded-full blur-3xl pointer-events-none"></div>
      </main>
    </div>
  );
};

export default Index;
