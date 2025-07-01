import { HeroSection } from "@/components/home/HeroSection";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { NewArrivals } from "@/components/home/NewArrivals";
import { BestSellers } from "@/components/home/BestSellers";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { SaleOffer } from "@/components/home/SaleOffer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      <Header />
      
      <main className="relative">
        {/* Hero Section with enhanced visual appeal */}
        <div className="relative">
          <HeroSection />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/20 pointer-events-none"></div>
        </div>
        
        {/* Main content sections with improved spacing and backgrounds */}
        <div className="relative z-10 space-y-0">
          <CategoryGrid />
          
          {/* Enhanced section separators */}
          <div className="bg-gradient-to-r from-muted/20 via-muted/40 to-muted/20 py-12 md:py-16">
            <NewArrivals />
          </div>
          
          {/* Sale Offer Section */}
          <SaleOffer />
          
          <div className="bg-gradient-to-r from-background via-muted/10 to-background py-12 md:py-16">
            <BestSellers />
          </div>
          
          <div className="bg-gradient-to-br from-muted/30 via-background to-muted/20 py-12 md:py-16">
            <WhyChooseUs />
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-1/4 left-0 w-64 h-64 bg-gradient-to-r from-primary/5 to-transparent rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-gradient-to-l from-secondary/5 to-transparent rounded-full blur-3xl pointer-events-none"></div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
