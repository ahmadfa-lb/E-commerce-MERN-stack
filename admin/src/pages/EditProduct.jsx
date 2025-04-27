import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';
import { ArrowLeft, Save } from 'lucide-react';

const EditProduct = ({ token }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    discount: '',
    category: 'Sport',
    subCategory: 'Topwear',
    sizes: [],
    bestseller: false,
    image: []
  });

  const [newImages, setNewImages] = useState({
    image1: null,
    image2: null,
    image3: null,
    image4: null
  });
  const [previewImages, setPreviewImages] = useState([]);

  useEffect(() => {
    if (id) {
      fetchProductDetails();
    }
  }, [id]);

  const fetchProductDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`${backendUrl}/api/product/single`, { productId: id });
      if (response.data.success) {
        const productData = response.data.product;
        setProduct({
          name: productData.name,
          description: productData.description,
          price: productData.price,
          discount: productData.discount,
          category: productData.category,
          subCategory: productData.subCategory,
          sizes: productData.sizes,
          bestseller: productData.bestseller,
          image: productData.image
        });
        setPreviewImages(productData.image);
      } else {
        toast.error('Failed to fetch product details');
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setProduct({ ...product, [name]: checked });
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  const handleSizeChange = (size) => {
    if (product.sizes.includes(size)) {
      setProduct({
        ...product,
        sizes: product.sizes.filter(s => s !== size)
      });
    } else {
      setProduct({
        ...product,
        sizes: [...product.sizes, size]
      });
    }
  };

const handleImageChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setNewImages({
        ...newImages,
        [name]: files[0]
      });
  
      // Create preview
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageIndex = parseInt(name.replace('image', '')) - 1;
        
        // Create a copy of the current previews
        const newPreviews = [...previewImages];
        
        // If there's already an image at this index, find the first empty slot
        if (newPreviews[imageIndex] && imageIndex === 0) {
          // For index 0 (main image), keep it as is and shift others
          const emptyIndex = newPreviews.findIndex(img => !img);
          if (emptyIndex !== -1) {
            newPreviews[emptyIndex] = event.target.result;
          } else {
            newPreviews.push(event.target.result);
          }
        } else {
          // For other indices, or if the slot is empty, use the specified index
          newPreviews[imageIndex] = event.target.result;
        }
        
        setPreviewImages(newPreviews);
      };
      reader.readAsDataURL(files[0]);
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!product.name || !product.description || !product.price) {
      toast.error('Please fill all required fields');
      return;
    }
  
    try {
      setSubmitting(true);
      
      const formData = new FormData();
      formData.append('id', id);
      formData.append('name', product.name);
      formData.append('description', product.description);
      formData.append('price', product.price);
      formData.append('discount', product.discount );
      formData.append('category', product.category);
      formData.append('subCategory', product.subCategory);
      formData.append('bestseller', product.bestseller);
      formData.append('sizes', JSON.stringify(product.sizes));
      
      // Important: Send the current images array to preserve existing images
      formData.append('keepImages', JSON.stringify(product.image));
      
      // Append any new images
      Object.keys(newImages).forEach(key => {
        if (newImages[key]) {
          formData.append(key, newImages[key]);
        }
      });
  
      const response = await axios.post(`${backendUrl}/api/product/update`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          token
        }
      });
  
      if (response.data.success) {
        toast.success('Product updated successfully');
        navigate('/');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setSubmitting(false);
    }
  };
  

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
      <div className="flex items-center gap-2 mb-6">
        <button 
          onClick={() => navigate('/')} 
          className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Edit Product</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Name *</label>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:ring-gold focus:border-gold"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price *</label>
            <input
              type="number"
              name="price"
              min={0}
              value={product.price}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:ring-gold focus:border-gold"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Discount *</label>
            <input
              type="number"
              name="discount"
              min="0"
              max="99"
              value={product.discount}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:ring-gold focus:border-gold"
              required
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:ring-gold focus:border-gold h-32"
            required
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              name="category"
              value={product.category}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:ring-gold focus:border-gold"
            >
              <option value="Sport">Sport</option>
              <option value="Casual">Casual</option>
              <option value="Formal">Formal</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sub Category</label>
            <select
              name="subCategory"
              value={product.subCategory}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:ring-gold focus:border-gold"
            >
              <option value="Topwear">Topwear</option>
              <option value="Bottomwear">Bottomwear</option>
              <option value="Footwear">Footwear</option>
              <option value="Accessories">Accessories</option>
            </select>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Sizes</label>
          <div className="flex flex-wrap gap-3">
            {['S', 'M', 'L', 'XL', 'XXL', 'Out Of Stock'].map(size => (
              <div key={size} className="flex items-center">
                <input
                  type="checkbox"
                  id={`size-${size}`}
                  checked={product.sizes.includes(size)}
                  onChange={() => handleSizeChange(size)}
                  className="mr-2"
                />
                <label htmlFor={`size-${size}`}>{size}</label>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="bestseller"
              checked={product.bestseller}
              onChange={handleChange}
              className="mr-2"
            />
            <span className="text-sm font-medium text-gray-700">Bestseller</span>
          </label>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Product Images</label>
          <p className="text-xs text-gray-500 mb-2">
            The first image will be used as the main product image. Upload new images to add to the product.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((num) => (
              <div key={num} className="relative border rounded p-2">
                {previewImages[num-1] && (
                  <div className="mb-2 relative">
                    <img 
                      src={previewImages[num-1]} 
                      alt={`Preview ${num}`} 
                      className="w-full h-40 object-cover border rounded"
                    />
                    {num === 1 && (
                      <div className="absolute top-0 right-0 bg-gold text-white text-xs px-2 py-1 rounded-bl">
                        Main
                      </div>
                    )}
                  </div>
                )}
                <input
                  type="file"
                  name={`image${num}`}
                  onChange={handleImageChange}
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
                  accept="image/*"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {previewImages[num-1] 
                    ? (num === 1 ? 'Replace main image' : 'Replace image') 
                    : (previewImages.length === 0 && num === 1 ? 'Add main image' : 'Add additional image')}
                </p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex items-center gap-2 px-4 py-2 bg-gold text-white rounded hover:bg-amber-600 disabled:opacity-50 transition-colors"
            disabled={submitting}
          >
            {submitting ? 'Updating...' : (
              <>
                <Save size={16} />
                <span>Update Product</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;