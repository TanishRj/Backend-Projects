import dotenv from "dotenv"
// Importing app from app.js
import app from './app.js'
// Importing connect method
import connectDB from "./db/index.js"

dotenv.config({
    path: "./.env"
})

// Creating port from env, else 3000
const port = process.env.PORT || 3000

// First connect to mongodb and then start listening on port for server
connectDB()
  .then(() => {
    app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
})
  // Catch error and exit process
  .catch((err) => {
    
  })