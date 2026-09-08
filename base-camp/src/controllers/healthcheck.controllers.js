// Importing api response 
import {ApiResponse} from "../utils/api-response.js"
// Importing Async Handler
import { asyncHandler } from "../utils/async-handler.js"

// Creating new healthcheck method with asynchandler
const healthCheck = asyncHandler(async (req, res) => {
    res.status(200).json(
        new ApiResponse(200, {message: "Server is Running"})
    )
})

// Exporting Health Check
export { healthCheck }