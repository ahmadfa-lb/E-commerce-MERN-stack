import React, { useState } from 'react';
import { assets } from '../assets/assets';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Upload, Tag, DollarSign, Layers, CheckCircle, PlusCircle } from 'lucide-react';

const Add = ({ token }) => {
  // Image states
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  // Form field states
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Sport");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);
  const [discount, setDiscount] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    discount: 0, // Add discount field
    category: 'Sport',
    subCategory: 'Topwear',
    sizes: [],
    bestseller: false
  });


  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append('discount', discount );
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));

      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      const response = await axios.post(
        backendUrl + "/api/product/add", 
        formData, 
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        // Reset form fields
        setName('');
        setDescription('');
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setPrice('');
        setSizes([]);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const sizeOptions = ["S", "M", "L", "XL", "XXL", "Out Of Stock"];

  return (
    <div className="bg-white rounded-lg shadow-md p-3 sm:p-6 w-full max-w-full">
      <div className="flex items-center gap-2 mb-6">
        <PlusCircle className="text-gold" size={20} />
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Add New Product</h2>
      </div>

      <form onSubmit={onSubmitHandler} className="flex flex-col w-full items-start gap-6">
        {/* Image Upload Section */}
        <div className="w-full">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
            <Upload size={16} />
            Product Images
          </label>
          <div className="flex flex-wrap gap-4">
            {[
              { state: image1, setState: setImage1, id: "image1" },
              { state: image2, setState: setImage2, id: "image2" },
              { state: image3, setState: setImage3, id: "image3" },
              { state: image4, setState: setImage4, id: "image4" },
            ].map((image, index) => (
              <label 
                key={index} 
                htmlFor={image.id}
                className="relative cursor-pointer group"
              >
                <div className={`w-24 h-24 rounded-lg border-2 ${image.state ? 'border-gold' : 'border-dashed border-gray-300'} flex items-center justify-center overflow-hidden hover:border-gold transition-colors duration-200`}>
                  {!image.state ? (
                    <div className="flex flex-col items-center text-gray-400 group-hover:text-gold">
                      <Upload size={20} />
                      <span className="text-xs mt-1">Image {index + 1}</span>
                    </div>
                  ) : (
                    <img 
                      className="w-full h-full object-cover" 
                      src={URL.createObjectURL(image.state)} 
                      alt={`Product image ${index + 1}`} 
                    />
                  )}
                </div>
                <input 
                  onChange={(e) => image.setState(e.target.files[0])} 
                  type="file" 
                  accept="image/*"
                  id={image.id} 
                  hidden 
                />
                {image.state && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs cursor-pointer hover:bg-red-600"
                    onClick={(e) => {
                      e.preventDefault();
                      image.setState(false);
                    }}
                  >
                    ×
                  </div>
                )}
              </label>
            ))}
          </div>
        </div>

        {/* Product Name */}
        <div className="w-full">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            <Tag size={16}/>
            Product Name
          </label>
          <input 
            onChange={(e) => setName(e.target.value)} 
            value={name} 
            className="w-full max-w-lg px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold focus:border-gold outline-none transition-colors" 
            type="text" 
            placeholder="Enter product name" 
            required
          />
        </div>

        {/* Product Description */}
        <div className="w-full">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            <Layers size={16} />
            Product Description
          </label>
          <textarea 
            onChange={(e) => setDescription(e.target.value)} 
            value={description} 
            className="w-full max-w-lg px-4 py-2 border border-gray-300 rounded-md h-24 focus:ring-2 focus:ring-gold focus:border-gold outline-none transition-colors" 
            placeholder="Enter product description" 
            required
          />
        </div>

        {/* Categories and Price */}
        <div className="flex flex-col sm:flex-row gap-6 w-full">
          {/* Product Category */}
          <div className="w-full sm:w-1/3">
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Product Category
            </label>
            <select 
              onChange={(e) => setCategory(e.target.value)} 
              value={category}
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-gold focus:border-gold outline-none transition-colors"
            >
              <option value="Sport">Sport</option>
              <option value="Casual">Casual</option>
              <option value="Formal">Formal</option>
            </select>
          </div>

          {/* Sub Category */}
          <div className="w-full sm:w-1/3">
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Sub Category
            </label>
            <select 
              onChange={(e) => setSubCategory(e.target.value)} 
              value={subCategory}
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-gold focus:border-gold outline-none transition-colors"
            >
              <option value="Topwear">Topwear</option>
              <option value="Bottomwear">Bottomwear</option>
              <option value="Winterwear">Winterwear</option>
            </select>
          </div>

          {/* Price */}
          <div className="w-20">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <DollarSign size={16} />
              Price
            </label>
            <div className="relative">
              <input 
                onChange={(e) => setPrice(e.target.value)} 
                value={price} 
                className="w-full p-2  border border-gray-300 rounded-md focus:ring-2 focus:ring-gold focus:border-gold outline-none transition-colors" 
                type="number" 
                placeholder="0.00" 
                required
              />
            </div>
          </div>

        {/* Add discount field */}
        <div className="w-20">
          <label className="block text-sm font-medium text-gray-700 mb-2">Discount (%)</label>
          <div className="flex items-center">
            <input
              type="number"
              name="discount"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              min="0"
              max="99"
              placeholder="0%" 
              className="w-full p-2 border border-gray-300 rounded focus:ring-gold focus:border-gold"
            />
          </div>
        </div>
        </div>

        {/* Sizes */}
        <div className="w-full">
          <label className="text-sm font-medium text-gray-700 mb-3 block">
            Available Sizes
          </label>
          <div className="flex flex-wrap gap-3">
            {sizeOptions.map(size => (
              <div 
                key={size}
                onClick={() => setSizes(prev => 
                  prev.includes(size) 
                    ? prev.filter(item => item !== size) 
                    : [...prev, size]
                )}
                className={`
                  px-4 py-2 rounded-md cursor-pointer transition-all ${
                    sizes.includes(size) 
                      ? "bg-cream text-gold border-2 border-gold" 
                      : "bg-gray-100 text-gray-700 border-2 border-gray-300"
                  }
                `}
              >
                {size}
              </div>
            ))}
          </div>
        </div>

        {/* Bestseller Checkbox */}
        <div className="flex items-center gap-2 mt-2">
          <div 
            className={`
              w-5 h-5 border rounded cursor-pointer flex items-center justify-center transition-colors
              ${bestseller ? 'bg-gold border-gold' : 'border-gray-300 bg-white'}
            `}
            onClick={() => setBestseller(prev => !prev)}
          >
            {bestseller && <CheckCircle size={14} className="text-white" />}
          </div>
          <label className="cursor-pointer" onClick={() => setBestseller(prev => !prev)}>
            Add to bestseller collection
          </label>
        </div>

        {/* Submit Button */}
        <button 
          type="submit" 
          className="px-6 py-3 mt-4 bg-gold text-white font-medium rounded-md hover:scale-105 flex items-center gap-2"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
              Processing...
            </>
          ) : (
            <>Add Product</>
          )}
        </button>
      </form>
    </div>
  );
};

export default Add;