
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { PaymentGateway } from "@/components/PaymentGateway";
import { useCartStore } from "@/store/cartStore";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, Star, ShoppingCart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const { items, totalItems, totalPrice, updateQuantity, removeItem, clearCart } = useCartStore();
  const { toast } = useToast();
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  // Check authentication on component mount
  useEffect(() => {
    if (!isLoading && !user) {
      toast({
        title: "Sign In Required",
        description: "Please sign in to view your cart.",
        variant: "destructive"
      });
      navigate('/auth');
    }
  }, [user, isLoading, navigate, toast]);

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-gray-800 flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-purple-950/80 rounded-full w-32 h-32 flex items-center justify-center mx-auto mb-8 shadow-2xl">
            <ShoppingBag className="h-16 w-16 text-white" />
          </div>
          <h2 className="text-4xl font-bold text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text mb-4">Loading...</h2>
        </div>
      </div>
    );
  }

  // Don't render cart if user is not authenticated
  if (!user) {
    return null;
  }

  const handleQuantityChange = (id: string, newQuantity: number) => {
    updateQuantity(id, newQuantity);
  };

  const handleRemoveItem = (id: string, name: string) => {
    removeItem(id);
    toast({
      title: "Item Removed",
      description: `${name} has been removed from your cart.`,
    });
  };

  const handleClearCart = () => {
    clearCart();
    toast({
      title: "Cart Cleared",
      description: "All items have been removed from your cart.",
    });
  };

  const shipping = totalPrice > 50000 ? 0 : 999;
  const tax = totalPrice * 0.18; // 18% GST
  const finalTotal = totalPrice + shipping + tax;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-gray-800 flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-purple-950/80 rounded-full w-32 h-32 flex items-center justify-center mx-auto mb-8 shadow-2xl">
            <ShoppingBag className="h-16 w-16 text-white" />
          </div>
          <h2 className="text-4xl font-bold text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text mb-4">Your cart is empty</h2>
          <p className="text-gray-400 mb-8 text-lg">
            Looks like you haven't added any items to your cart yet.
          </p>
          <Link to="/">
            <Button className="bg-gradient-to-r from-blue-800 to-purple-950 hover:from-blue-900 hover:to-purple-950 text-white px-8 py-3 text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-gray-800 text-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8 animate-fade-in">
          <div>
            <h1 className="text-4xl font-bold text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text">
              Shopping Cart
            </h1>
            <p className="text-gray-400 text-lg">{totalItems} item{totalItems !== 1 ? 's' : ''} in your cart</p>
          </div>
          <Button
            variant="outline"
            onClick={handleClearCart}
            className="text-red-400 border-red-800 hover:bg-red-900 hover:border-red-700 transition-all"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Clear Cart
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <Card className="shadow-xl border-0 bg-gradient-to-br from-gray-800 via-gray-900 to-gray-950/95 backdrop-blur-md">
              <CardHeader className="bg-gradient-to-r from-gray-900 to-gray-800">
                <CardTitle className="text-2xl text-gray-100">Cart Items</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 p-6">
                {items.map((item, index) => (
                  <div key={item.id} className="animate-scale-in">
                    <div className="flex items-center space-x-6 p-4 rounded-xl bg-gradient-to-r from-gray-900 to-gray-800 shadow-md hover:shadow-lg transition-all">
                      <div className="relative">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-24 h-24 object-cover rounded-xl shadow-md"
                        />
                        <Badge className="absolute -top-2 -right-2 bg-gradient-to-r from-green-500 to-green-600 text-white">
                          ⭐
                        </Badge>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-100 text-lg mb-1">{item.name}</h3>
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-2xl font-bold text-blue-400">₹{item.price.toLocaleString()}</span>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                            ))}
                          </div>
                        </div>
                        {item.category && (
                          <Badge variant="outline" className="text-gray-400 border-gray-700">{item.category}</Badge>
                        )}
                      </div>
                      <div className="flex items-center space-x-3">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="hover:bg-gray-700 border-gray-700 text-gray-400"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <div className="bg-gray-800 px-4 py-2 rounded-lg font-semibold min-w-[60px] text-center text-gray-100">
                          {item.quantity}
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          className="hover:bg-gray-700 border-gray-700 text-gray-400"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-xl text-gray-100">₹{(item.price * item.quantity).toLocaleString()}</p>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveItem(item.id, item.name)}
                          className="text-red-400 hover:text-red-500 hover:bg-gray-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    {index < items.length - 1 && <Separator className="my-4 bg-gray-800" />}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary & Payment */}
          <div className="space-y-6">
            <Card className="shadow-xl border-0 bg-gradient-to-br from-gray-800 via-gray-900 to-gray-950/95 backdrop-blur-md">
              <CardHeader className="bg-gradient-to-r from-gray-900 to-gray-800">
                <CardTitle className="text-2xl text-gray-100">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 p-6">
                <div className="flex justify-between text-lg">
                  <span>Subtotal</span>
                  <span className="font-semibold text-gray-100">₹{totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-lg">
                  <span>Shipping</span>
                  <span className={`font-semibold ${shipping === 0 ? "text-green-400" : "text-gray-100"}`}>
                    {shipping === 0 ? "FREE" : `₹${shipping.toLocaleString()}`}
                  </span>
                </div>
                {shipping === 0 && (
                  <p className="text-sm text-green-400 bg-gray-800 p-2 rounded-lg">🎉 You qualify for free shipping!</p>
                )}
                <div className="flex justify-between text-lg">
                  <span>GST (18%)</span>
                  <span className="font-semibold text-gray-100">₹{tax.toLocaleString()}</span>
                </div>
                <Separator className="bg-gray-800" />
                <div className="flex justify-between text-2xl font-bold text-gray-100">
                  <span>Total</span>
                  <span className="text-blue-400">₹{finalTotal.toLocaleString()}</span>
                </div>
              </CardContent>
            </Card>

            {/* Payment Gateway */}
            <PaymentGateway />

            {/* Continue Shopping */}
            <Link to="/" className="block">
              <Button variant="outline" className="w-full py-3 hover:bg-gray-700 border-gray-700 text-gray-400">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Continue Shopping
              </Button>
            </Link>

            {/* Promo Code */}
            <Card className="shadow-xl border-0 bg-gradient-to-br from-gray-800 via-gray-900 to-gray-950/95 backdrop-blur-md">
              <CardHeader className="bg-gradient-to-r from-gray-900 to-gray-800">
                <CardTitle className="text-lg text-gray-100">Promo Code</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="flex space-x-2">
                  <Input placeholder="Enter promo code" className="border-gray-800 bg-gray-900 text-gray-100" />
                  <Button variant="outline" className="hover:bg-gray-700 border-gray-700 text-gray-400">Apply</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
