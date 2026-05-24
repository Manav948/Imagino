import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: {
        lowercase: true,
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 30,
        unique: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
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
    ],
    loginAttempts: {
        type: Number,
        default: 0,
        required: true
    },
    lockuntil: {
        type: Date,
    }
}, { timestamps: true })

userSchema.methods.isLocked = function () {
    return this.lockuntil && this.lockuntil > Date.now();
}

const User = mongoose.model("User", userSchema);
export default User;