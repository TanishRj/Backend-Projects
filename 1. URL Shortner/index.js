import express from 'express'

const app = express()
const PORT = process.env.PORT ?? 8000

app.get('/', async (req, res) => {
    return res.json({status : `API Health OK`})
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    
})