import mongoose from "mongoose";

import userSchema from "./UserSchema.js";

const userModel = mongoose.model('User', userSchema);

export default userModel;