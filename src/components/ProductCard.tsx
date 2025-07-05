
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
  isNew 
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
      <Card className="product-card-compact group cursor-pointer h-full">
        <div className="relative">
          <img
            src={image}
            alt={name}
            className="product-image"
          />
          {isNew && (
            <Badge className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1">
              New
            </Badge>
          )}
          {discount > 0 && (
            <Badge className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1">
              -{discount}%
            </Badge>
          )}
        </div>
        
        <CardContent className="product-content">
          <div className="space-y-1">
            <p className="product-title">{name}</p>
            
            <div className="flex items-center gap-2">
              <span className="product-price">
                ₹{price.toLocaleString()}
              </span>
              {originalPrice && (
                <span className="text-xs text-gray-500 line-through">
                  ₹{originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span className="product-rating">
                  {rating} ({reviews})
                </span>
              </div>
              
              <Button
                size="sm"
                onClick={handleAddToCart}
                className="h-7 px-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity bg-blue-600 hover:bg-blue-700"
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
