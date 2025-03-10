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
                    <Link href="/singIn" className={`${pathname === "/singIn" ? "text-red-500" : ""}`}>SingIn</Link>
                </li>
                <li>
                    <Link href="/" className={`${pathname === "/" ? "text-red-500" : ""}`}>Home</Link>
                </li>
            </menu>
        </nav>
      
    </div>
  )
}
