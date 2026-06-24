DROP POLICY IF EXISTS "Allow anyone to create an order (guest checkouts)" ON public.orders;
DROP POLICY IF EXISTS "Allow anyone to insert order items" ON public.order_items;
DROP POLICY IF EXISTS "Allow anyone to insert shipping address" ON public.shipping_addresses;
DROP POLICY IF EXISTS "Allow anyone to insert a payment" ON public.payments;
