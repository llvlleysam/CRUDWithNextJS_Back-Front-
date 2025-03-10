import dbConnect from "@/db/db-connect";
import UserModelDB from "@/Models/User";
import { NextResponse } from "next/server";
// import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const data = await req.json();
    const newUser = new UserModelDB(data);
    await newUser.save();
    return NextResponse.json({ status: 201, message: "User added" });
  } catch (error) {
    return NextResponse.json({ status: 500, message: "Request failed" });
  }
}

// برای هش کردن پسورد
// export async function POST(req: Request) {
//   try {
//     await dbConnect();
//     const data = await req.json();

//     // هش کردن رمز عبور قبل از ذخیره
//     const hashedPassword = await bcrypt.hash(data.password, 10);

//     const newUser = new UserModelDB({
//       ...data,
//       password: hashedPassword,
//     });

//     await newUser.save();
//     return NextResponse.json({ status: 201, message: "User added" });

//   } catch (error) {
//     return NextResponse.json({ status: 500, message: "Request failed" });
//   }
// }
