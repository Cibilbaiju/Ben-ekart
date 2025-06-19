import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Zap,
  Search, 
  ShoppingCart, 
  User, 
  Menu, 
  X,
  Store,
  Book,
  MessageSquare,
  Phone,
  Tv,
} from "lucide-react";
import { useCartStore } from "@/store/cartStore";
// --------- Add NavigationMenu import from shadcn/ui ---------
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const itemCount = useCartStore((state) => state.items.reduce((sum, item) => sum + item.quantity, 0));

  // Central navigation menu items
  const navigation = [
    { name: "Televisions", href: "/category/televisions", icon: <Tv className="mr-2 h-4 w-4" /> },
    { name: "Appliances", href: "/offers" },
    { name: "Furniture", href: "/category/furniture" },
    { name: "New Arrivals", href: "/offers" },
    { name: "Top Deals", href: "/offers" },
    { name: "Contact Us", href: "/contact", icon: <MessageSquare className="mr-2 h-4 w-4" /> },
  ];

  const isActiveLink = (href: string) => {
    return location.pathname === href;
  };

  return (
    <header className="sticky top-0 z-50 bg-gray-900 text-white border-b border-gray-700">
      {/* Top bar */}
      <div className="bg-gray-800 py-2 hidden md:block">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between text-xs text-gray-400">
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4" />
              <span>1-800-APPLIANCE</span>
            </div>
            <div className="flex items-center space-x-6">
              <Link to="#" className="flex items-center space-x-1 hover:text-white">
                <Store className="h-4 w-4" />
                <span>Find a store</span>
              </Link>
              <Link to="#" className="flex items-center space-x-1 hover:text-white">
                <Book className="h-4 w-4" />
                <span>Buying guides</span>
              </Link>
              <Link to="/contact" className="flex items-center space-x-1 hover:text-white">
                <MessageSquare className="h-4 w-4" />
                <span>Contact us</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4 md:gap-8">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
            <div className="bg-blue-600 p-2 rounded-lg">
                <Zap className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">HomeHaven</h1>
              <p className="text-xs text-gray-400">Premium Appliances</p>
            </div>
          </Link>

          {/* Search bar */}
          <div className="flex-1 min-w-0 hidden md:block">
            <div className="relative w-full max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="What are you looking for?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-3 w-full rounded-lg bg-gray-800 border-gray-700 focus:bg-gray-700 focus:ring-primary h-12 text-sm"
              />
            </div>
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-4 md:space-x-6">
            <Link to="/account" className="hidden md:flex items-center space-x-2 text-sm font-medium hover:text-white">
                <User className="h-6 w-6" />
                <span>Sign In</span>
            </Link>
            <Link to="/cart" className="flex items-center space-x-2 text-sm font-medium hover:text-white relative">
              <ShoppingCart className="h-6 w-6" />
              <span className="hidden md:inline">Cart</span>
              {itemCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                  {itemCount}
                </Badge>
              )}
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>
      
      {/* --- NEW: Navigation Menu using shadcn/ui --- */}
      <nav className="hidden md:flex bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t border-gray-700">
        <div className="container mx-auto px-4">
          <NavigationMenu>
            <NavigationMenuList>
              {navigation.map((item) => (
                <NavigationMenuItem key={item.name}>
                  <Link
                    to={item.href}
                    className={`flex items-center px-4 py-3 text-sm font-medium transition-colors rounded-md hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground ${
                        isActiveLink(item.href)
                          ? "text-primary border-b-2 border-primary"
                          : "text-gray-300"
                      }`}
                  >
                      {/* Optionally render icon for TV */}
                      {item.icon && item.icon}
                      {item.name}
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </nav>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-gray-900 border-t border-gray-700 pb-4">
          <div className="container mx-auto px-4">
            <div className="mt-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full bg-gray-800 border-gray-700"
                />
              </div>
            </div>
            <nav className="space-y-4 mt-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block text-base font-medium transition-colors ${
                    isActiveLink(item.href)
                      ? "text-primary"
                      : "text-muted-foreground hover:text-primary"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
             <div className="border-t border-gray-700 mt-4 pt-4 space-y-4">
                <Link to="/account" onClick={() => setIsMenuOpen(false)} className="flex items-center space-x-2 text-base font-medium hover:text-primary">
                    <User className="h-6 w-6" />
                    <span>Sign In / My Account</span>
                </Link>
             </div>
          </div>
        </div>
      )}
    </header>
  );
};
