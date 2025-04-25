import mongoose from 'mongoose';

const websiteReviewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// Ensure a user can only review the website once
websiteReviewSchema.index({ userId: 1 }, { unique: true });

const WebsiteReview = mongoose.model('WebsiteReview', websiteReviewSchema);

export default WebsiteReview;