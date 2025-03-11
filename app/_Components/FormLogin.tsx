"use client";
import { UserModel } from "@/Models/User";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const loginSchema = z.object({
  username: z.string().min(3).max(50),
  password: z.string().min(3).max(50),
});

export default function FormLogin() {
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: UserModel) => {
    setErrorMessage("");
    
    const res = await signIn("credentials", {
      username: data.username,
      password: data.password,
      redirect: false,
    });
    if (res?.error) {
      setErrorMessage("User not found OR Invalid password");
    } else {
      reset();
       router.push("/products"); 
       localStorage.setItem("isLogin", true.toString());
    }
  };
  return (
    <div className="p-4 flex items-center justify-center w-full h-screen">
      <form
        className="flex flex-col gap-2 border rounded-2xl p-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-2xl font-bold">Login</h1>
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
        {errorMessage && <span className="text-red-500 text-[12px]">{errorMessage}</span>}
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
}
