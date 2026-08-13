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