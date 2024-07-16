import mongoose from "mongoose";
import baseSchema from "./BaseSchema.js";

const userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    firstname: {type: String},
    lastname: {type: String},
    birthDate: {type: Date},
    teamId: { type: mongoose.Schema.Types.ObjectId, ref: 'teams'} //ref tiene que coincidir con el nombre del modelo

}).add(baseSchema);

export default userSchema