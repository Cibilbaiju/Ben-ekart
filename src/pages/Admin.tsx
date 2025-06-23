import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Shield, LogOut, CheckCircle, XCircle, Package } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface OrderWithDetails {
  id: string;
  quantity: number;
  total_amount: number;
  status: string;
  order_date: string;
  customer_id: string;
  profiles: {
    first_name: string;
    last_name: string;
    phone: string;
  } | null;
  products: {
    name: string;
    description: string;
    price: number;
  } | null;
}

const Admin = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<OrderWithDetails[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    checkAdminStatus();
  }, [user, navigate]);

  const checkAdminStatus = async () => {
    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('is_admin')
        .eq('id', user?.id)
        .single();

      if (error) throw error;

      if (!profile?.is_admin) {
        toast({
          title: "Access Denied",
          description: "You don't have admin privileges.",
          variant: "destructive"
        });
        navigate('/dashboard');
        return;
      }

      setIsAdmin(true);
      fetchOrders();
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to verify admin status",
        variant: "destructive"
      });
      navigate('/dashboard');
    }
  };

  const fetchOrders = async () => {
    try {
      // First fetch orders
      const { data: ordersData, error: ordersError } = await supabase
        .from('orders')
        .select('*')
        .order('order_date', { ascending: false });

      if (ordersError) {
        console.error('Orders fetch error:', ordersError);
        throw ordersError;
      }

      if (!ordersData || ordersData.length === 0) {
        setOrders([]);
        setIsLoading(false);
        return;
      }

      // Get unique customer and product IDs
      const customerIds = [...new Set(ordersData.map(order => order.customer_id))];
      const productIds = [...new Set(ordersData.map(order => order.product_id))];

      // Fetch profiles
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('id, first_name, last_name, phone')
        .in('id', customerIds);

      if (profilesError) {
        console.error('Profiles fetch error:', profilesError);
      }

      // Fetch products
      const { data: productsData, error: productsError } = await supabase
        .from('products')
        .select('id, name, description, price')
        .in('id', productIds);

      if (productsError) {
        console.error('Products fetch error:', productsError);
      }

      // Combine the data
      const ordersWithDetails = ordersData.map(order => ({
        ...order,
        profiles: profilesData?.find(profile => profile.id === order.customer_id) || null,
        products: productsData?.find(product => product.id === order.product_id) || null
      }));

      console.log('Combined orders data:', ordersWithDetails);
      setOrders(ordersWithDetails);
    } catch (error: any) {
      console.error('Error fetching orders:', error);
      toast({
        title: "Error",
        description: "Failed to load orders",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ 
          status: newStatus,
          updated_at: new Date().toISOString()
        })
        .eq('id', orderId);

      if (error) throw error;

      toast({
        title: "Status Updated",
        description: `Order status updated to ${newStatus}`
      });

      fetchOrders(); // Refresh orders
    } catch (error: any) {
      toast({
        title: "Update Failed",
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

  if (!isAdmin) {
    return null; // This will be handled by the redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-gray-800">
      {/* Header */}
      <section className="bg-gradient-to-r from-gray-900 to-gray-800 border-b border-gray-800 shadow-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-br from-red-800 to-orange-900 rounded-full w-12 h-12 flex items-center justify-center">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-transparent bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text">
                  Admin Panel
                </h1>
                <p className="text-gray-400">Manage customer orders and business operations</p>
              </div>
            </div>
            <div className="flex space-x-4">
              <Button
                variant="outline"
                onClick={() => navigate('/dashboard')}
                className="border border-gray-800 text-gray-200 hover:bg-blue-950"
              >
                Customer View
              </Button>
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
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <Card className="shadow-lg border-0 bg-gradient-to-br from-gray-800 via-gray-900 to-gray-950/90 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-gray-900 to-gray-800">
            <CardTitle className="text-gray-100 flex items-center space-x-2">
              <Package className="h-5 w-5" />
              <span>All Customer Orders</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {orders.length === 0 ? (
              <p className="text-gray-400 text-center py-8">No orders found.</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-700">
                    <TableHead className="text-gray-300">Order ID</TableHead>
                    <TableHead className="text-gray-300">Customer</TableHead>
                    <TableHead className="text-gray-300">Product</TableHead>
                    <TableHead className="text-gray-300">Quantity</TableHead>
                    <TableHead className="text-gray-300">Amount</TableHead>
                    <TableHead className="text-gray-300">Date</TableHead>
                    <TableHead className="text-gray-300">Status</TableHead>
                    <TableHead className="text-gray-300">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id} className="border-gray-700">
                      <TableCell className="text-gray-200 font-mono text-xs">
                        {order.id.slice(0, 8)}...
                      </TableCell>
                      <TableCell className="text-gray-200">
                        <div>
                          <p className="font-medium">
                            {order.profiles?.first_name || 'N/A'} {order.profiles?.last_name || ''}
                          </p>
                          <p className="text-xs text-gray-400">{order.profiles?.phone || 'No phone'}</p>
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-200">
                        <div>
                          <p className="font-medium">{order.products?.name || 'Unknown Product'}</p>
                          <p className="text-xs text-gray-400">${order.products?.price || 0}</p>
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-200">{order.quantity}</TableCell>
                      <TableCell className="text-gray-200 font-semibold">
                        ${order.total_amount.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-gray-200 text-sm">
                        {new Date(order.order_date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(order.status)}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          {order.status === 'pending' && (
                            <>
                              <Button
                                size="sm"
                                onClick={() => updateOrderStatus(order.id, 'accepted')}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                <CheckCircle className="h-3 w-3" />
                              </Button>
                              <Button
                                size="sm"
                                onClick={() => updateOrderStatus(order.id, 'rejected')}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                <XCircle className="h-3 w-3" />
                              </Button>
                            </>
                          )}
                          {order.status === 'accepted' && (
                            <Button
                              size="sm"
                              onClick={() => updateOrderStatus(order.id, 'delivered')}
                              className="bg-blue-600 hover:bg-blue-700"
                            >
                              Mark Delivered
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Admin;
