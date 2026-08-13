import express from 'express'
// Importing authentication middleware
import {authenticationMiddleware} from './middleware/auth.middleware.js'
import userRouter from './routes/user.routes.js'

const app = express()
const PORT = process.env.PORT ?? 8000

app.use(express.json())
app.use(authenticationMiddleware)

app.get('/', async (req, res) => {
    return res.json({status : `API Health OK`})
})

app.use('/user', userRouter)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})