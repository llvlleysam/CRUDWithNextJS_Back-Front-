'use client'
import { ProductModel } from "@/Models/Product";
import useCartService from "@/Store/CartStore";
import { useRouter} from "next/navigation";

export default function CardProduct({ product }: { product: ProductModel  }) {
    // استفاده از متدهای سبد خرید و دریافت مقادیر آن zustand
     const { AddToCart , cartItems ,removeProduct} = useCartService()
    //  چک کردن آیتم در سبد خرید
     const exists= cartItems.find((item) => item._id === product._id);
    // استفاده از راوتر برای حرکت بین صفحهات  و !!دقت کنید که از نکست/نویگیت اینپورت شده باشه
     const navigate = useRouter();

    return (
      <div
        className={`flex flex-col gap-4 items-center justify-center border rounded-2xl p-2 ${
          product.available ? "border-green-500" : "border-red-500"
        } hover:bg-gray-200/50 cursor-pointer transition-all duration-300 ease-in-out`}
      >
        <h1 className="text-2xl font-bold">{product.name}</h1>
        <p className="text-sm text-gray-500">{product.description}</p>
        <p>Price : {product.price}</p>
        <p>Qyt : {product.qyt}</p>
  
        <div className="flex gap-4">
          {/* اینجا چک میشه که آیتم در سبد خرید موجود هست یا نه و در یو آی چی نمایش بده  */}
          {exists?._id !== product._id ? (
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              // اضافه کردن به سبد خرید
               onClick={() => AddToCart({...product,purchased:1})}
            >
              Add to Cart
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-3 rounded"
                // حذف از سبد خرید
                 onClick={() => removeProduct(product)}
              >
                -
              </button>
              <span className="font-bold">{exists?.purchased || 0}</span>
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-3 rounded"
                 onClick={() => AddToCart({...product,purchased:1})}
                //  اینجا چک میشه که بیشتر از موجودی نتونه سفارش بده
                disabled={exists?.purchased === product.qyt}
              >
                +
              </button>
            </div>
          )}
  
          <button
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            // نمایش صفحه محصول
             onClick={() => navigate.push(`/products/${product._id}`)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M16 8s-3-5-8-5-8 5-8 5 3 5 8 5 8-5 8-5zm-8 4a4 4 0 1 1 0-8 4 4 0 0 1 0 8z" />
              <path d="M8 5a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
            </svg>
          </button>
        </div>
      </div>
    );
  }
  
