// Importing Router from express
import { Router } from "express";

// Importing register user controller
import {registerUser} from "../controllers/auth.controllers.js"

// Importing validate middleware
import {validate} from  "../middlewares/validator.middleware.js"

// Importing validation
import {userRegisterValidator} from "../validators/index.js"

// Creating a router
const router = Router()

// Creating post route to register user
// 1. Run validation and collect some errors
// 2. Give errors to validate middleware to handle them
// 3. Then pass the errors if present else go to next() i.e. registerUser Route
router.route("/register").post(userRegisterValidator(), validate, registerUser)

// Exporting Router
export default router