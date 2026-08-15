// Importing express
import express from 'express'
// importing url validation 
import {} from '../validation/request.validation.js'
// creating router from express
const router = express.Router()

// Creating new post route
router.post('/shorten', async function (req, res) {
    // Making sure user is authenticated
    const userID = req.user.id

    // Returning response if user id does not exists
    if (!userID) return res.status(401).json({error: `You must be logged in to access this resource`})
})


// Exporting router
export default router