
-- Update the user with email cibilbaiju@gmail.com to be an admin
UPDATE public.profiles 
SET is_admin = true 
WHERE id = (
  SELECT id 
  FROM auth.users 
  WHERE email = 'cibilbaiju@gmail.com'
);

-- If the profile doesn't exist yet, we'll create a trigger to handle it
-- But first, let's make sure we have the proper policies for admin access

-- Add policy for admins to manage profiles
CREATE POLICY "Admins can manage all profiles" ON public.profiles
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = TRUE)
  );

-- Ensure admins can view and update all orders
DROP POLICY IF EXISTS "Admins can view all orders" ON public.orders;
DROP POLICY IF EXISTS "Admins can update all orders" ON public.orders;

CREATE POLICY "Admins can view all orders" ON public.orders
  FOR SELECT USING (
    auth.uid() = customer_id OR 
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = TRUE)
  );

CREATE POLICY "Admins can update all orders" ON public.orders
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = TRUE)
  );

-- Add policy for admins to view all profiles (needed for order management)
CREATE POLICY "Admins can view all user profiles" ON public.profiles
  FOR SELECT USING (
    id = auth.uid() OR 
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = TRUE)
  );
