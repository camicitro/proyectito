import { ReviewPhotoController } from "../controllers/ReviewPhotoController.js";
import ReviewPhotoService from "../services/ReviewPhotoService.js";
import multer from "multer";
import express from 'express'
import  ImageUploadService  from "../services/ImageUploadService.js";

const reviewPhotoRouter = express.Router()

const imageUploadService = new ImageUploadService()
const reviewPhotoService = new ReviewPhotoService(imageUploadService)
const reviewPhotoController = new ReviewPhotoController(reviewPhotoService);

const upload = multer({ storage: multer.memoryStorage() })

reviewPhotoRouter.post('/imgs', upload.single('file') , reviewPhotoController.createReviewPhoto);

export default reviewPhotoRouter