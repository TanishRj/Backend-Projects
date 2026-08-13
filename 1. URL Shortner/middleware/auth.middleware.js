// Importing token validation method
import {validateUserToken} from '../utils/token.js'

// Creating JS Doc for req, res and next
/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */

const { error } = require("node:console")

// Creating and exporting Middleware
export function authenticationMiddleware(req, res, next){
    // Getting authorization header
    const authHeader = req.headers['authorization']

    // If no authorization header found, return next middleware
    if (!authHeader) return next()

    // If auth header does not starts with bearer
    if(!authHeader.startsWith('Bearer')) 
        return res.status(400).json({error: `Authorization header must start with Bearer`})

    // Splitting Bearer and Token
    const [_, token] = authHeader.split(' ')

    // Checking token using imported verification method
    const payload = validateUserToken(token)

    // Creating a new property on user request which is payload
    req.user = payload

    // Returning next function
    next()
}