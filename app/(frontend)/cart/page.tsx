import CartTable from "@/app/_Components/CartTable"
import type { Metadata } from "next"


export const metadata: Metadata = {
  title: "Cart page",
}

export default function CartPage() {

  return (
    <div className="p-4 flex flex-col justify-center">
      <h1>Cart page</h1>
      <CartTable/>
    </div>
  )
}
