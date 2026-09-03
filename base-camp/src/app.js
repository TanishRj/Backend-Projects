// Importing express
import express from "express"

// Creating new app from express
const app = express()

// Creating a GET request which sends some responds if requested 
app.get('/', (req, res) => {
// Sending server response as API Health OK
  res.send('API Health OK')
})

// Exporting app
export default app