// Importing express
import express from 'express'

// creating router from express
const router = express.Router()

// Creating new post route
router.post('/shorten', async function (req, res) {
    // Making sure user is authenticated
    const userID = req.user.id
})


// Exporting router
export default router