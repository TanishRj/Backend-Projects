// Importing express
import express from 'express'
// importing url validation 
import {shortenPostRequestBodySchema} from '../validation/request.validation.js'
// creating router from express
const router = express.Router()

// Creating new post route
router.post('/shorten', async function (req, res) {
    // Making sure user is authenticated
    const userID = req.user.id

    // Returning response if user id does not exists
    if (!userID) return res.status(401).json({error: `You must be logged in to access this resource`})

    // Validating result
    const validationResult = await shortenPostRequestBodySchema.safeParseAsync(req.body)

    // Checking and giving an returning if any error occurs
    if (validationResult.error) {
        return res.status(400).json({error: validationResult.error.message})
    }
    
    // Getting and storing url from url variable
    const {url} = validationResult.data
})


// Exporting router
export default router