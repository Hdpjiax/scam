import type {
  Address,
  CheckoutCustomer,
  CheckoutPaymentMethod,
  CheckoutRequest,
} from "./checkout.types";

const COUNTRIES = new Set(["Mexico", "United States"]);
const PAYMENT_METHODS = new Set(["Stripe", "MercadoPago", "Transferencia", "Tarjeta"]);

export class CheckoutValidationError extends Error {
  status = 400;
}

const fail = (message: string): never => {
  throw new CheckoutValidationError(message);
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const cleanText = (value: unknown, field: string, maxLength = 160) => {
  if (typeof value !== "string") {
    throw new CheckoutValidationError(`${field} is required.`);
  }
  const cleaned = value.trim();
  if (!cleaned) fail(`${field} is required.`);
  if (cleaned.length > maxLength) fail(`${field} is too long.`);
  return cleaned;
};

export const normalizeAddress = (value: unknown, label: "shipping" | "billing"): Address => {
  if (!isRecord(value)) {
    throw new CheckoutValidationError(`A valid ${label} address is required.`);
  }
  const record = value;

  const country = cleanText(record.country, `${label} country`, 32);
  if (!COUNTRIES.has(country)) fail(`${label} country is not supported.`);

  const address: Address = {
    street: cleanText(record.street, `${label} street address`, 180),
    postal_code: cleanText(record.postal_code, `${label} ZIP code`, 16).replace(/\D/g, ""),
    colonia: typeof record.colonia === "string" ? record.colonia.trim() : "",
    city: cleanText(record.city, `${label} city`, 80),
    state: cleanText(record.state, `${label} state`, 80),
    country: country as Address["country"],
  };

  if (address.street.length < 5) fail(`Please enter a valid ${label} street address.`);
  if (address.postal_code.length !== 5) fail(`${label} ZIP code must be exactly 5 digits.`);
  if (address.city.length < 2) fail(`Please enter a valid ${label} city.`);
  if (address.state.length < 2) fail(`Please enter a valid ${label} state.`);
  if (address.country === "Mexico" && (!address.colonia || address.colonia.length < 2)) {
    fail(`Please enter a valid ${label} colonia / neighborhood.`);
  }

  return address;
};

export const normalizeCustomer = (value: unknown): CheckoutCustomer => {
  if (!isRecord(value)) {
    throw new CheckoutValidationError("Customer information is required.");
  }
  const record = value;

  const customer = {
    name: cleanText(record.name, "Customer name", 120),
    email: cleanText(record.email, "Customer email", 180).toLowerCase(),
    phone: cleanText(record.phone, "Customer phone", 40),
  };

  if (customer.name.split(/\s+/).length < 2) fail("Please enter the customer's full name.");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email)) fail("Please enter a valid email address.");
  if (customer.phone.replace(/\D/g, "").length < 10) fail("Please enter a valid phone number.");

  return customer;
};

export const normalizePaymentMethod = (value: unknown): CheckoutPaymentMethod => {
  const method = cleanText(value, "Payment method", 32);
  if (!PAYMENT_METHODS.has(method)) fail("Invalid payment method.");
  return method as CheckoutPaymentMethod;
};

export const normalizeCheckoutRequest = (body: unknown): CheckoutRequest => {
  if (!isRecord(body)) {
    throw new CheckoutValidationError("Invalid checkout request.");
  }
  const record = body;

  const cartValue = record.cart;
  if (!Array.isArray(cartValue)) {
    throw new CheckoutValidationError("The cart is empty.");
  }
  if (cartValue.length === 0) fail("The cart is empty.");
  if (cartValue.length > 100) fail("The cart has too many items.");

  const address = normalizeAddress(record.address, "shipping");
  const billingAddress = record.billingAddress
    ? normalizeAddress(record.billingAddress, "billing")
    : address;

  return {
    cart: cartValue,
    address,
    billingAddress,
    shippingPreference:
      typeof record.shippingPreference === "string"
        ? record.shippingPreference.trim().slice(0, 240)
        : undefined,
    method: normalizePaymentMethod(record.method),
    customer: normalizeCustomer(record.customer),
    card: isRecord(record.card) ? (record.card as CheckoutRequest["card"]) : undefined,
  };
};
