import express from 'express'
import { dbConnect } from './src/config/database/connectionMongoDB.js'
import dotenv from 'dotenv';
import userModel from './src/models/UserModel.js'
import userRouter from './src/routes/UserRoutes.js'
import teamRouter from './src/routes/TeamRoutes.js';

dotenv.config();

const app = express()
const PORT = process.env.PORT || 3000

//middleware
app.use(express.json())

//rutas
app.use('/api', userRouter);
app.use('/api', teamRouter);

//inicio del servidor
app.listen(PORT, () => {
    console.log('API lista por el puerto ', PORT)
})
dbConnect()

