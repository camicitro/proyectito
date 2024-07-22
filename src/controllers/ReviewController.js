
export class ReviewController {
    constructor(reviewService){
        this.reviewService = reviewService;
    }

    createReview = async (req, res) => {
        try{
            const reviewData = req.body
            const files = req.files
            
            const newReview = await this.reviewService.createReview(reviewData, files)
            
            res.status(201).send({ message: 'Reseña subida exitosamente '})
        } catch(error){
            return res.status(500).send({message: 'Error en petición'})
        }
    }

    getReviewById = async (req, res) => {
        try{
            const reviewId  = req.params.id
            
            const reviewWithImages = await this.reviewService.findReviewById(reviewId)
            if(!reviewWithImages){
                return res.status(404).send({ message: 'Reseña no encontrada' })
            }

            /*
            const imagesWithUrls = reviewWithImages.images.map((image, index) => ({
                filename: image.filename,
                url: `${req.protocol}://${req.get('host')}/images/${reviewWithImages.review.reviewPhotos[index].fileId}`
            }));

            res.status(200).json({ ...reviewWithImages, images: imagesWithUrls });*/
            res.status(200).json(reviewWithImages)
        }catch(error){
            //console.error('ONO: '+ error)
            return res.status(500).send({message: 'Error en petición'})
        }
    }



}
