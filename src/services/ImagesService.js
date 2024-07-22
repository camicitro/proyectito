
import { GridFSBucket } from 'mongodb';
import { gfs } from '../config/gridfs.js';
import { Readable } from 'stream'

export default class ImageService {
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



    async getImageStreamById(fileId){
        const downloadStream = gfs.openDownloadStream(fileId)
        return downloadStream
    }

    async convertImageToBase64(fileId){
        const downloadStream = await this.getImageStreamById(fileId);
        const chunks = [];
        downloadStream.on('data', chunk => chunks.push(chunk));
        await new Promise((resolve, reject) => {
            downloadStream.on('end', resolve);
            downloadStream.on('error', reject);
        });
        const buffer = Buffer.concat(chunks);
        const base64Image = buffer.toString('base64');
        return base64Image;
    }
}

