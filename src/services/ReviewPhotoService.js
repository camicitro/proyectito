import reviewPhotoModel from '../models/ReviewPhotoModel.js';

export default class ReviewPhotoService {
    constructor(imageUploadService){
        this.imageUploadService = imageUploadService
    }

    async createReviewPhoto(file, reviewId){
        const fileId = await this.imageUploadService.uploadImage(file)
        const reviewPhoto = new reviewPhotoModel({
            filename: file.originalname,
            reviewId: reviewId,
            uploadDate: Date.now(),
            fileId: fileId
        })
        return reviewPhoto.save()
    }

    async findReviewPhotoById(){

    }
}