// Importing jwt 
import jwt from 'jsonwebtoken';
// Importing zod validation of token
import {userTokenSchema} from '../validation/token.validation.js'

// Storing our secret value in JWT_SECRET variable
const JWT_SECRET = process.env.JWT_SECRET

// Creating and exporting a function which creates user token
export async function createUserToken(payload){
    // Checking validation
    const validationResult = await userTokenSchema.safeParseAsync(payload)
    // if any error occurs, it throws a new error
    if(validationResult.error) throw new Error(validationResult.error.message)
    // If payload is valid
    const payloadValidatedData = validationResult.data
    const token = jwt.sign(payloadValidatedData, JWT_SECRET)
    return token
}

// Creating and exporting a Token verification function
export function validateUserToken(token){
    // Verifying under try catch block
    try {
        const payload = jwt.verify(token, JWT_SECRET)
        return payload
    // Returning null if error found
    } catch (error) {
        return null
    }
}