"use client";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  // با استفاده از این هوک مینونیم مشخص کنیم که کجا هستیم داخل کدام صفحه
  const pathname = usePathname();
  const [user, setUser] = useState(false);
  useEffect(()=>{
    if(!user){
      setUser(JSON.parse(localStorage.getItem("isLogin")!));
    }
  },[])

  async function logout() {
    try {
      await signOut({redirectTo:"/"});
      localStorage.removeItem("isLogin");
      setUser(false);
    } catch (error) {
      console.log(error)
    }
  }
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
          <li>
            <Link
              href="/login"
              className={`${pathname === "/login" ? "text-red-500" : ""}`}
            >
              Login
            </Link>
          </li>
          {user ? <button onClick={()=>logout()} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">Logout</button> : ""}
        </menu>
      </nav>
    </div>
  );
}
