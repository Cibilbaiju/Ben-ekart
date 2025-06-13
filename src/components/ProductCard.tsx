
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart, Heart, Eye, ChevronLeft, ChevronRight } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
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
  images = [image],
  rating, 
  reviews, 
  badge, 
  isNew,
  category 
}: ProductCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const addItem = useCartStore((state) => state.addItem);
  const { toast } = useToast();

  // Ensure we have at least one image
  const productImages = images.length > 0 ? images : [image];
  const currentImage = productImages[currentImageIndex];

  // Safely handle price calculations
  const safePrice = typeof price === 'number' ? price : 0;
  const safeOriginalPrice = typeof originalPrice === 'number' ? originalPrice : null;
  const discount = safeOriginalPrice && safePrice ? Math.round(((safeOriginalPrice - safePrice) / safeOriginalPrice) * 100) : 0;

  const handleAddToCart = () => {
    addItem({
      id,
      name,
      price: safePrice,
      image: currentImage,
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

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % productImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + productImages.length) % productImages.length);
  };

  return (
    <Card 
      className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 shadow-lg overflow-hidden bg-gradient-to-br from-card to-card/30 dark:from-card dark:to-card/30"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden">
        <img
          src={currentImage}
          alt={name}
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Image navigation buttons */}
        {productImages.length > 1 && (
          <>
            <Button
              size="sm"
              variant="outline"
              className={`absolute left-2 top-1/2 -translate-y-1/2 p-1 bg-background/90 hover:bg-background border-none shadow-md transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
              onClick={prevImage}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              className={`absolute right-2 top-1/2 -translate-y-1/2 p-1 bg-background/90 hover:bg-background border-none shadow-md transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
              onClick={nextImage}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            
            {/* Image indicators */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1">
              {productImages.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentImageIndex 
                      ? 'bg-primary scale-125' 
                      : 'bg-background/50'
                  }`}
                />
              ))}
            </div>
          </>
        )}
        
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
            className="p-2 bg-background/90 hover:bg-background border-none shadow-md"
            onClick={handleToggleLike}
          >
            <Heart className={`h-4 w-4 ${isLiked ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}`} />
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="p-2 bg-background/90 hover:bg-background border-none shadow-md"
            onClick={handleQuickView}
          >
            <Eye className="h-4 w-4 text-muted-foreground" />
          </Button>
        </div>

        {/* Quick add to cart overlay */}
        <div className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <Button
            onClick={handleAddToCart}
            className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-primary-foreground px-6 py-2 rounded-full shadow-lg transform transition-all duration-300 hover:scale-105"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      </div>

      <CardContent className="p-6 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-card to-card/50 opacity-90"></div>
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
                      : "text-muted-foreground/30"
                  }`}
                />
              ))}
            </div>
            <span className="ml-2 text-sm text-muted-foreground">({reviews})</span>
          </div>

          {/* Product name */}
          <h3 className="font-bold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">
            {name}
          </h3>

          {/* Price */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-primary">₹{safePrice.toLocaleString()}</span>
              {safeOriginalPrice && (
                <span className="text-lg text-muted-foreground line-through">₹{safeOriginalPrice.toLocaleString()}</span>
              )}
            </div>
          </div>

          {/* Add to cart button for mobile */}
          <Button
            onClick={handleAddToCart}
            className="w-full mt-4 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-primary-foreground md:hidden"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
