
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ShoppingCart, Search, Menu, X, User, Zap } from "lucide-react";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const cartItemCount = 3; // This would come from cart state management

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/offers", label: "Offers" },
    { path: "/contact", label: "Contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Top bar */}
        <div className="py-2 text-sm text-gray-600 border-b border-gray-100">
          <div className="flex justify-between items-center">
            <span>Free shipping on orders over $500!</span>
            <span>Customer Service: 1-800-APPLIANCE</span>
          </div>
        </div>

        {/* Main header */}
        <div className="py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">HomeHaven</h1>
                <p className="text-xs text-gray-500">Premium Appliances</p>
              </div>
            </Link>

            {/* Search bar - hidden on mobile */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search for appliances..."
                  className="pl-10 pr-4 py-2 w-full"
                />
              </div>
            </div>

            {/* Right side icons */}
            <div className="flex items-center space-x-4">
              <Link to="/account">
                <Button variant="ghost" size="sm" className="hidden md:flex items-center space-x-1">
                  <User className="h-4 w-4" />
                  <span>Account</span>
                </Button>
              </Link>

              <Link to="/cart" className="relative">
                <Button variant="ghost" size="sm" className="flex items-center space-x-1">
                  <ShoppingCart className="h-4 w-4" />
                  <span className="hidden md:block">Cart</span>
                  {cartItemCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                      {cartItemCount}
                    </Badge>
                  )}
                </Button>
              </Link>

              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden md:block pb-4">
          <div className="flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-medium transition-colors hover:text-blue-600 ${
                  isActive(link.path) ? "text-blue-600 border-b-2 border-blue-600 pb-1" : "text-gray-700"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search for appliances..."
                  className="pl-10 pr-4 py-2 w-full"
                />
              </div>
            </div>
            <div className="space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block py-2 px-4 rounded-md transition-colors ${
                    isActive(link.path) ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-50"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/account"
                className="block py-2 px-4 rounded-md text-gray-700 hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                My Account
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
