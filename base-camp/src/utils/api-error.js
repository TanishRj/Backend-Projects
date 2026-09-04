// Creating a custom error class extended from node error class
class ApiError extends Error {
    constructor(
        statusCode,
        message = "Something Went Wrong",
        errors = [],
        
    ){}
}