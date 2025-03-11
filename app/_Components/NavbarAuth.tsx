"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavbarAuth() {
    const pathname = usePathname();
  return (
    <div>
        <nav className="p-4">
            <menu className="flex gap-4">
                <li>
                    <Link href="/login" className={`${pathname === "/login" ? "text-red-500" : ""}`}>Login</Link>
                </li>
                <li>
                    <Link href="/register" className={`${pathname === "/register" ? "text-red-500" : ""}`}>Register</Link>
                </li>
                <li>
                    <Link href="/" className={`${pathname === "/" ? "text-red-500" : ""}`}>Home</Link>
                </li>
            </menu>
        </nav>
      
    </div>
  )
}
