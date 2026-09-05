// Importing api response 
import {ApiResponse} from "../utils/api-response.js"
// Importing Async Handler
import { asyncHandler } from "../utils/async-handler.js"

// Creating a new health check method
// const healthCheck = (req, res) => {
//     // Wrapping into try catch
//     try {
//         res.status(200).json(
//             // Create a new object of our api response class
//             new ApiResponse(200, {message : "Server is Running"})
//         )
//     } catch (error) {
        
//     }
// }

// Creating new healthcheck method with asynchandler
const healthCheck = asyncHandler(async (req, res) => {

})

// Exporting Health Check
export { healthCheck }