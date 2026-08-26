// Importing token validation method
import {validateUserToken} from '../utils/token.js'

// Creating JS Doc for req, res and next
/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */

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

// Creating JS Doc for req, res and next
/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */

// Creating a middleware to check user is always authenticated
export function ensureAuthenticated(req, res, next) {
    if (!req.user || !req.user.id) {
        return res
            .status(401)
            .json({error: `You must be logged in to access this resource`})
    }
    next()
}