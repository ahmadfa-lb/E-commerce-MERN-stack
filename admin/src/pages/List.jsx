import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';
import { Trash2, RefreshCw, ShoppingBag, Edit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const List = ({ token }) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchList = async () => {
    setLoading(true);
    try {
      const response = await axios.get(backendUrl + '/api/product/list');
      if (response.data.success) {
        setList(response.data.products.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        backendUrl + '/api/product/remove',
        { id },
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Function to navigate to edit product page
  const editProduct = (id) => {
    navigate(`/edit-product/${id}`);
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-md p-3 sm:p-6 w-full max-w-full overflow-hidden">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4 sm:mb-6">
        <div className="flex items-center gap-2">
          <ShoppingBag className="text-gold" size={20} />
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Products List</h2>
        </div>
        <button 
          onClick={fetchList} 
          className="flex items-center gap-2 px-3 py-1 sm:px-4 sm:py-2 bg-gold hover:bg-cream hover:text-black text-white hover:scale-105 rounded-md transition-all text-sm"
        >
          <RefreshCw size={14} /> 
          <span>Refresh</span>
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold"></div>
        </div>
      ) : list.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          No products available
        </div>
      ) : (
        <div className="overflow-x-auto -mx-3 sm:mx-0">
          {/* Table Header - Only visible on md and up */}
          <div className="hidden md:grid grid-cols-[1fr,2fr,1fr,1fr,1fr,1fr] items-center p-3 bg-gray-100 text-gray-700 font-semibold rounded-t-lg">
            <div>Image</div>
            <div>Name</div>
            <div>Category</div>
            <div className='text-center'>Price</div>
            <div className='text-center'>Discount</div>
            <div className="text-center">Actions</div>
          </div>

          {/* Table Body */}
          <div className="flex flex-col gap-1">
            {list.map((item, index) => (
              <div 
                key={index}
                className="grid grid-cols-2 sm:grid-cols-[1fr,2fr,1fr,1fr,1fr,1fr] md:grid-cols-[1fr_2fr_1fr_1fr_1fr,1fr] items-center gap-2 p-3 border-b hover:bg-gray-50 transition-colors"
              >
                {/* Image - Full width on xs, normal on larger screens */}
                <div className="col-span-2 sm:col-span-1 flex justify-center sm:justify-start mb-2 sm:mb-0">
                  <img 
                    className="w-24 h-24 sm:w-16 sm:h-16 object-cover rounded-md shadow-sm" 
                    src={item.image[0]} 
                    alt={item.name}
                  />
                </div>
                
                {/* Product details - stacked on mobile, horizontal on larger screens */}
                <div className="flex flex-col sm:flex-row">
                  <div className="font-medium text-gray-800 mb-1 sm:mb-0">{item.name}</div>
                  <div className="block sm:hidden text-sm text-gray-500">
                  • C: {item.category}  
                  </div>
                  <div className="block sm:hidden text-sm text-gray-500">
                     • P: {currency}{item.price}  
                  </div>
                  <div className="block sm:hidden text-sm text-gray-500">
                     • D: {item.discount ? <>{item.discount}%</> : '-'}
                  </div>
                </div>
                
                {/* Category - hidden on xs, visible on sm and up */}
                <div className="hidden sm:flex sm:justify-start">
                  <div className=" text-black rounded-full bg-cream py-1 px-3 text-[1rem] text-center w-full md:w-auto">
                    {item.category}
                  </div>
                </div>
                
                {/* Price - hidden on xs, visible on md and up */}
                <div className="hidden sm:flex sm:justify-center md:flex md:justify-center font-semibold text-gray-900">
                  {item.price} {currency}
                </div>

                <div className="hidden sm:flex sm:justify-center md:flex md:justify-center font-semibold text-gray-900">
                 {item.discount ? <>{item.discount} %</> : '-'}
                </div>
                
                {/* Action buttons */}
                <div className="flex justify-center space-x-2">
                  <button
                    onClick={() => editProduct(item._id)}
                    className="p-2 text-blue-500 hover:bg-blue-50 rounded-full transition-colors"
                    aria-label="Edit product"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => removeProduct(item._id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                    aria-label="Delete product"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default List;


// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { backendUrl, currency } from '../App';
// import { toast } from 'react-toastify';
// import { Trash2, RefreshCw, ShoppingBag } from 'lucide-react';

// const List = ({ token }) => {
//   const [list, setList] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchList = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get(backendUrl + '/api/product/list');
//       if (response.data.success) {
//         setList(response.data.products.reverse());
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const removeProduct = async (id) => {
//     try {
//       const response = await axios.post(
//         backendUrl + '/api/product/remove',
//         { id },
//         { headers: { token } }
//       );

//       if (response.data.success) {
//         toast.success(response.data.message);
//         await fetchList();
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.message);
//     }
//   };

//   useEffect(() => {
//     fetchList();
//   }, []);

//   return (
//     <div className="bg-white rounded-lg shadow-md p-3 sm:p-6 w-full max-w-full overflow-hidden">
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4 sm:mb-6">
//         <div className="flex items-center gap-2">
//           <ShoppingBag className="text-gold" size={20} />
//           <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Products List</h2>
//         </div>
//         <button 
//           onClick={fetchList} 
//           className="flex items-center gap-2 px-3 py-1 sm:px-4 sm:py-2 bg-gold hover:bg-cream hover:text-black text-white hover:scale-105 rounded-md transition-all text-sm"
//         >
//           <RefreshCw size={14} /> 
//           <span>Refresh</span>
//         </button>
//       </div>

//       {loading ? (
//         <div className="flex justify-center items-center h-40">
//           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold"></div>
//         </div>
//       ) : list.length === 0 ? (
//         <div className="text-center py-10 text-gray-500">
//           No products available
//         </div>
//       ) : (
//         <div className="overflow-x-auto -mx-3 sm:mx-0">
//           {/* Table Header - Only visible on md and up */}
//           <div className="hidden md:grid grid-cols-[1fr,3fr,1fr,1fr,1fr] items-center p-3 bg-gray-100 text-gray-700 font-semibold rounded-t-lg">
//             <div>Image</div>
//             <div>Name</div>
//             <div>Category</div>
//             <div>Price</div>
//             <div className="text-center">Action</div>
//           </div>

//           {/* Table Body */}
//           <div className="flex flex-col gap-1">
//             {list.map((item, index) => (
//               <div 
//                 key={index}
//                 className="grid grid-cols-2  sm:grid-cols-[1fr,3fr,1fr,1fr,1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 p-3 border-b hover:bg-gray-50 transition-colors"
//               >
//                 {/* Image - Full width on xs, normal on larger screens */}
//                 <div className="col-span-2 sm:col-span-1 flex justify-center sm:justify-start mb-2 sm:mb-0">
//                   <img 
//                     className="w-24 h-24 sm:w-16 sm:h-16 object-cover rounded-md shadow-sm" 
//                     src={item.image[0]} 
//                     alt={item.name}
//                   />
//                 </div>
                
//                 {/* Product details - stacked on mobile, horizontal on larger screens */}
//                 <div className="flex flex-col sm:flex-row">
//                   <div className="font-medium text-gray-800 mb-1 sm:mb-0">{item.name}</div>
//                   <div className="block sm:hidden text-sm text-gray-500">
//                     {item.category} • {currency}{item.price}
//                   </div>
//                 </div>
                
//                 {/* Category - hidden on xs, visible on sm and up */}
//                 <div className="hidden sm:flex sm:justify-start">
//                   <div className=" text-black rounded-full bg-cream py-1 px-3 text-[1rem] text-center w-full md:w-auto">
//                     {item.category}
//                   </div>
//                 </div>
                
//                 {/* Price - hidden on xs, visible on md and up */}
//                 <div className="hidden md:block font-semibold text-gray-900">
//                   {currency}{item.price}
//                 </div>
                
//                 {/* Action button */}
//                 <div className="flex justify-center">
//                   <button
//                     onClick={() => removeProduct(item._id)}
//                     className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
//                     aria-label="Delete product"
//                   >
//                     <Trash2 size={18} />
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default List;










// import axios from 'axios'
// import React, { useEffect, useState } from 'react'
// import { backendUrl, currency } from '../App'
// import { toast } from 'react-toastify'

// const List = ({ token }) => {

//   const [list, setList] = useState([])

//   const fetchList = async () => {
//     try {

//       const response = await axios.get(backendUrl + '/api/product/list')
//       if (response.data.success) {
//         setList(response.data.products.reverse());
//       }
//       else {
//         toast.error(response.data.message)
//       }

//     } catch (error) {
//       console.log(error)
//       toast.error(error.message)
//     }
//   }

//   const removeProduct = async (id) => {
//     try {

//       const response = await axios.post(backendUrl + '/api/product/remove', { id }, { headers: { token } })

//       if (response.data.success) {
//         toast.success(response.data.message)
//         await fetchList();
//       } else {
//         toast.error(response.data.message)
//       }

//     } catch (error) {
//       console.log(error)
//       toast.error(error.message)
//     }
//   }

//   useEffect(() => {
//     fetchList()
//   }, [])

//   return (
//     <>
//       <p className='mb-2'>All Products List</p>
//       <div className='flex flex-col gap-2'>

//         {/* ------- List Table Title ---------- */}

//         <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm'>
//           <b>Image</b>
//           <b>Name</b>
//           <b>Category</b>
//           <b>Price</b>
//           <b className='text-center'>Action</b>
//         </div>

//         {/* ------ Product List ------ */}

//         {
//           list.map((item, index) => (
//             <div className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm' key={index}>
//               <img className='w-12' src={item.image[0]} alt="" />
//               <p>{item.name}</p>
//               <p>{item.category}</p>
//               <p>{currency}{item.price}</p>
//               <p onClick={()=>removeProduct(item._id)} className='text-right md:text-center cursor-pointer text-lg'>X</p>
//             </div>
//           ))
//         }

//       </div>
//     </>
//   )
// }

// export default List



