import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  discount: {
    type: Number,
    default: 0,
    min: 0,
    max: 99
  },
  category: {
    type: String,
    required: true
  },
  subCategory: {
    type: String,
    required: true
  },
  bestseller: {
    type: Boolean,
    default: false
  },
  sizes: {
    type: Array,
    required: true
  },
  image: {
    type: Array,
    required: true
  }
}, { timestamps: true });

export default mongoose.model('Product', productSchema);