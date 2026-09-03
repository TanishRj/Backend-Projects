import dotenv from "dotenv"
// Importing express
import express from "express"

dotenv.config({
    path: "./.env"
})

// Creating new app from express
const app = express()
// Creating port from env, else 3000
const port = process.env.PORT || 3000

// Creating a GET request which sends some responds if requested 
app.get('/', (req, res) => {
// Sending server response as API Health OK
  res.send('API Health OK')
})

// 
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})