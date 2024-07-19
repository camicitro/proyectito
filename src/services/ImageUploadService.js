
import { gfs } from '../config/gridfs.js';
import { Readable } from 'stream'

export default class ImageUploadService {
    async uploadImage(file) {

        const fileBuffer = file.buffer;
        
        const readableStream = new Readable()
        readableStream.push(fileBuffer)
        readableStream.push(null) //indica el final del stream

        const uploadStream = gfs.openUploadStream(file.originalname)


        readableStream.pipe(uploadStream)

        const fileId = uploadStream.id

        await new Promise((resolve, reject) => {
            uploadStream.on('finish', resolve)
            uploadStream.on('error', reject)
        })

        return fileId;
    }
}

