
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Star, ArrowLeft, ShoppingCart, Truck, MapPin } from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image_url: string;
}

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isLoading: authLoading } = useAuth();
  const { toast } = useToast();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  
  const [orderForm, setOrderForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  useEffect(() => {
    if (!authLoading && !user) {
      toast({
        title: "Sign In Required",
        description: "Please sign in to view product details and place orders.",
        variant: "destructive"
      });
      navigate('/auth');
      return;
    }
    
    if (id) {
      fetchProduct();
    }
  }, [id, user, authLoading, navigate, toast]);

  const fetchProduct = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .eq('is_active', true)
        .single();

      if (error) throw error;
      setProduct(data);
    } catch (error: any) {
      console.error('Error fetching product:', error);
      toast({
        title: "Error",
        description: "Failed to load product details",
        variant: "destructive"
      });
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setOrderForm(prev => ({ ...prev, [field]: value }));
  };

  const handlePlaceOrder = async () => {
    if (!user || !product) return;

    // Validate required fields
    if (!orderForm.firstName || !orderForm.lastName || !orderForm.phone || 
        !orderForm.address || !orderForm.city || !orderForm.state || !orderForm.pincode) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    setIsPlacingOrder(true);
    try {
      const totalAmount = product.price * quantity;
      const deliveryDate = new Date();
      deliveryDate.setDate(deliveryDate.getDate() + 3); // 3 days delivery

      const { error } = await supabase
        .from('orders')
        .insert({
          customer_id: user.id,
          product_id: product.id,
          quantity: quantity,
          total_amount: totalAmount,
          status: 'pending',
          shipping_address: `${orderForm.address}, ${orderForm.city}, ${orderForm.state} - ${orderForm.pincode}`,
          phone: orderForm.phone,
          delivery_date: deliveryDate.toISOString()
        });

      if (error) throw error;

      toast({
        title: "Order Placed Successfully! 🎉",
        description: `Your order will be delivered by ${deliveryDate.toDateString()}. Payment: Cash on Delivery`,
      });
      
      navigate("/dashboard");
    } catch (error: any) {
      console.error('Error placing order:', error);
      toast({
        title: "Order Failed",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsPlacingOrder(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-gray-800 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-gray-800 flex items-center justify-center">
        <div className="text-white">Product not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-gray-800 text-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <Link to="/">
            <Button variant="outline" className="mr-4 bg-gray-800 border-gray-600 text-gray-200 hover:bg-gray-700">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Image and Details */}
          <div>
            <Card className="bg-gradient-to-br from-gray-800 via-gray-900 to-gray-950/95 shadow-2xl border border-gray-700">
              <CardContent className="p-6">
                <img
                  src={product.image_url || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-96 object-cover rounded-lg mb-6"
                />
                
                <h1 className="text-3xl font-bold text-gray-100 mb-4">{product.name}</h1>
                
                <div className="flex items-center mb-4">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                    <span className="ml-2 text-gray-300">(4.5) 120 reviews</span>
                  </div>
                </div>

                <div className="text-3xl font-bold text-blue-400 mb-6">
                  ₹{product.price.toLocaleString()}
                </div>

                <p className="text-gray-300 mb-6">
                  {product.description || "High-quality product with excellent features and durability."}
                </p>

                <div className="flex items-center gap-4 mb-6">
                  <Label htmlFor="quantity" className="text-gray-300">Quantity:</Label>
                  <Select onValueChange={(value) => setQuantity(parseInt(value))}>
                    <SelectTrigger className="w-20 bg-gray-800 border-gray-600 text-gray-200">
                      <SelectValue placeholder="1" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5].map((num) => (
                        <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Badge className="bg-green-600 text-white mb-4">
                  <Truck className="h-3 w-3 mr-1" />
                  Cash on Delivery Available
                </Badge>
              </CardContent>
            </Card>
          </div>

          {/* Order Form */}
          <div>
            <Card className="bg-gradient-to-br from-gray-800 via-gray-900 to-gray-950/95 shadow-2xl border border-gray-700">
              <CardHeader>
                <CardTitle className="text-gray-100 flex items-center">
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Complete Your Order
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName" className="text-gray-300">First Name *</Label>
                    <Input
                      id="firstName"
                      value={orderForm.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      className="bg-gray-800 border-gray-600 text-gray-200"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-gray-300">Last Name *</Label>
                    <Input
                      id="lastName"
                      value={orderForm.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      className="bg-gray-800 border-gray-600 text-gray-200"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="phone" className="text-gray-300">Phone Number *</Label>
                  <Input
                    id="phone"
                    value={orderForm.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="bg-gray-800 border-gray-600 text-gray-200"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="address" className="text-gray-300 flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    Delivery Address *
                  </Label>
                  <Input
                    id="address"
                    value={orderForm.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    placeholder="House No, Building, Street, Area"
                    className="bg-gray-800 border-gray-600 text-gray-200"
                    required
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="city" className="text-gray-300">City *</Label>
                    <Input
                      id="city"
                      value={orderForm.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                      className="bg-gray-800 border-gray-600 text-gray-200"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="state" className="text-gray-300">State *</Label>
                    <Select onValueChange={(value) => handleInputChange("state", value)}>
                      <SelectTrigger className="bg-gray-800 border-gray-600 text-gray-200">
                        <SelectValue placeholder="Select State" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="kerala">Kerala</SelectItem>
                        <SelectItem value="tamilnadu">Tamil Nadu</SelectItem>
                        <SelectItem value="karnataka">Karnataka</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="pincode" className="text-gray-300">Pincode *</Label>
                    <Input
                      id="pincode"
                      value={orderForm.pincode}
                      onChange={(e) => handleInputChange("pincode", e.target.value)}
                      placeholder="6 digits"
                      maxLength={6}
                      className="bg-gray-800 border-gray-600 text-gray-200"
                      required
                    />
                  </div>
                </div>

                <div className="border-t border-gray-700 pt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-300">Product Price:</span>
                    <span className="text-gray-200">₹{product.price.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-300">Quantity:</span>
                    <span className="text-gray-200">{quantity}</span>
                  </div>
                  <div className="flex justify-between items-center mb-4 text-lg font-bold">
                    <span className="text-gray-200">Total Amount:</span>
                    <span className="text-blue-400">₹{(product.price * quantity).toLocaleString()}</span>
                  </div>
                  
                  <Badge className="bg-green-600 text-white mb-4 w-full justify-center py-2">
                    Payment Method: Cash on Delivery
                  </Badge>
                </div>

                <Button 
                  onClick={handlePlaceOrder}
                  disabled={isPlacingOrder}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3"
                >
                  {isPlacingOrder ? "Placing Order..." : "Place Order - Cash on Delivery"}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
