import express from 'express';
import { loginUser,registerUser,adminLogin,getUserProfile,changePassword, forgotPassword, resetPassword } from '../controllers/userController.js';
import { verifyToken } from '../middleware/auth.js';

const userRouter = express.Router();

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.post('/admin',adminLogin)

// Get user profile
userRouter.get('/profile', verifyToken, getUserProfile);

// Change password
userRouter.post('/change-password', verifyToken, changePassword);
userRouter.post('/forgot-password', forgotPassword);
userRouter.post('/reset-password', resetPassword);

export default userRouter;