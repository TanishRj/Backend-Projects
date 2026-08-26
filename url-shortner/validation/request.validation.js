// Importing z to create a schema for user validation
import { email, z } from 'zod'

// exporting user validation schema 
export const signupPostRequestBodySchema = z.object({
    // Expectations from the request body
    firstname: z.string(),
    lastname: z.string().optional(),
    email: z.string().email(),
    password: z.string().min(3),
})

export const loginPostRequestBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(3),
})

export const shortenPostRequestBodySchema = z.object({
    url: z.string().url(),
    code: z.string().optional()
})