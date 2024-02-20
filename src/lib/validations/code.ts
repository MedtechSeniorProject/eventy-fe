import { z } from "zod"

export const codeSchema = z.object({
    code: z.number().min(7,"Code should be at least 6 digits !")

}).required()

export type CodeSchema = z.infer<typeof codeSchema>