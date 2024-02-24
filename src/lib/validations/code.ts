import { z } from "zod"

export const codeSchema = z.object({
    code: z.string().min(6,"Code should be 6 digits !").max(6)
}).required()

export type CodeSchema = z.infer<typeof codeSchema>