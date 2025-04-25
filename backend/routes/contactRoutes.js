import express from 'express';
import { sendContactEmail } from '../controllers/contactController.js';

const router = express.Router();

// Route for contact form submission
router.post('/send-email', sendContactEmail);

export default router;