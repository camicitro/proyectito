import mongoose from "mongoose";

import reviewPhotoSchema from "./ReviewPhotoSchema.js";

const reviewPhotoModel = mongoose.model('reviewphotos', reviewPhotoSchema);

export default reviewPhotoModel;