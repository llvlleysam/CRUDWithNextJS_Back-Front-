"use client";

import useCartService from "@/Store/CartStore";
import { usePathname, useRouter } from "next/navigation";

export default function CartTable({
  setNotification,
}: {
  setNotification?: (bol: boolean) => void;
}) {
  const navigate = useRouter();
  const pathname = usePathname();
  // دریافت مقادیر سبد خرید
  const {
    clearCart,
    totalCount,
    cartItems,
    totalPrice,
    AddToCart,
    removeProduct,
    shippingAddress,
  } = useCartService();
  const handleCheckout = async () => {
    if (shippingAddress) {
      try {
        const res = await fetch("/api/Orders", {
          method: "POST",
          body: JSON.stringify({
            cartItems,
            shippingAddress,
            totalPrice,
            totalCount,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (res.ok) {
          clearCart();
          if (setNotification) {
            setNotification(true);
            setTimeout(() => {
              navigate.push("/products");
              setNotification(false);
            }, 2000);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div className="p-4 flex flex-col justify-center">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Purchased</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.length > 0 &&
            cartItems.map((product) => (
              <tr key={product._id} className="text-center">
                <td>{product.name}</td>
                <td>{product.purchased}</td>
                <td>{product.price}</td>
                <td className="flex gap-2 justify-center">
                  <button
                    onClick={() => removeProduct(product)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  >
                    {product.purchased === 1 ? "Del" : "-"}
                  </button>
                  <button
                    onClick={() =>
                      AddToCart({
                        ...product,
                        purchased: product.purchased + 1,
                      })
                    }
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                  >
                    +
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <p>TotalCount : {totalCount}</p>
      <p>TotalPrice : {totalPrice}</p>
      <button
        // خالی کردن سبد خرید
        onClick={() => clearCart()}
        className={`bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-3 rounded mb-2 disabled:bg-gray-400`}
        disabled={cartItems.length === 0}
      >
        Delete Products
      </button>
      {pathname === "/cart" && (
        <button
          onClick={() => navigate.push("/shipping")}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded disabled:bg-gray-400"
          disabled={cartItems.length === 0}
        >
          Form Shipping Address
        </button>
      )}
      {pathname === "/checkout" && (
        <button
          onClick={() => handleCheckout()}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded disabled:bg-gray-400"
          disabled={cartItems.length === 0}
        >
          Place Order
        </button>
      )}
    </div>
  );
}
