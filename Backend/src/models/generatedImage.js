import mongoose from 'mongoose';

const generatedImageSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    prompt: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000,
    },
    imageUrl: {
      type: String,
      required: true,
      trim: true,
    },
    publicId: {
      type: String,
      default: '',
      trim: true,
    },
    width: {
      type: Number,
      default: null,
    },
    height: {
      type: Number,
      default: null,
    },
    aspectRatio: {
      type: String,
      enum: ['1:1', '16:9', '9:16', 'custom'],
      default: '1:1',
    },
    sampler: {
      type: String,
      default: 'Euler a',
      trim: true,
    },
    steps: {
      type: Number,
      default: 30,
    },
    cfgScale: {
      type: Number,
      default: 7.5,
    },
    clientGenerationId: {
      type: String,
      default: null,
      trim: true,
    },
  },
  {
    timestamps: true, // creates createdAt and updatedAt
  }
);

// Compound index for querying a user's history in descending creation order
generatedImageSchema.index({ userId: 1, createdAt: -1 });

// Index for idempotency / duplicate check by client generation ID
generatedImageSchema.index({ userId: 1, clientGenerationId: 1 }, { sparse: true });

// Compound index for prompt filtering and search
generatedImageSchema.index({ userId: 1, prompt: 1 });

const GeneratedImage = mongoose.model('GeneratedImage', generatedImageSchema);

export default GeneratedImage;
