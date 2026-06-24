import Link from "next/link";
import { categories } from "../lib/catalog";

export default function Footer() {
  return (
    <footer>
      <div className="footer-brand-block">
        <Link className="brand" href="/">
          NOMA<span>living spaces</span>
        </Link>
        <p>
          Secure checkout, private delivery coordination and curated home pieces
          handled with care.
        </p>
      </div>
      <nav aria-label="Explore">
        <b>Explore</b>
        {categories.slice(0, 4).map((category) => (
          <Link href={`/categoria/${category.slug}`} key={category.slug}>
            {category.name}
          </Link>
        ))}
      </nav>
      <nav aria-label="Help">
        <b>Help</b>
        <a href="mailto:hola@noma.mx">Contact</a>
        <Link href="/checkout">Shipping & Returns</Link>
        <a href="#principios">Warranty</a>
      </nav>
      <nav aria-label="Account">
        <b>Account</b>
        <Link href="/admin">Dashboard</Link>
        <Link href="/login">Login & Register</Link>
      </nav>
      <div className="footer-trust">
        <div className="payment-rail" aria-label="Accepted payment methods">
          <span>PCI DSS</span>
          <span>Stripe</span>
          <span>PayPal</span>
          <span>Visa</span>
          <span>Mastercard</span>
          <span>Amex</span>
        </div>
        <p>
          Payments are reviewed through secure provider workflows. Billing data
          is collected for verification; delivery is confirmed privately with the
          client.
        </p>
      </div>
      <small>
        (c) 2026 NOMA Living Spaces / United States | Privacy Policy | Terms &
        Conditions | Refunds & Returns
      </small>
    </footer>
  );
}
