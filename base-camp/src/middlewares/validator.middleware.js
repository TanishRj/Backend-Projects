// Importing validation result using express
import {validationResult} from "express-validator"
// Importing api error class
import { ApiError } from "../utils/api-error.js"

// Writing validate method to validate request
export const validate = (req, res, next) => {
    const errors = validationResult(req)
    if(errors.isEmpty()){
        return next()
    }
}