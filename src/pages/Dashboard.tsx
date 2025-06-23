
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { ShoppingCart, Package, LogOut, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
}

interface Order {
  id: string;
  quantity: number;
  total_amount: number;
  status: string;
  order_date: string;
  products: Product;
}

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    fetchData();
  }, [user, navigate]);

  const fetchData = async () => {
    try {
      // Fetch products
      const { data: productsData, error: productsError } = await supabase
        .from('products')
        .select('*')
        .eq('is_active', true);

      if (productsError) throw productsError;
      setProducts(productsData || []);

      // Fetch user's orders
      const { data: ordersData, error: ordersError } = await supabase
        .from('orders')
        .select(`
          id,
          quantity,
          total_amount,
          status,
          order_date,
          products (
            id,
            name,
            description,
            price,
            image_url
          )
        `)
        .eq('customer_id', user?.id)
        .order('order_date', { ascending: false });

      if (ordersError) throw ordersError;
      setOrders(ordersData || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to load data",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const placeOrder = async (product: Product) => {
    try {
      const { error } = await supabase
        .from('orders')
        .insert({
          customer_id: user?.id,
          product_id: product.id,
          quantity: 1,
          total_amount: product.price
        });

      if (error) throw error;

      toast({
        title: "Order Placed!",
        description: `Your order for ${product.name} has been placed successfully.`
      });

      fetchData(); // Refresh orders
    } catch (error: any) {
      toast({
        title: "Order Failed",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'accepted':
        return 'bg-blue-100 text-blue-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-gray-800 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-gray-800">
      {/* Header */}
      <section className="bg-gradient-to-r from-gray-900 to-gray-800 border-b border-gray-800 shadow-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-br from-blue-800 to-purple-900 rounded-full w-12 h-12 flex items-center justify-center">
                <User className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text">
                  Customer Dashboard
                </h1>
                <p className="text-gray-400">Welcome back, {user?.email}!</p>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={handleSignOut}
              className="flex items-center space-x-2 hover:bg-red-950 border border-gray-800 text-gray-200 hover:text-red-400"
            >
              <LogOut className="h-4 w-4" />
              <span>Sign Out</span>
            </Button>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Available Products */}
        <Card className="shadow-lg border-0 bg-gradient-to-br from-gray-800 via-gray-900 to-gray-950/90 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-gray-900 to-gray-800">
            <CardTitle className="text-gray-100 flex items-center space-x-2">
              <ShoppingCart className="h-5 w-5" />
              <span>Available Products</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <Card key={product.id} className="bg-white">
                  <CardContent className="p-4">
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-48 object-cover rounded-md mb-4"
                    />
                    <h3 className="font-semibold text-lg text-gray-900">{product.name}</h3>
                    <p className="text-gray-600 text-sm mb-4">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-blue-600">
                        ${product.price.toFixed(2)}
                      </span>
                      <Button
                        onClick={() => placeOrder(product)}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      >
                        Order Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* My Orders */}
        <Card className="shadow-lg border-0 bg-gradient-to-br from-gray-800 via-gray-900 to-gray-950/90 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-gray-900 to-gray-800">
            <CardTitle className="text-gray-100 flex items-center space-x-2">
              <Package className="h-5 w-5" />
              <span>My Orders</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {orders.length === 0 ? (
              <p className="text-gray-400 text-center py-8">No orders yet. Place your first order above!</p>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <Card key={order.id} className="bg-white">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex space-x-4">
                          <img
                            src={order.products.image_url}
                            alt={order.products.name}
                            className="w-16 h-16 object-cover rounded-md"
                          />
                          <div>
                            <h3 className="font-semibold text-gray-900">{order.products.name}</h3>
                            <p className="text-gray-600">Quantity: {order.quantity}</p>
                            <p className="text-sm text-gray-500">
                              Ordered on {new Date(order.order_date).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge className={getStatusColor(order.status)}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </Badge>
                          <p className="text-lg font-semibold mt-2 text-blue-600">
                            ${order.total_amount.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
