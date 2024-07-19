//mongodb://localhost:27017

import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const dbConnect = async () => {
        try{
            const DB_URI = process.env.DB_URI;
            console.log("La db uri es: ", DB_URI)
            //mongoose.set('strictQuery', true)
            await mongoose.connect(DB_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
            console.log('Conexion a MongoDBexitosa')
            //return connection
        } catch(error){
            console.log('Error de conexion a MongoDB', error)
        }
    
}

export  { dbConnect }