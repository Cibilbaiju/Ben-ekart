
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface SalesSummary {
  total_sales: number;
  total_orders: number;
  pending_orders: number;
  delivered_orders: number;
  in_transit_orders: number;
}

export const useAdminSales = () => {
  const [salesData, setSalesData] = useState<SalesSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchSalesData = async (date: string = new Date().toISOString().split('T')[0]) => {
    try {
      const { data, error } = await supabase
        .rpc('get_daily_sales_summary', { target_date: date });

      if (error) throw error;

      if (data && data.length > 0) {
        setSalesData(data[0]);
      } else {
        setSalesData({
          total_sales: 0,
          total_orders: 0,
          pending_orders: 0,
          delivered_orders: 0,
          in_transit_orders: 0
        });
      }
    } catch (error: any) {
      console.error('Error fetching sales data:', error);
      toast({
        title: "Error",
        description: "Failed to load sales data",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSalesData();
  }, []);

  return {
    salesData,
    isLoading,
    fetchSalesData
  };
};
