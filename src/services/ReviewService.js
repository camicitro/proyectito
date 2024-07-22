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
    
    async findReviewById(reviewId){
        try{
            const review = await reviewModel.findById(reviewId).populate('reviewPhotos')
            //const reviewPhotos = await this.reviewPhotoService.findReviewPhotosByReviewId(reviewId)
            if(!review){
                throw new Error('Reseña no encontrada')
            }
            
            const images = []

            for (const photo of review.reviewPhotos){
                const base64Image = await this.reviewPhotoService.imageService.convertImageToBase64(photo.fileId)
                images.push({ filename: photo.filename, image: base64Image })
                return { review, images }
        }
        }catch(error){
            throw new Error('Error al buscar reseña: ' + error.message);
        }
    }

}

