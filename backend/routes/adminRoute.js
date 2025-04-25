import express from 'express'
import User from '../models/userModel.js'
import authUser from '../middleware/auth.js'

const adminRouter = express.Router()

// Get all users (admin only)
adminRouter.get('/users', authUser, async (req, res) => {
    try {
      // Simply fetch all users without checking admin status
      const users = await User.find().select('-password');
      res.json(users);
    } catch (err) {
      console.error('Error in /users route:', err.message);
      res.status(500).send('Server Error');
    }
});

// Delete a user (admin only)
adminRouter.delete('/users/:id', authUser, async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      
      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }
  
      await User.findByIdAndDelete(req.params.id);
      res.json({ msg: 'User removed' });
    } catch (err) {
      console.error(err.message);
      if (err.kind === 'ObjectId') {
        return res.status(404).json({ msg: 'User not found' });
      }
      res.status(500).send('Server Error');
    }
  });

export default adminRouter