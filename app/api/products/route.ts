import { NextResponse } from "next/server";
import dbConnect from "@/db/db-connect";
import ProductModelDB from "@/Models/Product";
import { revalidatePath } from "next/cache";

// متد برای اضافه کردن محصول
export async function POST(req: Request) {
  try {
    // متد برای متصل کردن به دیتا بیس
    await dbConnect();
    // دریافت داده ها
    const body = await req.json();
    // اضافه کردن محصول
    const newProduct = new ProductModelDB(body);
    // ذخیره محصول
    await newProduct.save();
    // بروزرسانی صفحه
    revalidatePath("/products");
    // پاسخ
    return NextResponse.json({ status: 201, message: "Product added" });
  } catch (error) {
    return NextResponse.json({ status: 500, message: "Request failed" });
  }
}


// export async function DELETE(req: Request, { searchParams }: { searchParams: { _id?: string } }) {
//   const { _id } = await searchParams;
//   const id = _id || "";
//   // console.log(params);
//   try {
//     await dbConnect();

//     if (!id) {
//       return NextResponse.json({ status: 400, message: "Product ID is required" });
//     }

//     const deletedProduct = await ProductModelDB.findOneAndDelete(id);
//     if (!deletedProduct) {
//       return NextResponse.json({ status: 404, message: "Product not found" });
//     }

//     return NextResponse.json({ status: 200, message: "Product deleted successfully" });

//   } catch (error) {
//     console.error("Delete Error:", error);
//     return NextResponse.json({ status: 500, message: "Request failed" });
//   }
// }

// متد برای حذف کردن محصول
export async function DELETE (req : Request){
  try{
    // متد برای متصل کردن به دیتا بیس
    await dbConnect();
    // دریافت داده ها
    const _id = await req.json();
    // حذف محصول
    await ProductModelDB.findOneAndDelete({_id})
    // بروزرسانی صفحه
    revalidatePath("/products")
    // پاسخ
    return NextResponse.json({ status: 200, message: "Product delete" });
  }catch (error) {
    return NextResponse.json({ status: 500, message: "Request failed" });
  }
}

// متد برای ویرایش محصول
export async function PUT(req: Request) {
  try {
    // متد برای متصل کردن به دیتا بیس
    await dbConnect();
    // دریافت داده ها
    const body = await req.json();
    // ویرایش محصول
    const _id = body._id;
    // ذخیره محصول
    const updatedProduct = await ProductModelDB.findOneAndUpdate({ _id }, body, { new: true });
    // بروزرسانی صفحه
    revalidatePath("/products");
    // پاسخ
    if (!updatedProduct) {
      return NextResponse.json({ status: 404, message: "Product not found" });
    }
    return NextResponse.json({ status: 200, message: "Product updated successfully" });
  } catch (error) {
    return NextResponse.json({ status: 500, message: "Request failed" });
  }
}