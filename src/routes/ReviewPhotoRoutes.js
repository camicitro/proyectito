import { ReviewPhotoController } from "../controllers/ReviewPhotoController.js";
import ReviewPhotoService from "../services/ReviewPhotoService.js";
import multer from "multer";
import express from 'express'
import  ImageService  from "../services/ImagesService.js";

const reviewPhotoRouter = express.Router()

const imageService = new ImageService()
const reviewPhotoService = new ReviewPhotoService(imageService)
const reviewPhotoController = new ReviewPhotoController(reviewPhotoService);

const upload = multer({ storage: multer.memoryStorage() })

reviewPhotoRouter.post('/imgs', upload.single('file') , reviewPhotoController.createReviewPhoto);

export default reviewPhotoRouter