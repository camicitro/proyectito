import express from 'express'
import dbConnect from './database/connectionMongoDB.js'
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000
const app = express()

app.use(express.json())

dbConnect()


app.listen(PORT, () => {
    console.log('API lista por el puerto', PORT)
})


