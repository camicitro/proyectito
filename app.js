import express from 'express'
import cors from 'cors'
import path from 'path';
import { fileURLToPath } from 'url';
import { dbConnect } from './src/config/database/connectionMongoDB.js'
import dotenv from 'dotenv';
import userRouter from './src/routes/UserRoutes.js'
import teamRouter from './src/routes/TeamRoutes.js';
import reviewPhotoRouter from './src/routes/ReviewPhotoRoutes.js';
import reviewRouter from './src/routes/ReviewRoutes.js';
import { initGridFS, gfs } from './src/config/gridfs.js';

dotenv.config();

const app = express()
const PORT = process.env.PORT || 3000

//middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors());
//rutas
app.use('/api', userRouter);
app.use('/api', teamRouter);
app.use('/api', reviewPhotoRouter)
app.use('/api', reviewRouter)
app.use(express.static('public'));

// Obtén la ruta del directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configura el directorio para archivos estáticos
app.use('/images', express.static(path.join(__dirname, 'public/images')));


const initApp = async () => {
    try{
        await dbConnect()
        await initGridFS()
    } catch (error){
        console.error('Error en la inicialización de la aplicación:', error);
    }
}
//dbConnect().then(() => initGridFS())
initApp().then(() => {
    //inicio del servidor despues de la bd y gridfs
    app.listen(PORT, () => {
        console.log('API lista por el puerto ', PORT)
    })
})




