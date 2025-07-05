
-- First, let's ensure we have proper database structure for orders and sales tracking
-- Update the orders table to include more detailed tracking
ALTER TABLE public.orders 
ADD COLUMN IF NOT EXISTS shipping_address TEXT,
ADD COLUMN IF NOT EXISTS phone TEXT,
ADD COLUMN IF NOT EXISTS delivery_date TIMESTAMP WITH TIME ZONE;

-- Create a more detailed order_items table for better tracking
CREATE TABLE IF NOT EXISTS public.order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
  product_name TEXT NOT NULL,
  product_price NUMERIC NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  total_price NUMERIC NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on order_items
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- Create policies for order_items
CREATE POLICY "Users can view their own order items" ON public.order_items
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.orders 
    WHERE orders.id = order_items.order_id 
    AND orders.customer_id = auth.uid()
  )
);

CREATE POLICY "Admins can view all order items" ON public.order_items
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.is_admin = true
  )
);

CREATE POLICY "Users can create order items for their orders" ON public.order_items
FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.orders 
    WHERE orders.id = order_items.order_id 
    AND orders.customer_id = auth.uid()
  )
);

-- Create a function to get today's sales summary
CREATE OR REPLACE FUNCTION public.get_daily_sales_summary(target_date DATE DEFAULT CURRENT_DATE)
RETURNS TABLE (
  total_sales NUMERIC,
  total_orders INTEGER,
  pending_orders INTEGER,
  delivered_orders INTEGER,
  in_transit_orders INTEGER
) 
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COALESCE(SUM(o.total_amount), 0) as total_sales,
    COUNT(*)::INTEGER as total_orders,
    COUNT(CASE WHEN o.status = 'pending' THEN 1 END)::INTEGER as pending_orders,
    COUNT(CASE WHEN o.status = 'delivered' THEN 1 END)::INTEGER as delivered_orders,
    COUNT(CASE WHEN o.status = 'in_transit' THEN 1 END)::INTEGER as in_transit_orders
  FROM public.orders o
  WHERE DATE(o.order_date) = target_date;
END;
$$;
