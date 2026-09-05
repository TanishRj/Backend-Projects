// Creating an async handler function accepts another function in requestHandler
// It is also known as higher order function which means whole function is passed
const asyncHandler = (requestHandler) => {
    // req, res and next is returned by express 
    return (req, res, next) => {
        // Resolve the function if possible using promise
        Promise
        .resolve(requestHandler(req, res, next))
        // Catch error and pass the error to express error handler
        .catch((err) => next(err))
    }
}

export default { asyncHandler }