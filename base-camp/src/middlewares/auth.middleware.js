// Importing user model
import {User} from "../models/user.models.js"
// Importing Api error class
import {ApiError} from "../utils/api-error.js"
// Importing async error handler class 
import {asyncHandler} from "../utils/async-handler.js"

// Creating method to verify JWT
export const verifyJWT = asyncHandler(async(req, res, next) => {
    // Fetching encrypted accessToken from cookies or authorization header
    // Also replacing the Bearer <token> to only <token> by replace method
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")

    
    if(!token){
        throw new ApiError(401, "Unauthorized Request")
    }
})