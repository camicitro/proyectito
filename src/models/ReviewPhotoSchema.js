import mongoose from "mongoose";
import baseSchema from "./BaseSchema.js";
import { string } from "zod";

const reviewPhotoSchema = new mongoose.Schema({
    filename: {type: String, required: true},
    reviewId: { type: mongoose.Schema.Types.ObjectId, ref: 'reviews', required: true},
    //reviewId: { type: Number},
    uploadDate: { type: Date, default: Date.now },
    fileId: { type: mongoose.Schema.Types.ObjectId, ref: 'photos.files', required: true}
}).add(baseSchema);

export default reviewPhotoSchema