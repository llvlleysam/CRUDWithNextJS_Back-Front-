"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { productForm, ProductsSchemaModel } from "../_Schema/ProductSchemaForm";
import { ProductModel } from "@/Models/Product";
import { useRouter } from "next/navigation";
import Notification from "./Notification";
import NotificationEdit from "./NotificationEidt";

// تایپ پراپس در کامپوننت
type props = { editMode?: boolean; editProduct?: ProductModel };

export default function FormComponent({
  editMode = false,
  editProduct,
}: props) {
  // نوتیف اضافه کردن محصول
  const [notification, setNotification] = useState(false);
  const navigate = useRouter();

  //  هوک فرم و تنظیمات و مقادیر پیش فرض
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<ProductsSchemaModel>({
    defaultValues: {
      name: "",
      description: "",
      qyt: 0,
      price: 0,
      available: false,
    },
    resolver: zodResolver(productForm),
  });

  //----edit
  // نوتیف ویرایش محصول
  const [notificationEdit, setNotificationEdit] = useState(false);
  // اگر ویرایش باشد اینپوت های فرم را با مقادیری که از پراپس کامپوننت دریافت کرده است تنظیم می کند
  if (editMode) {
    // چک آیا ویرایش باشد
    if (editProduct) {
      setValue("name", editProduct.name);
      setValue("description", editProduct.description);
      setValue("qyt", editProduct.qyt);
      setValue("price", editProduct.price);
      setValue("available", editProduct.available);
    }
  }

  //----submit
  const onSubmit: SubmitHandler<ProductsSchemaModel> = async (data) => {
    // چک میشه که اگر درحالت ویرایش نبودیم دکمه ثابمیت فرم محصول ادد بکند
    if (!editMode) {
      //----add

      try {
        // نکته خیلی مهم !!!!!!!!!! ما فقط میتونیم از خود فچ نکست زمانی استفاده کنیم که صفحه یوزکلاینت باشه مثل اینجا و این ای پی ای در داخل فولدر ای پی ای نوشته شده و اینجا استفاده شده
        const res = await fetch("/api/products", {
          method: "POST",
          body: JSON.stringify(data),
          headers: { "Content-Type": "application/json" },
        });
        // اگر درخواست با موفقیت انجام شد
        if (res.ok) {
          // مقادیر فرم خالی میشه
          reset();
          // نوتیفیکیشن فعال میشه
          setNotification(true);
          setTimeout(() => {
            // بعد از 2 ثانیه به صفحه محصولات برویم
            navigate.push("/products");
            // نوتیفیکیشن خاموش میشه
            setNotification(false);
          }, 2000);
        }
      } catch (error) {
        console.error("Error adding product:", error);
      }
    } else {
      //----edit
      // اگر ویرایش باشد
      if (editProduct) {
        try {
          // نکته خیلی مهم !!!!!!!!!! ما فقط میتونیم از خود فچ نکست زمانی استفاده کنیم که صفحه یوزکلاینت باشه مثل اینجا و این ای پی ای در داخل فولدر ای پی ای نوشته شده و اینجا استفاده شده
          const res = await fetch(`/api/products`, {
            method: "PUT",
            body: JSON.stringify({ ...data, _id: editProduct._id }),
            headers: { "Content-Type": "application/json" },
          });

          if (res.ok) {
            reset();
            setNotificationEdit(true);
            setTimeout(() => {
              navigate.push("/products");
              setNotificationEdit(false);
            }, 2000);
          }
        } catch (error) {
          console.error("Error adding product:", error);
        }
      }
    }
  };

  return (
    <div className="flex justify-center ">
      {/* نوتیفیکیشن */}
      {notificationEdit && <NotificationEdit />}
      {notification && <Notification />}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 border rounded-2xl p-4 max-w-96 items-center justify-center "
      >
        <label className="flex flex-col items-start gap-2 relative">
          Name :
          <input
            type="text"
            className="border rounded-2xl bg-white/20 pl-4"
            // مقادیر که در فرم وارد شده
            {...register("name")}
          />
          {/* جای که ارور نمایش داده میشود */}
          {errors.name && (
            <span className="text-white bg-red-500 rounded-full text-[8px] px-2 py-1 absolute top-4 right-0">
              {errors.name.message}
            </span>
          )}
        </label>
        <label className="flex flex-col items-start gap-2 relative">
          Description :
          <textarea
            rows={4}
            className="border w-full rounded-2xl bg-white/20 pl-4"
            {...register("description")}
          />
          {errors.description && (
            <span className="text-white bg-red-500 rounded-full text-[8px] px-2 py-1 absolute top-4 right-0">
              {errors.description.message}
            </span>
          )}
        </label>
        <label className="flex flex-col items-start gap-2 relative">
          Qyt :
          <input
            type="number"
            className="border rounded-2xl bg-white/20 pl-4"
            {...register("qyt")}
          />
          {errors.qyt && (
            <span className="text-white bg-red-500 rounded-full text-[8px] px-2 py-1 absolute top-4 right-0">
              {errors.qyt.message}
            </span>
          )}
        </label>
        <label className="flex flex-col items-start gap-2 relative">
          Price :
          <input
            type="number"
            className="border rounded-2xl bg-white/20 pl-4"
            {...register("price")}
          />
          {errors.price && (
            <span className="text-white bg-red-500 rounded-full text-[8px] px-2 py-1 absolute top-4 right-0">
              {errors.price.message}
            </span>
          )}
        </label>
        <label className="flex  justify-center items-center gap-3">
          Available :
          <input
            type="checkbox"
            className="border rounded-2xl bg-white/20"
            {...register("available")}
          />
        </label>
        <button
          className={`${
            editMode
              ? "bg-orange-500 hover:bg-orange-700"
              : "bg-green-500 hover:bg-green-700"
          } text-white font-bold py-2 px-4 rounded cursor-pointer`}
        >
          {editMode ? "Edit Product" : "Add Product"}
        </button>
        {editMode && (
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 cursor-pointer"
            onClick={() => navigate.back()}
          >
            Back
          </button>
        )}
      </form>
    </div>
  );
}
