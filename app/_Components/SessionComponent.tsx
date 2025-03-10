"use client"

import { useRouter } from "next/navigation";

export default function SessionComponent() {
    const router = useRouter();
    return (
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-2xl font-bold">You are not logged in</h1>
          <p className="text-sm">Please login to see the products</p>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4" onClick={() => router.push("/login")}>Login</button>
        </div>
      );
}
