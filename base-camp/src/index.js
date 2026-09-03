import dotenv from "dotenv"
// Importing express
import express from "express"

dotenv.config({
    path: "./.env"
})

// Creating new app from express
const app = express()
// Creating port from env, else 3000
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})