// Importing express
import express from "express"

// Creating new app from express
const app = express()

// Middlewares 
app.use(express.json({limit: "16kb"})) // Anybody can send json data with limit
// Accepting URL encoded data
app.use(express.urlencoded({extended: true, limit: "16kb"}))
// Static asset to be viewed publically


// Creating a GET request which sends some responds if requested 
app.get('/', (req, res) => {
// Sending server response as API Health OK
  res.send('API Health OK')
})

// Exporting app
export default app