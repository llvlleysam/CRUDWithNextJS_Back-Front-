import { z } from "zod";

export const OrderSchemaForm = z.object({
    name: z.string().min(3).max(50),
    country : z.string().min(3).max(100),
    city : z.string().min(3).max(50),
    address: z.string().min(3).max(200),
    postalCode: z.string().min(3).max(50),
});

export type OrdersSchemaModel = z.infer<typeof OrderSchemaForm>;