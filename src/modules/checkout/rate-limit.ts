import { NextRequest } from "next/server";
import { CheckoutValidationError } from "./address-validation";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_ATTEMPTS = 8;
const attempts = new Map<string, number[]>();

const prune = (now: number) => {
  for (const [key, values] of attempts.entries()) {
    const recent = values.filter((time) => now - time < WINDOW_MS);
    if (recent.length === 0) attempts.delete(key);
    else attempts.set(key, recent);
  }
};

const clientIpFor = (request: NextRequest) => {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return (
    forwarded ||
    request.headers.get("x-real-ip") ||
    request.headers.get("cf-connecting-ip") ||
    "unknown"
  );
};

export const assertCheckoutRateLimit = (request: NextRequest, email: string) => {
  const now = Date.now();
  prune(now);

  const key = `${clientIpFor(request)}:${email.toLowerCase()}`;
  const recent = (attempts.get(key) || []).filter((time) => now - time < WINDOW_MS);

  if (recent.length >= MAX_ATTEMPTS) {
    throw new CheckoutValidationError("Too many checkout attempts. Please try again in a few minutes.", 429);
  }

  attempts.set(key, [...recent, now]);
};
