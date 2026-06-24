import type {
  CheckoutCartItemInput,
  CheckoutOrderItem,
  CheckoutPaymentMethod,
} from "./checkout.types";
import { CheckoutValidationError } from "./address-validation";

type SupabaseClientLike = {
  from: (table: string) => any;
};

type ProductRow = {
  id: number;
  name: string;
  price: number;
  stock: number;
};

export const shippingFor = (subtotal: number) => (subtotal >= 100 ? 0 : 10);

export const mapPaymentMethodForDatabase = (method: CheckoutPaymentMethod) => {
  const allowedMethods = ["Stripe", "MercadoPago", "Transferencia"] as const;
  return method === "Tarjeta"
    ? "Transferencia"
    : allowedMethods.includes(method as any)
      ? method
      : "Transferencia";
};

const fail = (message: string): never => {
  throw new CheckoutValidationError(message);
};

const normalizeCartQuantities = (cart: CheckoutCartItemInput[]) => {
  const quantities = new Map<number, number>();

  for (const item of cart) {
    const productId = Number(item?.product?.id);
    const quantity = Number(item?.quantity);

    if (!Number.isSafeInteger(productId) || productId <= 0) {
      fail("The cart contains an invalid product.");
    }

    if (!Number.isSafeInteger(quantity) || quantity <= 0 || quantity > 99) {
      fail("The cart contains an invalid quantity.");
    }

    quantities.set(productId, (quantities.get(productId) || 0) + quantity);
  }

  return quantities;
};

export const buildValidatedOrderItems = async (
  supabase: SupabaseClientLike,
  cart: CheckoutCartItemInput[],
): Promise<CheckoutOrderItem[]> => {
  const quantities = normalizeCartQuantities(cart);
  const productIds = [...quantities.keys()];

  const { data: dbProducts, error } = await supabase
    .from("products")
    .select("id, name, price, stock")
    .in("id", productIds);

  if (error) throw error;

  const productMap = new Map<number, ProductRow>(
    (dbProducts || []).map((product: ProductRow) => [Number(product.id), product]),
  );

  return productIds.map((productId) => {
    const product = productMap.get(productId);
    if (!product) {
      throw new CheckoutValidationError("A product in your cart is no longer available.");
    }

    const quantity = quantities.get(productId) || 0;
    if (!Number.isSafeInteger(product.price) || product.price < 0) {
      fail(`${product.name} has an invalid price.`);
    }
    if (!Number.isSafeInteger(product.stock) || product.stock < quantity) {
      fail(`${product.name} only has ${Math.max(0, product.stock)} units available.`);
    }

    return {
      product_id: product.id,
      name: product.name,
      price: product.price,
      quantity,
    };
  });
};

export const calculateOrderTotals = (items: CheckoutOrderItem[]) => {
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingRate = shippingFor(subtotal);
  return {
    subtotal,
    shippingRate,
    total: subtotal + shippingRate,
  };
};
