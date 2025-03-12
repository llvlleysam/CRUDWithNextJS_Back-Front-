import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import dbConnect from "@/db/db-connect";
import UserModelDB from "@/Models/User";
import GitHub from "next-auth/providers/github";

 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials:{
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },authorize: async (credentials) => {
        if (!credentials) return null;
        try {
          await dbConnect();
          const res = await UserModelDB.findOne({
            username: credentials.username,
            password: credentials.password,
          });
          if (!res) {
            throw new Error("User not found OR Invalid password");
          }
          // بررسی رمز عبور (اگر هش شده باشد باید bcrypt را استفاده کرد)
          // if (user.password !== credentials.password) {
          //   throw new Error("Invalid password");
          // }
          return res
        } catch (error) {
          throw new Error("User not found OR Invalid password")
        }
      }
    }),
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET
    })
  ],
  pages:{
    signIn:"/login"
  }
})