// Importing Router from express
import { Router } from "express";

// Importing healthcheck controller
import { healthCheck } from "../controllers/healthcheck.controllers.js";

// Creating a router
const router = Router()

// Making a healthcheck get route
router.route("/").get(healthCheck)

// Exporting Router
export default router