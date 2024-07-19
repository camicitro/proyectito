
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


}
