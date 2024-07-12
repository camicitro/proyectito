import mongoose from "mongoose";

const baseOptions = {
    timestamps: {
        createdAt: 'creationDate',
        updatedAt: 'lasModifiedDate'
    },
    
};

const baseSchema = new mongoose.Schema({
    deletionDate: { type: Date, default: null}
    //falta el id pero eso ya es automatico creo
}, baseOptions);

export default baseSchema