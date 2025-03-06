import mongoose from "mongoose";

// متد برای متصل کردن به دیتا بیس
export default async function dbConnect() {
    try {
        // فایل تنظیمات را بارگذاری میکنیم واقع در env.local میباشد
        await mongoose.connect(process.env.MONGODB_URI!);
    } catch (error) {
        console.log(error);
    }
}