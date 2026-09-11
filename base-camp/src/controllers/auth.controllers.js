// Importing user model from db
import { User } from "../models/user.models.js"
// Importing api response 
import {ApiResponse} from "../utils/api-response.js"
// Importing api error 
import {ApiError} from "../utils/api-error.js"
// Importing Async Handler
import { asyncHandler } from "../utils/async-handler.js"
// Importing send email method
import {emailVerificationMailgenContent, sendEmail} from "../utils/mail.js"

// Generating access and refresh tokens using _id stored in db
const generateAccessAndRefreshTokens = async(userId) => {
    try {
        // Finding user by id and storing it in new user variable
        // user variable will give access to generate access and refresh token methods with db schema
        // 'User' cannot be used to access the token generation methods
        const user = await User.findById(userId)
        // Generating tokens
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        // Storing refresh token
        user.refreshToken = refreshToken
        // Saving refresh token with no validation required
        await user.save({validateBeforeSave: false})
        
        // Getting our access and refresh tokens
        return {accessToken, refreshToken}
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating access token")
    }
}

// Creating register user async method
const registerUser = asyncHandler(async (req, res) => {
    // Accepting data from frontend
    const {email, username, password, role} = req.body

    // Checking if user in db already exists
    const existedUser = await User.findOne({
        // Checking either by email or username
        $or : [{username}, {email}]
    })

    // If users exists, send a new api error object
    if(existedUser){
        throw new ApiError(409, "User with email or username already exists", [])
    }

    // If user doesn't exists, storing it in db and variable named user
    // Now the user variable has userSchema
    const user = await User.create({
        email,
        password,
        username,
        isEmailVerified: false
    })

    // generating (email) temporary token by accessing the method of generate temporary token
    const {unHashedToken, hashedToken, tokenExpiry} = user.generateTemporaryToken()

    // Storing email verification token and expiry in db
    user.emailVerificationToken = hashedToken
    user.emailVerificationExpiry = tokenExpiry

    // Saving user without validation
    await user.save({validateBeforeSave: false})

    // Sending email using send email method
    await sendEmail({
        // Getting email from user using userSchema
        email: user?.email,
        subject: "Please verify your email",
        // Generating mail gen content using method of email template we created
        mailgenContent:  emailVerificationMailgenContent(
            // Getting username from user
            user.username,
            // Creating verificaiton url route with unhashed token
            `${req.protocol}://${req.get("host")}/api/v1/users/verify-email/${unHashedToken}`
        )
    })

    // Sending response to user and removing fields which are not required
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken -emailVerificationToken -emailVerificationExpiry"
    )

    // If no new user created, throw a new api error object
    if(!createdUser){
        throw new ApiError(
            500,
            "Something went wrong while registering a user"
        )
    }

    // Sending response 
    return res
        .status(201)
        .json(
            new ApiResponse(
                200,
                {user: createdUser},
                "User registered Successfully and verification email has been sent on your email"
            )
        )
})

// Creating login using async method handled by asyncHandler
const login = asyncHandler(async (req, res) => {
    // Request email, username and password from request body
    const {email, password, username} = req.body

    if
})

// Exporting register user 
export {
    registerUser,
    login
}