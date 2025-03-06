import { ProductModel } from "./Product";

// مدل سبد خرید استفاده شده در سبد خرید zustand
export interface OrderModel extends ProductModel {
    purchased : number
}