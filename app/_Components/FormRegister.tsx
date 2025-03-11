"use client";
import { UserModel } from "@/Models/User";
import { useForm } from "react-hook-form";
import {
  RegisterSchemaForm,
  UserSchemaModel,
} from "../_Schema/RegisterSchemaFotm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import NotificationRegister from "./NotificationRegister";

export default function FormRegister() {
  const router = useRouter();
  const [Notification, setNotification] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserSchemaModel>({
    defaultValues: {
      username: "",
      password: "",
      email: "",
      role: "user",
      name: "",
    },
    resolver: zodResolver(RegisterSchemaForm),
  });

  const onSubmit = async (data: UserModel) => {
    try {
      const res = await fetch("/api/user", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        if (res.ok) {
          setNotification(true);
          setTimeout(() => {
            setNotification(false);
            router.push("/login");
            reset();
          }, 2000);
          return res.json();
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-4 flex items-center justify-center w-full h-screen">
      {Notification && <NotificationRegister />}
      <form
        className="flex flex-col gap-2 border rounded-2xl p-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-2xl font-bold">Register</h1>
        <label className="flex flex-col items-start gap-2 relative">
          Username :
          <input
            type="text"
            className="mt-2 text-black pl-2 rounded-md py-1"
            {...register("username")}
          />
          {errors.username && (
            <p className="text-white bg-red-500 rounded-full text-[8px] px-2 py-1 absolute top-7 right-0">
              {errors.username.message}
            </p>
          )}
        </label>
        <label className="flex flex-col items-start gap-2 relative">
          Name :
          <input
            type="text"
            className="mt-2 text-black pl-2 rounded-md py-1"
            {...register("name")}
          />
          {errors.name && (
            <p className="text-white bg-red-500 rounded-full text-[8px] px-2 py-1 absolute top-7 right-0">
              {errors.name.message}
            </p>
          )}
        </label>
        <label className="flex flex-col items-start gap-2 relative">
          password :
          <input
            type="password"
            className="my-2 text-black pl-2 rounded-md py-1"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-white bg-red-500 rounded-full text-[8px] px-2 py-1 absolute top-7 right-0">
              {errors.password.message}
            </p>
          )}
        </label>
        <label className="flex flex-col items-start gap-2 relative">
          Email :
          <input
            type="email"
            className="my-2 text-black pl-2 rounded-md py-1"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-white bg-red-500 rounded-full text-[8px] px-2 py-1 absolute top-7 right-0">
              {errors.email.message}
            </p>
          )}
        </label>
        <input type="hidden" {...register("role")} value="user" />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
