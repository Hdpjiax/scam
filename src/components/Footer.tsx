import Link from "next/link";
import { categories } from "../lib/catalog";

export default function Footer() {
  return (
    <footer>
      <Link className="brand" href="/">
        NŌMA<span>living spaces</span>
      </Link>
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
      <small>© 2026 NŌMA Living Spaces / United States</small>
    </footer>
  );
}
