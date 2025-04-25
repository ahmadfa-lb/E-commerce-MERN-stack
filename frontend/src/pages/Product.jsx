// import React, { useContext, useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom'
// import { ShopContext } from '../context/ShopContext';
// import { assets } from '../assets/assets';
// import RelatedProducts from '../components/RelatedProducts';
// import { FaWhatsapp } from "react-icons/fa";

// const Product = () => {

//   const { productId } = useParams();
//   const { products, currency, addToCart } = useContext(ShopContext);
//   const [productData, setProductData] = useState(false);
//   const [image, setImage] = useState('')
//   const [size, setSize] = useState('')

//   const fetchProductData = async () => {

//     products.map((item) => {
//       if (item._id === productId) {
//         setProductData(item)
//         setImage(item.image[0])
//         return null;
//       }
//     })

//   }

//   useEffect(() => {
//     fetchProductData();
//   }, [productId, products])

//   // Calculate discounted price
//   const calculateDiscountedPrice = (originalPrice, discountPercentage) => {
//     if (!discountPercentage || discountPercentage <= 0) return originalPrice;
//     return originalPrice * (1 - discountPercentage / 100);
//   };

//   // Format price to 2 decimal places
//   const formatPrice = (price) => {
//     return Number(price).toFixed(2);
//   };

//   // Get the final price after discount
//   const discountedPrice = calculateDiscountedPrice(productData.price, productData.discount);
//   const hasDiscount = productData.discount && productData.discount > 0;

//   return productData ? (
//     <div className='pt-10 transition-opacity ease-in duration-500 opacity-100 mx-4 sm:mx-20 '>
//       {/*----------- Product Data-------------- */}
//       <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>

//         {/*---------- Product Images------------- */}
//         <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
//           <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
//             {
//               productData.image.map((item, index) => (
//                 <img onClick={() => setImage(item)} src={item} key={index} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' alt="" />
//               ))
//             }
//           </div>
//           <div className='w-full sm:w-[80%]'>
//             <img className='w-full h-auto' src={image} alt="" />
//           </div>
//         </div>

//         {/* -------- Product Info ---------- */}
//         <div className='flex-1'>
//           <h1 className='font-medium text-2xl'>{productData.name}</h1>

//           {/* <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p> */}
//           <div className='flex flex-row sm:items-center mt-4 gap-3 sm:mt-2'>
//             {hasDiscount ? (
//               <>
//                 <span className='text-sm sm:text-lg font-medium sm:py-1 text-red-600'>{currency}{formatPrice(discountedPrice)}</span>
//                 <span className='text-sm font-medium sm:py-1 line-through text-gray'>{currency}{formatPrice(productData.price)}</span>
//                 <span className='px-2 py-1 bg-gold text-sm text-white rounded'>{productData.discount}% OFF</span>
//               </>
//             ) : (
//               <span className='text-sm sm:text-lg font-medium sm:py-1'>{currency}{formatPrice(productData.price)}</span>
//             )}
//           </div>
//           <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>
//           <div className='flex flex-col gap-4 my-8'>
//             <p>Select Size</p>
//             <div className='flex gap-2'>
//               {productData.sizes.map((item, index) => (
//                 <button onClick={() => setSize(item)} className={`bg-cream text-gray-700 border-2  px-4 py-2 rounded ${item === size ? 'border-gold' : ''}`} key={index}>{item}</button>
//               ))}
//             </div>
//           </div>
//           <div className='flex flex-col sm:w-60  gap-4'>
//           <button onClick={() => addToCart(productData._id, size)} className='bg-black hover:scale-[.99] transition-transform duration-200 rounded text-white px-8 py-3 text-sm active:bg-gray-700'>ADD TO CART</button>
//           <button
//             onClick={() => {
//               const phoneNumber = "+96103520863";
//               const message = encodeURIComponent(
//                 `Hello, I'm interested in the following product:\n\n` +
//                 `Product: ${productData.name}\n` +
//                 `Price: ${currency}${hasDiscount ? formatPrice(discountedPrice) : formatPrice(productData.price)}\n` +
//                 `Size: ${size || 'Not selected'}\n\n` +
//                 `Could you provide more information about this item?`
//               );
//               window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
//             }}
//             className='bg-[#25D366] hover:bg-green-500 hover:scale-[.99] transition-transform duration-200 rounded text-white px-4 py-3 text-sm flex items-center justify-center gap-1'
//           >
//             <FaWhatsapp size={20} />
//             <span>INQUIRE VIA WHATSAPP</span>
//           </button>
//           </div>

//           <hr className='mt-8 sm:w-4/5' />
//           <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
//             <p>100% Original product.</p>
//             <p>Cash on delivery is available on this product.</p>
//             <p>Easy return and exchange policy within <b>3</b> days.</p>
//           </div>
//         </div>
//       </div>

//       {/* ---------- Description & Review Section ------------- */}
//       <div className='mt-20'>
//         <div className='flex'>
//           <b className='border px-5 py-3 text-sm'>Description</b>
//           <p className='border px-5 py-3 text-sm'>Reviews (122)</p>
//         </div>
//         <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
//           <p>An e-commerce website is an online platform that facilitates the buying and selling of products or services over the internet. It serves as a virtual marketplace where businesses and individuals can showcase their products, interact with customers, and conduct transactions without the need for a physical presence. E-commerce websites have gained immense popularity due to their convenience, accessibility, and the global reach they offer.</p>
//           <p>E-commerce websites typically display products or services along with detailed descriptions, images, prices, and any available variations (e.g., sizes, colors). Each product usually has its own dedicated page with relevant information.</p>
//         </div>
//       </div>

//       {/* --------- display related products ---------- */}

//       <RelatedProducts category={productData.category} subCategory={productData.subCategory} />

//     </div>
//   ) : <div className=' opacity-0'></div>
// }

// export default Product





import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';
import { FaWhatsapp } from "react-icons/fa";
import axios from 'axios';
import { toast } from 'react-toastify';

const Product = () => {

  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('')
  const [size, setSize] = useState('')


  const [reviews, setReviews] = useState([]);
  const [userReview, setUserReview] = useState({ rating: 5, comment: '' });
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const { backendUrl, token, navigate } = useContext(ShopContext);


  // Fetch website reviews
  const fetchReviews = async () => {
    setReviewsLoading(true);
    try {
      const response = await axios.get(`${backendUrl}/api/reviews/website`);
      if (response.data.success) {
        setReviews(response.data.reviews);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setReviewsLoading(false);
    }
  };
  
  // Submit a website review
  const submitReview = async (e) => {
    e.preventDefault();
    
    if (!token) {
      toast.error('Please login to submit a review');
      navigate('/login');
      return;
    }
    
    if (!userReview.comment.trim()) {
      toast.error('Please enter a review comment');
      return;
    }
    
    setSubmitLoading(true);
    try {
      const response = await axios.post(
        `${backendUrl}/api/reviews/website/add`,
        {
          rating: userReview.rating,
          comment: userReview.comment
        },
        { headers: { token } }
      );
      
      if (response.data.success) {
        toast.success('Review submitted successfully');
        setUserReview({ rating: 5, comment: '' });
        fetchReviews(); // Refresh reviews
      } else {
        toast.error(response.data.message || 'Failed to submit review');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      toast.error(error.response?.data?.message || 'Failed to submit review');
    } finally {
      setSubmitLoading(false);
    }
  };

  // Render stars for ratings
  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, i) => (
      <span key={i} className={`text-xl ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
    ));
  };

  const fetchProductData = async () => {

    products.map((item) => {
      if (item._id === productId) {
        setProductData(item)
        setImage(item.image[0])
        return null;
      }
    })

  }

  useEffect(() => {
    fetchProductData();
    fetchReviews();
  }, [productId, products])

  // Calculate discounted price
  const calculateDiscountedPrice = (originalPrice, discountPercentage) => {
    if (!discountPercentage || discountPercentage <= 0) return originalPrice;
    return originalPrice * (1 - discountPercentage / 100);
  };

  // Format price to 2 decimal places
  const formatPrice = (price) => {
    return Number(price).toFixed(2);
  };

  // Get the final price after discount
  const discountedPrice = calculateDiscountedPrice(productData.price, productData.discount);
  const hasDiscount = productData.discount && productData.discount > 0;

  return productData ? (
    <div className='pt-10 transition-opacity ease-in duration-500 opacity-100 mx-4 sm:mx-20 '>
      {/*----------- Product Data-------------- */}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>

        {/*---------- Product Images------------- */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {
              productData.image.map((item, index) => (
                <img onClick={() => setImage(item)} src={item} key={index} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' alt="" />
              ))
            }
          </div>
          <div className='w-full sm:w-[80%]'>
            <img className='w-full h-auto' src={image} alt="" />
          </div>
        </div>

        {/* -------- Product Info ---------- */}
        <div className='flex-1'>
          <h1 className='font-medium text-2xl'>{productData.name}</h1>

          {/* <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p> */}
          <div className='flex flex-row sm:items-center mt-4 gap-3 sm:mt-2'>
            {hasDiscount ? (
              <>
                <span className='text-sm sm:text-lg font-medium sm:py-1 text-red-600'>{currency}{formatPrice(discountedPrice)}</span>
                <span className='text-sm font-medium sm:py-1 line-through text-gray'>{currency}{formatPrice(productData.price)}</span>
                <span className='px-2 py-1 bg-gold text-sm text-white rounded'>{productData.discount}% OFF</span>
              </>
            ) : (
              <span className='text-sm sm:text-lg font-medium sm:py-1'>{currency}{formatPrice(productData.price)}</span>
            )}
          </div>
          <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>
          <div className='flex flex-col gap-4 my-8'>
            <p>Select Size</p>
            <div className='flex gap-2'>
              {productData.sizes.map((item, index) => (
                <button onClick={() => setSize(item)} className={`bg-cream text-gray-700 border-2  px-4 py-2 rounded ${item === size ? 'border-gold' : ''}`} key={index}>{item}</button>
              ))}
            </div>
          </div>
          <div className='flex flex-col sm:w-60  gap-4'>
          <button onClick={() => addToCart(productData._id, size)} className='bg-black hover:scale-[.99] transition-transform duration-200 rounded text-white px-8 py-3 text-sm active:bg-gray-700'>ADD TO CART</button>
          <button
            onClick={() => {
              const phoneNumber = "+96103520863";
              const message = encodeURIComponent(
                `Hello, I'm interested in the following product:\n\n` +
                `Product: ${productData.name}\n` +
                `Price: ${currency}${hasDiscount ? formatPrice(discountedPrice) : formatPrice(productData.price)}\n` +
                `Size: ${size || 'Not selected'}\n\n` +
                `Could you provide more information about this item?`
              );
              window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
            }}
            className='bg-[#25D366] hover:bg-green-500 hover:scale-[.99] transition-transform duration-200 rounded text-white px-4 py-3 text-sm flex items-center justify-center gap-1'
          >
            <FaWhatsapp size={20} />
            <span>INQUIRE VIA WHATSAPP</span>
          </button>
          </div>

          <hr className='mt-8 sm:w-4/5' />
          <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
            <p>100% Original product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within <b>3</b> days.</p>
          </div>
        </div>
      </div>

 {/* Reviews Section  */}
 <div className='mt-20'>
        <div className='flex items-center mb-4'>
          <h2 className='text-xl font-bold'>Website Reviews</h2>
          <span className='ml-2 text-sm text-gray-500'>({reviews.length})</span>
        </div>
        
        <div className='border rounded-lg overflow-hidden'>
          {/* Review submission form */}
          <div className='bg-gray-50 p-6 border-b'>
            <h3 className='font-medium mb-4'>Share Your Experience</h3>
            <form onSubmit={submitReview}>
              <div className='mb-4'>
                <label className='block mb-2 text-sm font-medium'>Your Rating</label>
                <div className='flex gap-1'>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button 
                      key={star}
                      type="button"
                      onClick={() => setUserReview({...userReview, rating: star})}
                      className='text-2xl focus:outline-none'
                    >
                      <span className={star <= userReview.rating ? 'text-yellow-400' : 'text-gray-300'}>★</span>
                    </button>
                  ))}
                </div>
              </div>
              <div className='mb-4'>
                <label className='block mb-2 text-sm font-medium'>Your Review</label>
                <textarea
                  value={userReview.comment}
                  onChange={(e) => setUserReview({...userReview, comment: e.target.value})}
                  className='w-full p-3 border rounded-md focus:ring-gold focus:border-gold'
                  rows={4}
                  placeholder="Share your experience with our website..."
                ></textarea>
              </div>
              <button 
                type="submit"
                disabled={submitLoading}
                className='bg-gold hover:bg-cream hover:text-black text-white px-4 py-2 rounded-md text-sm transition-colors'
              >
                {submitLoading ? 'Submitting...' : 'Submit Review'}
              </button>
            </form>
          </div>
          
          {/* Reviews list */}
          <div className='p-6 max-h-72 overflow-y-auto'>
            <h3 className='font-medium mb-4'>Customer Reviews</h3>
            {reviewsLoading ? (
              <div className='text-center py-8'>
                <div className='inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-gold'></div>
                <p className='mt-2 text-sm text-gray-500'>Loading reviews...</p>
              </div>
            ) : reviews.length === 0 ? (
              <p className='text-center py-8 text-gray-500'>No reviews yet. Be the first to review our website!</p>
            ) : (
              <div className='space-y-6'>
                {reviews.map((review, index) => (
                  <div key={index} className='pb-4 border-b last:border-b-0'>
                    <div className='flex justify-between items-start'>
                      <div>
                        <div className='flex items-center gap-2'>
                          <span className='font-medium'>{review.userName}</span>
                          <div className='flex'>{renderStars(review.rating)}</div>
                        </div>
                        <p className='text-xs text-gray-500 mt-1'>{new Date(review.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <p className='mt-2 text-gray-700'>{review.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* --------- display related products ---------- */}

      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />

    </div>
  ) : <div className=' opacity-0'></div>
}

export default Product
