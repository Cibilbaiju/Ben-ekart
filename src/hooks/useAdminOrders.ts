
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

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

export const useAdminOrders = () => {
  const [orders, setOrders] = useState<OrderWithDetails[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

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

  useEffect(() => {
    fetchOrders();
  }, []);

  return {
    orders,
    isLoading,
    updateOrderStatus,
    fetchOrders
  };
};
