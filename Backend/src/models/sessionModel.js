import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    tokenHash: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    ipAddress: {
        type: String,
        default: "unknown"
    },
    userAgent: {
        type: String,
        default: "unknown"
    },
    expireAt: {
        type: Date,
        required: true,
    },
    isValid: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
})

sessionSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });
const Session = mongoose.model('Session', sessionSchema);
export default Session;
