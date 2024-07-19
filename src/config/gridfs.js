import { GridFSBucket } from 'mongodb'
import mongoose from 'mongoose'

let gfs

const initGridFS = async () => {
    const db = mongoose.connection
    //console.log('la bd es ' + db.name)
    gfs = new mongoose.mongo.GridFSBucket(db, { bucketName: 'photos' })
    console.log('GridFS inicializado')
}

export { initGridFS, gfs }