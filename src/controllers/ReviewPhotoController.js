
export class ReviewPhotoController {
    constructor(reviewPhotoService){
        this.reviewPhotoService = reviewPhotoService;
    }

    createReviewPhoto = async (req, res) => {
        try{
            const file = req.file
            const reviewId = req.body.reviewId


            const reviewPhoto = await this.reviewPhotoService.createReviewPhoto(file, reviewId)
            res.status(201).send({ message: 'Foto subida exitosamente '})
        } catch(error){
            return res.status(500).send({message: 'Error en petición'})
        }
    }


}

