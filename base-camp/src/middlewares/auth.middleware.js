// Importing user model
import {User} from "../models/user.models.js"
// Importing Api error class
import {ApiError} from "../utils/api-error.js"
// Importing async error handler class 
import {asyncHandler} from "../utils/async-handler.js"
// Importing jsonwebtoken
import jwt from 'jsonwebtoken'

// Creating method to verify JWT
export const verifyJWT = asyncHandler(async(req, res, next) => {
    // Fetching encrypted accessToken from cookies or authorization header
    // Also replacing the Bearer <token> to only <token> by replace method
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")

    // Throwing error if no token recieved 
    if(!token){
        throw new ApiError(401, "Unauthorized Request")
    }

    // Verifying the token under try catch (try catch for extra safety)
    try {
        // Decoding token 
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        
        // Getting user based on _id from the decoded token
        // Selecting only required field
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken -emailVerificationToken -emailVerificationExpiry")

        // Checking if no user is present
        if (!user){
            throw new ApiError(401, "Token is not valid")
        }

        // Adding user property to the req object
        req.user = user
        // Passing it to next method/middleware
        next()
    // If any error occurs
    } catch (error) {
        throw new ApiError(401, "Unauthorized Request")
    }
})