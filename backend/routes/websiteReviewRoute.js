import express from 'express';
import { addWebsiteReview, getWebsiteReviews, deleteWebsiteReview } from '../controllers/websiteReviewController.js';
import  authUser  from '../middleware/auth.js';

const websiteReviewRouter = express.Router();

// Add a website review (requires authentication)
websiteReviewRouter.post('/website/add', authUser, addWebsiteReview);

// Get all website reviews (public)
websiteReviewRouter.get('/website', getWebsiteReviews);

// Delete a website review (requires authentication)
websiteReviewRouter.delete('/website/:reviewId', authUser, deleteWebsiteReview);

export default websiteReviewRouter;