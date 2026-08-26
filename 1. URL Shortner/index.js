import express from 'express'
import { authenticationMiddleware } from './middleware/auth.middleware.js'
import userRouter from './routes/user.routes.js'
import urlRouter from './routes/url.routes.js'

const app = express()

app.use(express.json())
app.use(authenticationMiddleware)

app.get('/', async (req, res) => {
    return res.json({ status: 'API Health OK' })
})

app.use('/user', userRouter)
app.use(urlRouter)

export default app
