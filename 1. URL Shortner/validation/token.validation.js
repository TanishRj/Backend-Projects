// Importing z
import { z } from "zod";

// Exporting user token schema 
export const userTokenSchema = z.object({
    id: z.string()
})