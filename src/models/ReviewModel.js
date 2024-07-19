import mongoose from "mongoose";

import reviewSchema from "./ReviewSchema.js";

const reviewModel = mongoose.model('reviews', reviewSchema);

export default reviewModel;