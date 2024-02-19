import { z } from "zod"

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(7,"Password should contain at least 7 characters"),
    terms: z.boolean().default(false)
}).required()

export type LoginSchema = z.infer<typeof loginSchema>