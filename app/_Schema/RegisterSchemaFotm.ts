import { z } from "zod";
// استفاده از zod برای اعتبار سنجی
export const RegisterSchemaForm = z.object({
    username: z.string().min(3).max(50),
    email: z.string().email(),
    password: z.string().min(3).max(50),
    name: z.string().min(3).max(50),
    role: z.enum(["admin", "user"]),
})
// تایپ مدل فرم
export type UserSchemaModel = z.infer<typeof RegisterSchemaForm>