import { Schema, model } from "mongoose";

/**
 * An user schema that provides name, email and password attributes
 */
const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, {timestamps: true})

export const User = model("User", userSchema)