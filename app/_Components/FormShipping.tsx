"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { OrderSchemaForm, OrdersSchemaModel } from "../_Schema/OrderSchemaForm";
import { ShippingModel } from "@/Models/Shipping";
import useCartService from "@/Store/CartStore";

export default function FormShipping() {
    const navigate = useRouter();
    const {setShippingAddress , shippingAddress} = useCartService()

    const initialValues = {
      name: "",
      country: "",
      city: "",
      address: "",
      postalCode: "",
    }
    const { register, handleSubmit, formState: { errors } ,setValue} = useForm<OrdersSchemaModel>({
      defaultValues: initialValues,
      resolver: zodResolver(OrderSchemaForm),
        });

        if (shippingAddress) {
            setValue("name", shippingAddress.name);
            setValue("country", shippingAddress.country);
            setValue("city", shippingAddress.city);
            setValue("address", shippingAddress.address);
            setValue("postalCode", shippingAddress.postalCode);
        }

    const onSubmit = (data: ShippingModel) => {
        setShippingAddress(data)
        navigate.push("/checkout")}
  return (
    <div className="flex justify-center ">
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
              Address :
              <textarea
                rows={4}
                className="border w-full rounded-2xl bg-white/20 pl-4"
                {...register("address")}
              />
              {errors.address && (
                <span className="text-white bg-red-500 rounded-full text-[8px] px-2 py-1 absolute top-4 right-0">
                  {errors.address.message}
                </span>
              )}
            </label>
            <label className="flex flex-col items-start gap-2 relative">
              city :
              <input
                type="text"
                className="border rounded-2xl bg-white/20 pl-4"
                {...register("city")}
              />
              {errors.city && (
                <span className="text-white bg-red-500 rounded-full text-[8px] px-2 py-1 absolute top-4 right-0">
                  {errors.city.message}
                </span>
              )}
            </label>
            <label className="flex flex-col items-start gap-2 relative">
              country :
              <input
                type="text"
                className="border rounded-2xl bg-white/20 pl-4"
                {...register("country")}
              />
              {errors.country && (
                <span className="text-white bg-red-500 rounded-full text-[8px] px-2 py-1 absolute top-4 right-0">
                  {errors.country.message}
                </span>
              )}
            </label>
            <label className="flex flex-col items-start gap-2 relative">
              postalCode :
              <input
                type="text"
                className="border rounded-2xl bg-white/20"
                {...register("postalCode")}
              />
              {errors.postalCode && (
                <span className="text-white bg-red-500 rounded-full text-[8px] px-2 py-1 absolute top-4 right-0">
                  {errors.postalCode.message}
                </span>
              )}
            </label>
            <button
              type="submit"
              className={`bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded cursor-pointer`}
            >
              CheckOut
            </button>
            
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 cursor-pointer"
                onClick={() => navigate.back()}
              >
                Back
              </button>
            
          </form>
        </div>
  )
}
