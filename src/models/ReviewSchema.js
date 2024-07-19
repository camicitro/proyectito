import mongoose from "mongoose";
import baseSchema from "./BaseSchema.js";

const reviewSchema = new mongoose.Schema({
    reviewDate: {type: Date, required: true},
    reviewExperience: {type: String},
    reviewPrice: {type: Number},
    amountPeople: {type: Number},
    consumedFood: {type: String},
    attentionScore: {type: Number},
    placeScore: {type: Number},
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users'},
    reviewPhotos: [ { type: mongoose.Schema.Types.ObjectId, ref: 'reviewphotos' } ]

}).add(baseSchema);

export default reviewSchema