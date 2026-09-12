// Importing body from express to fetch data from body of request 
import {body} from "express-validator"

// Creating new method for user register validation 
const userRegisterValidator = () => {
    return [
        // Email validation
        body("email")
            // Trim email
            .trim() 

            // Check if email is not empty and return message
            .notEmpty()
            .withMessage("Email is required")
            
            // Checking if email is a proper email
            .isEmail()
            .withMessage("Email is invalid"),
            
            // Username Validation
            body("username")
            // Trim username
            .trim()

            // should not be empty with message
            .notEmpty()
            .withMessage("Usernam is required")
            
            // username should be lowercase with message
            .isLowercase()
            .withMessage("Usernam must be in lowercase")
            
            // Should be minimum of 3 length
            .isLength({min: 3})
            .withMessage("Username must be must be at least 3 characters"),

        // Password field validation
        body("password")
            .trim()
            .notEmpty()
            .withMessage("Password should not be empty"),
        
        // Full Name validation
        body("fullName")
            .optional().trim() 
        ]       
}

// Creating new method for user login validation 
const userLoginValidator = () => {
    // Returns an array
    return [
        // Email Validation
        body("email")
            .optional()
            .isEmail()
            .withMessage("Email is invalid"),
    ]
}

// Exporting method
export {
    userRegisterValidator
}