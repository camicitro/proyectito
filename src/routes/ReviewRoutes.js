import multer from "multer";
import express from 'express'
import { ReviewController } from "../controllers/ReviewController.js";
import ReviewService from "../services/ReviewService.js";
import ReviewPhotoService from "../services/ReviewPhotoService.js";
import ImageService from "../services/ImagesService.js";


const reviewRouter = express.Router()

const imageService = new ImageService()
const reviewPhotoService = new ReviewPhotoService(imageService)
const reviewService = new ReviewService(reviewPhotoService)
const reviewController = new ReviewController(reviewService);

const upload = multer({ storage: multer.memoryStorage() })

reviewRouter.post('/reviews', upload.array('photos', 10) , reviewController.createReview);

reviewRouter.get('/reviews/:id', reviewController.getReviewById);

//reviewRouter.get('/reviews', reviewController.getAllReviews);


export default reviewRouter