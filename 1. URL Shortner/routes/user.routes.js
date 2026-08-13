// Importing express
import express from 'express'
// Importing db
import { db } from '../db/index.js'
// Importing users table
import { usersTable } from '../models/user.model.js'
// Importing zod user validation schema
import {signupPostRequestBodySchema} from '../validation/request.validation.js' 
// Importing Hahingmethod from our hash.js file
import {hashPasswordWithSalt} from '../utils/hash.js'
// Importing searching by email function
import {getUserByEmail, insertNewUser} from '../services/user.service.js'

// Creating new router for routes
const router = express.Router()

// Signup Route
router.post('/signup', async (req, res) => {
    // Getting validation results from zod user schema
    const validationResult = await signupPostRequestBodySchema.safeParseAsync(req.body)

    // If validation result have an error means validation is failed
    if(validationResult.error) {
        // Passing validation error message in a formatted way
        return res.status(400).json({error: validationResult.error.format()})
    }

    // Destructuring details of user from validated result
    const {firstname, lastname, email, password} = validationResult.data

    // Checking existing user by the imported function
    const existingUser = await getUserByEmail(email)

    // Giving a response if the user already exists
    if (existingUser){
        return res.status(400).json({error: `The user with email ${email} already exists`})
    }

    // Function returns salt and hashed password
    const {salt, password: hashedPassword} = hashPasswordWithSalt(password)
    
    // Inserts new user using insert New user from services file
    const user = await insertNewUser(email, firstname, lastname, salt, hashedPassword)
    
    // Returning a 201 created response with data as id in json format 
    return res.status(201).json({ id: user })

})

// Exporting default so that it can be called by any name
export default router;