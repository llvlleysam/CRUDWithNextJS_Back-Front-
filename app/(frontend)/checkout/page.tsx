"use client";
import CartTable from "@/app/_Components/CartTable";
import NotificationOrder from "@/app/_Components/NotificationOrder";
import ShippingAddressTable from "@/app/_Components/ShippingAddressTable";
import { useState } from "react";
export default function CheckoutPage() {
  const [NotifyOrder, setNotifyOrder] = useState(false);
  return (
    <div>
      {NotifyOrder ? (
        <NotificationOrder />
      ) : (
        <div>
          <div>Checkout Page</div>
          <ShippingAddressTable />
          <CartTable setNotification={(bol) => setNotifyOrder(bol)}/>
        </div>
      )}
    </div>
  );
}
