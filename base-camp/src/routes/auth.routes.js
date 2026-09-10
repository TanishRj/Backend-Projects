// Importing Router from express
import { Router } from "express";

// Importing register user controller
import {registerUser} from "../controllers/auth.controllers.js"

// Creating a router
const router = Router()

// Creating post route to register user
router.route("/register").post(registerUser)

// Exporting Router
export default router