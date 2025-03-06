import mongoose from "mongoose";

// مدل محصول
export interface ProductModel {
  // دلیل اندرلاین ای دی این است که منوگودیبی خودش ای دی ایندکس میکنه و یک اندرلاین میذاره قبلش
  _id?: number | string;
  name: string;
  description: string;
  qyt: number;
  price: number;
  available: boolean;
}

// ساخت مدل اسکیما برای پکیج مونگوز برای ارتباط با دیتا بیس
const productsSchema = new mongoose.Schema(
  {
    // تعریف فیلد های دیتابیس احتیاج دارد
    name: { type: String, required: true, default: "Product Name" },
    description: { type: String, required: true, default: "description..." },
    qyt: { type: Number, required: true, default: 0 },
    price: { type: Number, required: true, default: 0 },
    available: { type: Boolean, required: true, default: true },
  },
  // با این کد میتوانیم تاریخ زمان ایجاد و ویرایش را در دیتابیس ذخیره کنیم
  { timestamps: true }
);

// جلوگیری از مقداردهی دوباره مدل
const ProductModelDB =
// به اسم داخل دبل کتیشن دقت کنید دقیقا همین باشه
mongoose.models.Product || mongoose.model("Product", productsSchema);
export default ProductModelDB;
