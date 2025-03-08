"use client"
import useCartService from "@/Store/CartStore"
import { useRouter } from "next/navigation";

export default function ShippingAddressTable() {
  const {shippingAddress} = useCartService()
  const navigate = useRouter();
   if (!shippingAddress) return <div>Shipping Address Not Found</div>;
  return (
    <div className="p-4 flex flex-col justify-center border rounded-2xl">
      <h1 className="text-2xl font-bold bg-white/30 p-2 rounded-2xl animate-pulse mb-2 text-center">Shipping Address</h1>
      <p>Name: {shippingAddress.name}</p>
      <p>Country: {shippingAddress.country}</p>
      <p>City: {shippingAddress.city}</p>
      <p>Address: {shippingAddress.address}</p>
      <p>PostalCode: {shippingAddress.postalCode}</p>
      <button onClick={() => navigate.push("/shipping")} className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">Edit</button>
    </div>
  )
}
