
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  category: string;
  isNew?: boolean;
  badge?: string;
}

export const ProductCard = ({ 
  id, 
  name, 
  price, 
  originalPrice, 
  image, 
  rating, 
  reviews, 
  category,
  isNew,
  badge
}: ProductCardProps) => {
  const addItem = useCartStore((state) => state.addItem);
  const { toast } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addItem({
      id,
      name,
      price,
      image,
      category
    });

    toast({
      title: "Added to Cart",
      description: `${name} has been added to your cart.`,
    });
  };

  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  return (
    <Link to={`/product/${id}`}>
      <Card className="group cursor-pointer h-full bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 hover:border-gray-600 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
        <div className="relative overflow-hidden rounded-t-lg">
          <img
            src={image}
            alt={name}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {isNew && (
            <Badge className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1">
              New
            </Badge>
          )}
          {badge && (
            <Badge className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1">
              {badge}
            </Badge>
          )}
          {discount > 0 && (
            <Badge className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1">
              -{discount}%
            </Badge>
          )}
        </div>
        
        <CardContent className="p-4 bg-gradient-to-br from-gray-900 to-gray-800">
          <div className="space-y-2">
            <h3 className="font-semibold text-white line-clamp-2 group-hover:text-blue-400 transition-colors">
              {name}
            </h3>
            
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-blue-400">
                ₹{price.toLocaleString()}
              </span>
              {originalPrice && (
                <span className="text-sm text-gray-500 line-through">
                  ₹{originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm text-gray-400">
                  {rating} ({reviews})
                </span>
              </div>
              
              <Button
                size="sm"
                onClick={handleAddToCart}
                className="h-8 px-3 text-xs opacity-0 group-hover:opacity-100 transition-opacity bg-blue-600 hover:bg-blue-700"
              >
                <ShoppingCart className="h-3 w-3 mr-1" />
                Add
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
