// Importing express
import express from 'express'
// Importing db
import { db } from '../db/index.js'
// Importing users table
import { usersTable } from '../models/user.model.js'
// Importing zod user, login validation schema
import {signupPostRequestBodySchema, loginPostRequestBodySchema} from '../validation/request.validation.js' 
// Importing Hahingmethod from our hash.js file
import {hashPasswordWithSalt} from '../utils/hash.js'
// Importing searching by email function and insert new user function
import {getUserByEmail, insertNewUser} from '../services/user.service.js'
import { error } from 'node:console'
// Importing JWT from jsonwebtoken
import jwt from 'jsonwebtoken'

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

router.post('/login', async (req, res) => {
    // Checking email and password using zod
    const validationResult = await loginPostRequestBodySchema.safeParseAsync(req.body)

    // Checking if any error is returned in validation result
    if (validationResult.error) {
        return res.status(400).json({error: validationResult.error.format()})
    }

    // Getting data from validation 
    const {email, password} = validationResult.data

    // Checking if user already exists
    const user = await getUserByEmail(email)

    // Returning response if user exists
    if (!user){
        return res.json(404).json({error: `User with email ${email} does not exists`})
    }

    // Getting password from validation and salt which is returned by getUserByEmail
    const {password: hashedPassword} = hashPasswordWithSalt(password, user.salt)

    // Checking if users password matches with the hashed password
    if(user.password !== hashedPassword){
        return res.status(400).json({message: `Invalid username or Password`})
    }

    // If password is correct, generate a token
    const token = jwt.sign({id: user.id}, process.env.JWT_SECRET)

    // Returning singed token
    return res.json({token})
})

// Exporting default so that it can be called by any name
export default router;