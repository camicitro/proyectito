import reviewPhotoModel from '../models/ReviewPhotoModel.js';

export default class ReviewPhotoService {
    constructor(imageService){
        this.imageService = imageService
    }

    async createReviewPhoto(file, reviewId){
        const fileId = await this.imageService.uploadImage(file)
        const reviewPhoto = new reviewPhotoModel({
            filename: file.originalname,
            reviewId: reviewId,
            uploadDate: Date.now(),
            fileId: fileId
        })
        return reviewPhoto.save()
    }


    async findReviewPhotosByReviewId(reviewId){
        try{
            const reviewPhotos = reviewPhotoModel.find({ reviewId: reviewId}).populate('fileId')
            return reviewPhotos
        }catch(e){
            throw new Error('Error al buscar fotos: ' + error.message);
        }

    }


}