//mongodb://localhost:27017

import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();


const dbConnect = async () => {
        try{
            const DB_URI = process.env.DB_URI
            await mongoose.connect(DB_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            })
            console.log('Conexion exitosa')
        } catch(error){
            console.log('Error de conexion', error)
        }
    
}

export default dbConnect