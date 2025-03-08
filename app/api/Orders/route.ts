import dbConnect from "@/db/db-connect";
import OrderModelDB, { OrderModel } from "@/Models/Order";
import { ShippingModel } from "@/Models/Shipping";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
      // متد برای متصل کردن به دیتا بیس
      await dbConnect();
      const body = await req.json();
      // اضافه کردن سفارش
      const newOrder = new OrderModelDB(body);
      // ذخیره سفارش
      await newOrder.save();
      // پاسخ
      return NextResponse.json({ status: 201, message: "Order added" });
    } catch (error) {
      return NextResponse.json({ status: 500, message: "Request failed" });
    }
  }