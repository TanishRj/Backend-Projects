import dotenv from "dotenv"
// Importing app from app.js
import app from './app.js'
dotenv.config({
    path: "./.env"
})

// Creating port from env, else 3000
const port = process.env.PORT || 3000

// 
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})