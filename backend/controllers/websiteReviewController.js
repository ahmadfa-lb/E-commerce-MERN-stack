import WebsiteReview from '../models/websiteReviewModel.js';
import User from '../models/userModel.js';

// Add a website review
export const addWebsiteReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const userId = req.user?._id || (req.body.userId?._id);

    // Validate inputs
    if (!rating || !comment) {
      return res.json({ success: false, message: 'Rating and comment are required' });
    }

    // Get user name
    const user = await User.findById(userId);
    if (!user) {
      return res.json({ success: false, message: 'User not found' });
    }

    // Check if user has already reviewed the website
    const existingReview = await WebsiteReview.findOne({ userId });
    
    if (existingReview) {
      // Update existing review
      existingReview.rating = rating;
      existingReview.comment = comment;
      existingReview.date = Date.now();
      await existingReview.save();
      
      return res.json({ 
        success: true, 
        message: 'Review updated successfully',
        review: existingReview
      });
    }

    // Create new review
    const newReview = new WebsiteReview({
      userId,
      userName: user.name,
      rating,
      comment
    });

    await newReview.save();

    res.json({ 
      success: true, 
      message: 'Review added successfully',
      review: newReview
    });

  } catch (error) {
    console.error('Error adding website review:', error);
    res.json({ success: false, message: error.message });
  }
};

// Get all website reviews
export const getWebsiteReviews = async (req, res) => {
  try {
    const reviews = await WebsiteReview.find()
      .sort({ date: -1 }) // Most recent first
      .limit(100);

    res.json({ success: true, reviews });

  } catch (error) {
    console.error('Error fetching website reviews:', error);
    res.json({ success: false, message: error.message });
  }
};

// Delete a website review (optional)
export const deleteWebsiteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const userId = req.user._id;

    const review = await WebsiteReview.findById(reviewId);

    if (!review) {
      return res.json({ success: false, message: 'Review not found' });
    }

    // Check if the review belongs to the user
    if (review.userId.toString() !== userId.toString()) {
      return res.json({ success: false, message: 'Unauthorized to delete this review' });
    }

    await WebsiteReview.findByIdAndDelete(reviewId);

    res.json({ success: true, message: 'Review deleted successfully' });

  } catch (error) {
    console.error('Error deleting website review:', error);
    res.json({ success: false, message: error.message });
  }
};