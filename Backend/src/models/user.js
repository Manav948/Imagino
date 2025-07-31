import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: {
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
    },
    profileImage: {
        type: String,
        default: ""
    },
    imageCount: {
        type: Number,
        default: 0
    },
    maxImageLimit: {
        type: Number,
        default: 10 
    },
    generatedImages: [
        {
            prompt: String,
            imageUrl: String,
            createdAt: {
                type: Date,
                default: Date.now
            }
        }
    ]
}, { timestamps: true })

const User = mongoose.model("User", userSchema);
export default User;