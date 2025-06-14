
import { Link } from "react-router-dom";
import { Zap, Mail, Phone, MapPin, Facebook, Twitter, Instagram } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold">HomeHaven</h3>
                <p className="text-sm text-gray-400">Premium Appliances</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Your trusted partner for premium home appliances. Quality, reliability, and innovation in every product.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              <Twitter className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              <Instagram className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Useful Links */}
          <div>
            <h4 className="font-semibold mb-4">Useful Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="#" className="text-gray-400 hover:text-white transition-colors">About HomeHaven</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Help and Support</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-white transition-colors">FAQs</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-white transition-colors">Buying Guide</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-white transition-colors">Return Policy</Link></li>
            </ul>
          </div>

          {/* Product Categories */}
          <div>
            <h4 className="font-semibold mb-4">Products</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/offers" className="text-gray-400 hover:text-white transition-colors">Televisions</Link></li>
              <li><Link to="/offers" className="text-gray-400 hover:text-white transition-colors">Appliances</Link></li>
              <li><Link to="/offers" className="text-gray-400 hover:text-white transition-colors">Furniture</Link></li>
              <li><Link to="/offers" className="text-gray-400 hover:text-white transition-colors">New Arrivals</Link></li>
              <li><Link to="/offers" className="text-gray-400 hover:text-white transition-colors">Top Deals</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-gray-400" />
                <span className="text-gray-400">1-800-APPLIANCE</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-gray-400" />
                <span className="text-gray-400">support@homehaven.com</span>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                <span className="text-gray-400">123 Appliance Street<br />Tech City, TC 12345</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2025 HomeHaven. All rights reserved. | <Link to="#" className="hover:text-white">Privacy Policy</Link> | <Link to="#" className="hover:text-white">Terms of Service</Link></p>
        </div>
      </div>
    </footer>
  );
};
