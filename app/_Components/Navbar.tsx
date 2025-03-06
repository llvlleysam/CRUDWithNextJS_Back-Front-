"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  // با استفاده از این هوک مینونیم مشخص کنیم که کجا هستیم داخل کدام صفحه
  const pathname = usePathname();
  return (
    <div>
      <nav className="p-4">
        <menu className="flex gap-4">
          <li>
            <Link
              href="/"
              // صفحه جاری رو مشخص میکنیم
              className={`${pathname === "/" ? "text-red-500" : ""}`}
            >
              Home
            </Link>
          </li>

          <li>
            <Link
              href="/products"
              className={`${pathname === "/products" ? "text-red-500" : ""}`}
            >
              Products
            </Link>
          </li>

          <li>
            <Link
              href="/about"
              className={`${pathname === "/about" ? "text-red-500" : ""}`}
            >
              About
            </Link>
          </li>

          <li>
            <Link
              href="/cart"
              className={`${pathname === "/cart" ? "text-red-500" : ""}`}
            >
              Cart
            </Link>
          </li>
          <li>
            <Link
              href="/add"
              className={`${pathname === "/add" ? "text-red-500" : ""}`}
            >
              Add Product
            </Link>
          </li>
        </menu>
      </nav>
    </div>
  );
}
