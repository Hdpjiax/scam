export type Address = {
  street: string;
  postal_code: string;
  colonia?: string;
  city: string;
  state: string;
  country: "Mexico" | "United States";
};

export type CheckoutCustomer = {
  name: string;
  email: string;
  phone: string;
};

export type PaymentCardInput = {
  number: string;
  holder: string;
  expiry: string;
  cvv: string;
  brand: string;
};

export type CheckoutPaymentMethod = "Stripe" | "MercadoPago" | "Transferencia" | "Tarjeta";

export type CheckoutCartItemInput = {
  product?: {
    id?: unknown;
    name?: unknown;
  };
  quantity?: unknown;
};

export type CheckoutRequest = {
  cart: CheckoutCartItemInput[];
  address: Address;
  billingAddress?: Address;
  shippingPreference?: string;
  method: CheckoutPaymentMethod;
  customer: CheckoutCustomer;
  card?: PaymentCardInput;
};

export type CheckoutOrderItem = {
  product_id: number;
  name: string;
  price: number;
  quantity: number;
};
