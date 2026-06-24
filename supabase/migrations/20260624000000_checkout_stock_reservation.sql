CREATE OR REPLACE FUNCTION public.reserve_checkout_stock(items jsonb)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    item jsonb;
    target_product_id bigint;
    target_quantity integer;
    updated_rows integer;
BEGIN
    IF jsonb_typeof(items) IS DISTINCT FROM 'array' THEN
        RAISE EXCEPTION 'Invalid stock reservation payload';
    END IF;

    FOR item IN SELECT * FROM jsonb_array_elements(items)
    LOOP
        target_product_id := (item ->> 'product_id')::bigint;
        target_quantity := (item ->> 'quantity')::integer;

        IF target_product_id IS NULL OR target_product_id <= 0 OR target_quantity IS NULL OR target_quantity <= 0 THEN
            RAISE EXCEPTION 'Invalid stock reservation item';
        END IF;

        UPDATE public.products
        SET stock = stock - target_quantity
        WHERE id = target_product_id
          AND stock >= target_quantity;

        GET DIAGNOSTICS updated_rows = ROW_COUNT;

        IF updated_rows <> 1 THEN
            RAISE EXCEPTION 'Insufficient stock for product %', target_product_id;
        END IF;
    END LOOP;
END;
$$;

CREATE OR REPLACE FUNCTION public.restore_checkout_stock(items jsonb)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    item jsonb;
    target_product_id bigint;
    target_quantity integer;
BEGIN
    IF jsonb_typeof(items) IS DISTINCT FROM 'array' THEN
        RAISE EXCEPTION 'Invalid stock restore payload';
    END IF;

    FOR item IN SELECT * FROM jsonb_array_elements(items)
    LOOP
        target_product_id := (item ->> 'product_id')::bigint;
        target_quantity := (item ->> 'quantity')::integer;

        IF target_product_id IS NULL OR target_product_id <= 0 OR target_quantity IS NULL OR target_quantity <= 0 THEN
            RAISE EXCEPTION 'Invalid stock restore item';
        END IF;

        UPDATE public.products
        SET stock = stock + target_quantity
        WHERE id = target_product_id;
    END LOOP;
END;
$$;

REVOKE ALL ON FUNCTION public.reserve_checkout_stock(jsonb) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.restore_checkout_stock(jsonb) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.reserve_checkout_stock(jsonb) FROM anon;
REVOKE ALL ON FUNCTION public.restore_checkout_stock(jsonb) FROM anon;
REVOKE ALL ON FUNCTION public.reserve_checkout_stock(jsonb) FROM authenticated;
REVOKE ALL ON FUNCTION public.restore_checkout_stock(jsonb) FROM authenticated;
GRANT EXECUTE ON FUNCTION public.reserve_checkout_stock(jsonb) TO service_role;
GRANT EXECUTE ON FUNCTION public.restore_checkout_stock(jsonb) TO service_role;
