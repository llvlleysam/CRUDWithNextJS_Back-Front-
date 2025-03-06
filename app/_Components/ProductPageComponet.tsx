"use client"

import { ProductModel } from "@/Models/Product";
import useCartService from "@/Store/CartStore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ModalDelete from "./ModalDelete";

// صفحه نمایش تکی محصول
export default function ProductPageComponent({product}:{product:ProductModel}) {
    // باین هوک میتونیم بین صفحهات جابجا بشیم
     const navigate = useRouter();
    //  هوک سبد خرید
     const { AddToCart, removeProduct, cartItems } =useCartService()
    //  چک کردن آیتم در سبد خرید
    const exists = cartItems.find((item) => item._id === product?._id);
    // استیت برای نمایش مودال حذف
     const [DelModal, setDelModal] = useState(false);
  
    // if (isLoading) {
    //   return <div>Loading...</div>;
    // }
  
    return (
      <div className="text-3xl my-8">
        <div
          className={`flex flex-col gap-4 items-center justify-center border rounded-2xl p-2 ${
            product?.available ? "border-green-500" : "border-red-500"
          } hover:bg-gray-200/50 cursor-pointer transition-all duration-300 ease-in-out`}
        >
          {/* اینجا چک میشه که اگر دکمه حذف را زدین مدال دیلیت تو یوآی نمایش بده در غیر این صورت خود کامپوننت کارت */}
          {DelModal ? (
            <ModalDelete
              setDelModal={(bol: boolean) => setDelModal(bol)}
              id={product?._id}
            />
          ) : (
            <>
              <h1 className="text-2xl font-bold">{product?.name}</h1>
              <p className="text-sm text-gray-500">{product?.description}</p>
              <p>Price : {product?.price}</p>
              <p>Qyt : {product?.qyt}</p>
  
              <div className="flex gap-4">
                <div className="flex gap-4">
                  {/* اینجا چک میشه که آیتم در سبد خرید موجود هست یا نه و در یو آی چی نمایش بده  */}
                  {exists?._id !== product?._id ? (
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => AddToCart({...product,purchased:1})}
                    >
                      Add to Cart
                    </button>
                  ) : (
                    <div className="flex items-center gap-2">
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-3 rounded"
                        onClick={() => removeProduct(product)}
                      >
                        -
                      </button>
                      <span className="font-bold">{exists?.purchased || 0}</span>
                      <button
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-3 rounded"
                        onClick={() => AddToCart({...product,purchased:1})}
                        disabled={exists?.purchased === product?.qyt}
                      >
                        +
                      </button>
                    </div>
                  )}
                </div>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4 cursor-pointer"
                  // دکمه حذف
                  onClick={() => setDelModal(true)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="white"
                  >
                    <path d="M3 6h18v2H3V6zm2 2h14l-1.5 14H6.5L5 8zm4 2v10h2V10H9zm4 0v10h2V10h-2zm-3-5V3h4v2h5v2H4V5h5z" />
                  </svg>
                </button>
                <button
                  className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded mt-4 cursor-pointer"
                  // دکمه ویرایش و رفتن به صفحه ویرایش
                  onClick={() => navigate.push(`/edit/${product?._id}`)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                    />
                  </svg>
                </button>
              </div>
            </>)}
          
        </div>
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4 cursor-pointer"
          // دکمه بازگشت
          onClick={() => navigate.back()}
        >
          back
        </button>
      </div>
    );
  }
  