import { z } from "zod";
// استفاده از zod برای اعتبار سنجی
export const productForm = z.object({
  name: z.string().min(3).max(50),
  description: z.string().min(3).max(100),
  price: z.coerce.number().min(1).max(10000),
  qyt: z.coerce.number().min(1).max(1000),
  available: z.boolean(),
});
// تایپ مدل فرم
export type ProductsSchemaModel = z.infer<typeof productForm>;
