import mongoose from "mongoose";

import userSchema from "./UserSchema.js";

const userModel = mongoose.model('users', userSchema);

export default userModel;