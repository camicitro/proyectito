import multer from "multer";
import express from 'express'
import { ReviewController } from "../controllers/ReviewController.js";
import ReviewService from "../services/ReviewService.js";
import ReviewPhotoService from "../services/ReviewPhotoService.js";
import ImageUploadService from "../services/ImageUploadService.js";


const reviewRouter = express.Router()

const imageUploadService = new ImageUploadService()
const reviewPhotoService = new ReviewPhotoService(imageUploadService)
const reviewService = new ReviewService(reviewPhotoService)
const reviewController = new ReviewController(reviewService);

const upload = multer({ storage: multer.memoryStorage() })

reviewRouter.post('/reviews', upload.array('photos', 10) , reviewController.createReview);

export default reviewRouter