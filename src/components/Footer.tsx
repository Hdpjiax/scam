import Link from "next/link";
import { categories } from "../lib/catalog";

export default function Footer() {
  return (
    <footer>
      <Link className="brand" href="/">
        NŌMA<span>casa viva</span>
      </Link>
      <nav aria-label="Explorar">
        <b>Explora</b>
        {categories.slice(0, 4).map((category) => (
          <Link href={`/categoria/${category.slug}`} key={category.slug}>
            {category.name}
          </Link>
        ))}
      </nav>
      <nav aria-label="Ayuda">
        <b>Ayuda</b>
        <a href="mailto:hola@noma.mx">Contacto</a>
        <Link href="/checkout">Envíos y devoluciones</Link>
        <a href="#principios">Garantía</a>
      </nav>
      <nav aria-label="Administración">
        <b>Cuenta</b>
        <Link href="/admin">Panel de gestión</Link>
        <Link href="/login">Acceso y registro</Link>
      </nav>
      <small>© 2026 NŌMA Casa Viva / Ciudad de México</small>
    </footer>
  );
}
