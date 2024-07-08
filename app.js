import express from 'express'
import { dbConnect } from './database/connectionMongoDB'
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000

app.use(express.json())

dbConnect()


app.listen(PORT, () => {
    console.log('API lista por el puerto', PORT)
})

module.exports = app;
