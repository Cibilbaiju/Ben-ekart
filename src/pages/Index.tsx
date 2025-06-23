
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { HeroSection } from "@/components/home/HeroSection";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { NewArrivals } from "@/components/home/NewArrivals";
import { BestSellers } from "@/components/home/BestSellers";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Shield, LogIn } from "lucide-react";

const Index = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-gray-800">
      <Header />
      
      {/* Auth Navigation Bar */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 border-b border-gray-700">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="text-gray-300">
              {user ? (
                <span>Welcome back, {user.email}!</span>
              ) : (
                <span>Welcome to HomeHaven - Your Home Electronics Store</span>
              )}
            </div>
            <div className="flex space-x-4">
              {user ? (
                <>
                  <Link to="/dashboard">
                    <Button variant="outline" className="border-gray-600 text-gray-200 hover:bg-blue-950">
                      Dashboard
                    </Button>
                  </Link>
                  <Link to="/admin">
                    <Button variant="outline" className="border-gray-600 text-gray-200 hover:bg-red-950">
                      <Shield className="h-4 w-4 mr-2" />
                      Admin
                    </Button>
                  </Link>
                </>
              ) : (
                <Link to="/auth">
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    <LogIn className="h-4 w-4 mr-2" />
                    Sign In / Sign Up
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

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
