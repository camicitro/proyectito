import reviewModel from '../models/ReviewModel.js'

export default class ReviewService {
    constructor(reviewPhotoService){
        this.reviewPhotoService = reviewPhotoService
    }

    async createReview(reviewData, files){
        try{
            const newReview = new reviewModel(reviewData)
            const savedReview = await newReview.save()

            for(const file of files){
                const reviewPhoto = await this.reviewPhotoService.createReviewPhoto(file, savedReview._id)
                savedReview.reviewPhotos.push(reviewPhoto._id)
            }

            await savedReview.save()

            return savedReview
        }catch(error){
            throw new Error('Error creando reseña: ' + error.message);
        }
    }


}

