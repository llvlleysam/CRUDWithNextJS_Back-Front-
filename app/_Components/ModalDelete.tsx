"use client";

import {useState } from "react";
import NotificationDel from "./NotificationDel";
import { useRouter } from "next/navigation";

export default function ModalDelete({
  setDelModal,
  id,
}: {
  setDelModal: (bol: boolean) => void;
  id: number | string | undefined;
}) {
  // نوتیفیکیشن مدال حذف
  const [notifyModal, setNotifyModal] = useState(false);
  const navigate = useRouter();
  
  // اگر دکمه حذف کلیک شود
  async function handleDelete(_id:number | string | undefined) {
    try {
      // نکته خیلی مهم !!!!!!!!!! ما فقط میتونیم از خود فچ نکست زمانی استفاده کنیم که صفحه یوزکلاینت باشه مثل اینجا و این ای پی ای در داخل فولدر ای پی ای نوشته شده و اینجا استفاده شده
      const res = await fetch(`/api/products`, {
        method: "DELETE",
        body: JSON.stringify(_id),
        headers: { "Content-Type": "application/json" },
      });
       if (res.ok) {
         setNotifyModal(true);
         setTimeout(() => {
             setNotifyModal(false);
             setDelModal(false);
             navigate.push("/products");
           }, 2000);
         }
      
      } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      {notifyModal && <NotificationDel />}
      <div className="w-full min-h-96 flex flex-col gap-4 items-center justify-center bg-black/50">
        <h1>Do you want to delete?</h1>
        <div className="flex gap-4">
          <button
            className="bg-red-500 hover:bg-red-700 py-2 px-4 rounded-2xl cursor-pointer"
            onClick={() => handleDelete(id)}
          >
            yes
          </button>
          <button
            className="bg-green-500 hover:bg-green-700 py-2 px-4 rounded-2xl cursor-pointer"
            onClick={() => setDelModal(false)}
          >
            no
          </button>
        </div>
      </div>
    </>
  );
}
