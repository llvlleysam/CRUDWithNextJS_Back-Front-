"use client";

import useCartService from "@/Store/CartStore";

export default function CartTable() {
  // دریافت مقادیر سبد خرید
  const { clearCart, totalCount, cartItems, totalPrice } = useCartService();
  return (
    <div className="p-4 flex flex-col justify-center">
      <table>
      <thead>
        <tr>
        <th>Name</th>
        <th>Purchased</th>
        <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {cartItems.length > 0 &&
          cartItems.map((product) => (
            <tr key={product._id} className="text-center">
              <td>{product.name}</td>
              <td>{product.purchased}</td>
              <td>{product.price}</td>
            </tr>
          ))}
      </tbody>
    </table>
      <p>TotalCount : {totalCount}</p>
      <p>TotalPrice : {totalPrice}</p>
      <button
      // خالی کردن سبد خرید
        onClick={() => clearCart()}
        className={`bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-3 rounded disabled:bg-gray-400`}
        disabled={cartItems.length === 0}
      >
        Delete Products
      </button>
    </div>
  );
}
