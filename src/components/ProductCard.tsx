
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart, Heart, Eye } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  badge?: string;
  isNew?: boolean;
  category?: string;
}

export const ProductCard = ({ 
  id, 
  name, 
  price, 
  originalPrice, 
  image, 
  rating, 
  reviews, 
  badge, 
  isNew,
  category 
}: ProductCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const addItem = useCartStore((state) => state.addItem);
  const { toast } = useToast();

  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  const handleAddToCart = () => {
    addItem({
      id,
      name,
      price,
      image,
      category
    });
    
    toast({
      title: "Added to Cart!",
      description: `${name} has been added to your cart.`,
    });
  };

  const handleToggleLike = () => {
    setIsLiked(!isLiked);
    toast({
      title: isLiked ? "Removed from Wishlist" : "Added to Wishlist",
      description: isLiked ? `${name} removed from wishlist` : `${name} added to wishlist`,
    });
  };

  const handleQuickView = () => {
    toast({
      title: "Quick View",
      description: `Opening ${name} details...`,
    });
  };

  return (
    <Card 
      className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 shadow-lg overflow-hidden bg-gradient-to-br from-white to-gray-50/30"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {isNew && (
            <Badge className="bg-gradient-to-r from-green-500 to-green-600 text-white px-2 py-1 text-xs font-semibold">
              NEW
            </Badge>
          )}
          {badge && (
            <Badge className="bg-gradient-to-r from-red-500 to-red-600 text-white px-2 py-1 text-xs font-semibold">
              {badge}
            </Badge>
          )}
          {discount > 0 && (
            <Badge className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-2 py-1 text-xs font-semibold">
              -{discount}%
            </Badge>
          )}
        </div>

        {/* Action buttons */}
        <div className={`absolute top-3 right-3 flex flex-col gap-2 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <Button
            size="sm"
            variant="outline"
            className="p-2 bg-white/90 hover:bg-white border-none shadow-md"
            onClick={handleToggleLike}
          >
            <Heart className={`h-4 w-4 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="p-2 bg-white/90 hover:bg-white border-none shadow-md"
            onClick={handleQuickView}
          >
            <Eye className="h-4 w-4 text-gray-600" />
          </Button>
        </div>

        {/* Quick add to cart overlay */}
        <div className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <Button
            onClick={handleAddToCart}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-2 rounded-full shadow-lg transform transition-all duration-300 hover:scale-105"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      </div>

      <CardContent className="p-6 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50/50 opacity-90"></div>
        <div className="relative z-10">
          {/* Rating */}
          <div className="flex items-center mb-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(rating)
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="ml-2 text-sm text-gray-600">({reviews})</span>
          </div>

          {/* Product name */}
          <h3 className="font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {name}
          </h3>

          {/* Price */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-blue-600">₹{price.toLocaleString()}</span>
              {originalPrice && (
                <span className="text-lg text-gray-500 line-through">₹{originalPrice.toLocaleString()}</span>
              )}
            </div>
          </div>

          {/* Add to cart button for mobile */}
          <Button
            onClick={handleAddToCart}
            className="w-full mt-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white md:hidden"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
