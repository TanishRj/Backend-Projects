// Creating a custom error class extended from node error class
class ApiError extends Error {
    constructor(
        statusCode,
        message = "Something Went Wrong",
        errors = [],
        stack = ""
    ){
        super(message)
        this.statusCode = statusCode
        this.data = null
        this.message = message
        this.success = false
        this.errors = errors
        // If stack trace is thrown by our error
        if(stack){
            this.stack = stack
        }
        // Else give the Main error class stack trace to our constructor
        else {
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

// Exporting Api error class
export {ApiError}