import mongoose from "mongoose";
import { ProductModel } from "./Product";

// مدل سبد خرید استفاده شده در سبد خرید zustand
export interface OrderModel extends ProductModel {
  purchased: number;
}

const OrdersSchema = new mongoose.Schema({
  cartItems: [
    {
      name: { type: String, required: true },
      description: { type: String, required: true },
      qyt: { type: Number, required: true },
      price: { type: Number, required: true },
      available: { type: Boolean, required: true },
      purchased: { type: Number, required: true },
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
    },
  ],
  shippingAddress: {
    name: { type: String },
    country: { type: String },
    city: { type: String },
    address: { type: String },
    postalCode: { type: String },
  },
  totalPrice: { type: Number, required: true },
  totalCount: { type: Number, required: true },
  isDelivered: { type: Boolean, default: false },
},{
  timestamps: true
});

const OrderModelDB =
  mongoose.models.Order || mongoose.model("Order", OrdersSchema);
export default OrderModelDB;
