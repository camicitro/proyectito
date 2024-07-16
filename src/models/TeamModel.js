import mongoose from "mongoose";

import teamSchema from "./TeamSchema.js";

const teamModel = mongoose.model('teams', teamSchema);

export default teamModel;