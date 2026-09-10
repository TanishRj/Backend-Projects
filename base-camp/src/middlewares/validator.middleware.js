// Importing validation result using express
import {validationResult} from "express-validator"
// Importing api error class
import { ApiError } from "../utils/api-error.js"

// Writing validate method to validate request
export const validate = (req, res, next) => {
    // If we don't have any error, return next method
    const errors = validationResult(req)
    if(errors.isEmpty()){
        return next()
    }

    // If we have error, pass it 
    const extractedErrors = []
    // Converting it to array, mapping (calling) each element in the array and pushing it to extractedErrors array
    errors.array().map((err) => extractedErrors.push(
        {
            [err.path]: err.msg
        }))
        // New api response object with errors recieved
        throw new ApiError(422, "Recieved data is not valid", extractedErrors)
}