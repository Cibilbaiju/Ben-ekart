
-- Create products table if it doesn't exist with better structure
CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC NOT NULL CHECK (price > 0),
  image_url TEXT,
  category TEXT NOT NULL,
  stock_quantity INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Insert sample products for different categories
INSERT INTO public.products (name, description, price, image_url, category, stock_quantity) VALUES
-- TVs & Electronics
('Samsung 55" 4K Smart TV', 'Ultra HD 4K Smart TV with HDR and voice control', 45999, '/placeholder.svg', 'televisions', 15),
('LG OLED 65" TV', 'Premium OLED display with perfect blacks and infinite contrast', 89999, '/placeholder.svg', 'televisions', 8),
('Sony Bravia 43" LED TV', 'Full HD LED TV with Android TV platform', 32999, '/placeholder.svg', 'televisions', 20),

-- Home Appliances
('Samsung Double Door Refrigerator', '253L frost-free double door refrigerator', 28999, '/placeholder.svg', 'refrigerators', 12),
('LG Side by Side Refrigerator', '687L side by side refrigerator with water dispenser', 65999, '/placeholder.svg', 'refrigerators', 6),
('Whirlpool Single Door Fridge', '190L direct cool single door refrigerator', 16999, '/placeholder.svg', 'refrigerators', 18),

-- Washing Machines
('IFB Front Load Washing Machine', '7kg front load fully automatic washing machine', 35999, '/placeholder.svg', 'washing-machines', 10),
('Samsung Top Load Washer', '6.5kg top load washing machine with diamond drum', 22999, '/placeholder.svg', 'washing-machines', 15),
('LG Semi Automatic Washer', '8kg semi automatic washing machine', 18999, '/placeholder.svg', 'washing-machines', 12),

-- Air Conditioners
('Daikin 1.5 Ton Split AC', 'Inverter split AC with copper coil and R32 gas', 42999, '/placeholder.svg', 'air-conditioners', 8),
('Blue Star Window AC', '1 Ton window AC with rotary compressor', 24999, '/placeholder.svg', 'air-conditioners', 12),
('Voltas Inverter AC', '1.5 Ton inverter split AC with 5 star rating', 38999, '/placeholder.svg', 'air-conditioners', 10),

-- Kitchen Appliances
('LG Microwave Oven', '28L convection microwave with auto cook menu', 15999, '/placeholder.svg', 'microwaves', 20),
('Samsung Solo Microwave', '23L solo microwave with ceramic enamel cavity', 8999, '/placeholder.svg', 'microwaves', 25),
('IFB Grill Microwave', '25L grill microwave with 101 auto cook menus', 12999, '/placeholder.svg', 'microwaves', 18),

-- Furniture
('Godrej Sofa Set', '3+2 seater fabric sofa set in premium quality', 55999, '/placeholder.svg', 'furniture', 5),
('IKEA Dining Table', '6 seater wooden dining table with chairs', 45999, '/placeholder.svg', 'furniture', 8),
('Urban Ladder Bed', 'King size solid wood bed with storage', 35999, '/placeholder.svg', 'furniture', 6);

-- Enable Row Level Security
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Create policy to allow everyone to view active products
CREATE POLICY "Anyone can view active products" 
ON public.products 
FOR SELECT 
USING (is_active = true);

-- Create policy for admins to manage products (we'll add admin functionality later)
CREATE POLICY "Admins can manage products" 
ON public.products 
FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.is_admin = true
  )
);

-- Create orders table for storing order information
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 1 CHECK (quantity > 0),
  total_amount NUMERIC NOT NULL CHECK (total_amount > 0),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'shipped', 'delivered', 'cancelled')),
  shipping_address TEXT,
  phone TEXT,
  payment_method TEXT DEFAULT 'cod',
  stripe_session_id TEXT,
  order_date TIMESTAMP WITH TIME ZONE DEFAULT now(),
  delivery_date TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS for orders
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Create policies for orders
CREATE POLICY "Users can view their own orders" 
ON public.orders 
FOR SELECT 
USING (auth.uid() = customer_id);

CREATE POLICY "Users can create their own orders" 
ON public.orders 
FOR INSERT 
WITH CHECK (auth.uid() = customer_id);

CREATE POLICY "Admins can view all orders" 
ON public.orders 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.is_admin = true
  )
);

CREATE POLICY "Admins can update orders" 
ON public.orders 
FOR UPDATE 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.is_admin = true
  )
);

-- Create a function to update the updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers to automatically update the updated_at column
CREATE TRIGGER update_products_updated_at 
  BEFORE UPDATE ON public.products 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at 
  BEFORE UPDATE ON public.orders 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
