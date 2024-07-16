import mongoose from "mongoose";
import baseSchema from "./BaseSchema.js";

const teamSchema = new mongoose.Schema({
    teamname: {type: String, required: true, unique: true},
    description: {type: String}
}).add(baseSchema);

export default teamSchema