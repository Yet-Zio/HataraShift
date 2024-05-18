import mongoose, { Schema, model } from "mongoose";

interface IShift extends mongoose.Document {
    date: Date
    startTime: string
    endTime: string
    role: string
    bookedBy: mongoose.Types.ObjectId | null
}

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
    role: {
        type: String,
        required: true
    },
    bookedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    }
})

export const Shift = model<IShift>('Shift', shiftSchema)