// Importing Router from express
import { Router } from "express";

// Importing register user controller
import {registerUser, login, logoutUser, verifyEmail, refreshAccessToken, forgotPasswordRequest, resetForgotPassword, getCurrentUser, changeCurrentPassword, resendEmailVerification} from "../controllers/auth.controllers.js"

// Importing validate middleware
import {validate} from  "../middlewares/validator.middleware.js"

// Importing validators
import {userRegisterValidator, userLoginValidator, userForgotPasswordValidator, userResetForgotPasswordValidator, userChangeCurrentPasswordValidator} from "../validators/index.js"

// Importing verify JWT
import {verifyJWT} from '../middlewares/auth.middleware.js'

// Creating a router
const router = Router()
// UNSECURE ROUTES
// Creating post route to register user
// 1. Run validation and collect some errors
// 2. Give errors to validate middleware to handle them
// 3. Then pass the errors if present else go to next() i.e. registerUser Route
router.route("/register").post(userRegisterValidator(), validate, registerUser)

// Creating post login route to login user with validation and validator
router.route("/login").post(userRegisterValidator(), validate, login)

// Creating route for verify email using verificationToken
router.route("/verify-email/:verificationToken").get(verifyEmail)

// Creating route for refreshing access token
router.route("/refresh-token").post(refreshAccessToken)

// Creating forgot password route with validator and validation 
router.route("/forgot-password").post(userForgotPasswordValidator(), validate, forgotPasswordRequest)

// Creating post route for reset password using resetToken, validator and validation
router.route("/reset-password/:resetToken").post(userResetForgotPasswordValidator(),  validate, resetForgotPassword)

// SECURE ROUTES
// Logout user with verify JWT middleware
router.route("/logout").post(verifyJWT, logoutUser)
// Creating current user route
router.route("/current-user").post(verifyJWT, getCurrentUser)
// Creating forgot password route with verifyJWT, validator and validation
router.route("/change-password").post(verifyJWT, userChangeCurrentPasswordValidator(), validate, changeCurrentPassword)
// Creating resend email verification route
router.route("/resend-email-verification").post(verifyJWT, resendEmailVerification)



// Exporting Router
export default router