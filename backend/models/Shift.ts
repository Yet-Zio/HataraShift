import mongoose, { Schema, model } from "mongoose";

const shiftSchema = new Schema({
    date: {
        type: Date,
        required: true
    },
    startTime: {
        type: String,
        required: true,
    },
    endTime: {
        type: String,
        required: true
    },
    bookedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    }
})

export const Shift = model('Shift', shiftSchema)