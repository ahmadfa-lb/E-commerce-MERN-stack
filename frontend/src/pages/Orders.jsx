// import React, { useContext, useEffect, useState } from 'react'
// import { ShopContext } from '../context/ShopContext'
// import Title from '../components/Title';
// import axios from 'axios';

// const Orders = () => {

//   const { backendUrl, token , currency} = useContext(ShopContext);

//   const [orderData,setorderData] = useState([])

//   const loadOrderData = async () => {
//     try {
//       if (!token) {
//         return null
//       }

//       const response = await axios.post(backendUrl + '/api/order/userorders',{},{headers:{token}})
//       if (response.data.success) {
//         let allOrdersItem = []
//         response.data.orders.map((order)=>{
//           order.items.map((item)=>{
//             item['status'] = order.status
//             item['payment'] = order.payment
//             item['paymentMethod'] = order.paymentMethod
//             item['date'] = order.date
//             allOrdersItem.push(item)
//           })
//         })
//         setorderData(allOrdersItem.reverse())
//       }
      
//     } catch (error) {
      
//     }
//   }

//   useEffect(()=>{
//     loadOrderData()
//   },[token])

//   return (
//     <div className='border-t pt-16 mb-10'>

//         <div className='text-2xl'>
//             <Title text1={'MY'} text2={'ORDERS'}/>
//         </div>

//         <div>
//             {
//               orderData.map((item,index) => (
//                 <div key={index} className='py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
//                     <div className='flex items-start gap-6 text-sm'>
//                         <img className='w-16 sm:w-20' src={item.image[0]} alt="" />
//                         <div>
//                           <p className='sm:text-base font-medium'>{item.name}</p>
//                           <div className='flex items-center gap-3 mt-1 text-base text-gray-700'>
//                             <p>{currency}{item.price}</p>
//                             <p>Quantity: {item.quantity}</p>
//                             <p>Size: {item.size}</p>
//                           </div>
//                           <p className='mt-1'>Date: <span className=' text-gray-400'>{new Date(item.date).toDateString()}</span></p>
//                           <p className='mt-1'>Payment: <span className=' text-gray-400'>{item.paymentMethod}</span></p>
//                         </div>
//                     </div>
//                     <div className='md:w-1/2 flex justify-between'>
//                         <div className='flex items-center gap-2'>
//                             <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
//                             <p className='text-sm md:text-base'>{item.status}</p>
//                         </div>
//                         <button onClick={loadOrderData} className='border px-4 py-2 text-sm font-medium rounded-sm'>Track Order</button>
//                     </div>
//                 </div>
//               ))
//             }
//         </div>
//     </div>
//   )
// }

// export default Orders



// import React, { useContext, useEffect, useState } from 'react';
// import { ShopContext } from '../context/ShopContext';
// import Title from '../components/Title';
// import axios from 'axios';
// import { FaInstagram, FaWhatsapp } from "react-icons/fa";


// const Orders = () => {
//   const { backendUrl, token, currency } = useContext(ShopContext);
//   const [orderData, setorderData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const loadOrderData = async () => {
//     try {
//       if (!token) {
//         setLoading(false);
//         return null;
//       }
      
//       setLoading(true);
//       const response = await axios.post(
//         backendUrl + '/api/order/userorders',
//         {},
//         { headers: { token } }
//       );
      
//       if (response.data.success) {
//         let allOrdersItem = [];
//         response.data.orders.map((order) => {
//           order.items.map((item) => {
//             item['status'] = order.status;
//             item['payment'] = order.payment;
//             item['paymentMethod'] = order.paymentMethod;
//             item['date'] = order.date;
//             allOrdersItem.push(item);
//           });
//         });
//         setorderData(allOrdersItem.reverse());
//       }
//       setLoading(false);
//     } catch (error) {
//       setLoading(false);
//     }
//   };
  
//   useEffect(() => {
//     loadOrderData();
//   }, [token]);

//   return (
//     <div className="max-w-6xl mx-auto px-4 sm:px-6 border-t pt-8 sm:pt-12 lg:pt-16 mb-10">
//       <div className="mb-8 sm:mb-12">
//         <Title text1={'MY'} text2={'ORDERS'} />
//       </div>
      
//       {loading ? (
//         <div className="flex justify-center py-10">
//           <div className="animate-pulse text-gray-500">Loading orders...</div>
//         </div>
//       ) : orderData.length === 0 ? (
//         <div className="text-center py-10 text-gray-500">
//           <p>No orders found</p>
//         </div>
//       ) : (
//         <div className="space-y-4 max-h-96 overflow-y-auto sm:space-y-6">
//           {orderData.map((item, index) => (
//             <div
//               key={index}
//               className="py-4 px-4 sm:px-6 border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white"
//             >
//               <div className="flex items-start gap-4 sm:gap-6 text-sm">
//                 <div className="flex-shrink-0">
//                   <img
//                     className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-md"
//                     src={item.image[0]}
//                     alt={item.name}
//                   />
//                 </div>
//                 <div className="flex-1 min-w-0">
//                   <p className="sm:text-base font-medium text-gray-900 truncate">{item.name}</p>
//                   <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-sm text-gray-700">
//                     <p className="font-medium">{currency}{item.price}</p>
//                     <p>Qty: {item.quantity}</p>
//                     <p>Size: {item.size}</p>
//                   </div>
//                   <p className="mt-2 text-xs sm:text-sm text-gray-600">
//                     Date: <span className="text-gray-500">{new Date(item.date).toDateString()}</span>
//                   </p>
//                   <p className="mt-1 text-xs sm:text-sm text-gray-600">
//                     Payment: <span className="text-gray-500">{item.paymentMethod}</span>
//                   </p>
//                 </div>
//               </div>
//               <div className="md:w-1/3 lg:w-1/4 flex flex-col sm:flex-row md:flex-col lg:flex-row gap-3 justify-between items-start sm:items-center md:items-end lg:items-center">
//                 <div className="flex items-center gap-2">
//                   <div className={`w-2 h-2 rounded-full ${
//                     item.status === 'Delivered' ? 'bg-green-500' :
//                     item.status === 'Shipped' ? 'bg-blue-500' :
//                     item.status === 'Processing' ? 'bg-yellow-500' : 'bg-gray-500'
//                   }`}></div>
//                   <p className="text-sm font-medium">{item.status}</p>
//                 </div>
//                 <button
//                   onClick={() => loadOrderData()}
//                   className="border border-gray-300 hover:border-gray-400 px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
//                 >
//                   Track Order
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Orders;





import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import axios from 'axios';
import { FaInstagram, FaWhatsapp } from "react-icons/fa";

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadOrderData = async () => {
    try {
      if (!token) {
        setLoading(false);
        return null;
      }
      
      setLoading(true);
      const response = await axios.post(
        backendUrl + '/api/order/userorders',
        {},
        { headers: { token } }
      );
      
      if (response.data.success) {
        // Keep orders grouped together instead of flattening them
        setOrders(response.data.orders.reverse());
      }
      setLoading(false);
    } catch (error) {
      console.error("Error loading orders:", error);
      setLoading(false);
    }
  };
  
  useEffect(() => {
    loadOrderData();
  }, [token]);

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 border-t pt-8 sm:pt-12 lg:pt-16 mb-10">
      <div className="mb-8 sm:mb-12">
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>
      
      {loading ? (
        <div className="flex justify-center py-10">
          <div className="animate-pulse text-gray-500">Loading orders...</div>
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          <p>No orders found</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order, orderIndex) => (
            <div 
              key={orderIndex}
              className="border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 bg-white overflow-hidden"
            >
              {/* Order header */}
              <div className="bg-cream px-4 py-3 sm:px-6 border-b flex flex-wrap justify-between items-center gap-2">
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Order #{order._id.slice(-10)}
                  </p>
                  <p className="text-xs text-gray-500">
                    Placed on {formatDate(order.date)}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${
                      order.status === 'Delivered' ? 'bg-green-500' :
                      order.status === 'Shipped' ? 'bg-blue-500' :
                      order.status === 'Out for delivery' ? 'bg-purple-500' :
                      order.status === 'Packing' ? 'bg-yellow-500' : 'bg-gray-500'
                    }`}></div>
                    <p className="text-sm font-medium">{order.status}</p>
                  </div>
                  <button
                    onClick={() => loadOrderData()}
                    className="border border-gray-300 hover:border-gray-400 px-3 py-1 text-xs font-medium rounded-md transition-colors duration-200 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                  >
                    Track Order
                  </button>
                </div>
              </div>
              
              {/* Order items */}
              <div className="divide-y divide-gray-100">
                {order.items.map((item, itemIndex) => (
                  <div 
                    key={itemIndex}
                    className="py-4 px-4 sm:px-6 flex flex-col sm:flex-row gap-4 items-start"
                  >
                    <div className="flex-shrink-0">
                      <img
                        className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-md"
                        src={item.image[0]}
                        alt={item.name}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="sm:text-base font-medium text-gray-900">{item.name}</p>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-sm text-gray-700">
                        <p className="font-medium">{currency}{item.price}</p>
                        <p>Qty: {item.quantity}</p>
                        {item.size && <p>Size: {item.size}</p>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Order footer */}
              <div className="bg-gray-50 px-4 py-3 sm:px-6 border-t flex flex-wrap justify-between items-center gap-2">
                <div className="text-xs sm:text-sm text-gray-600">
                  Payment: <span className="text-gray-900 font-medium">{order.paymentMethod}</span>
                </div>
                <div className="text-xs sm:text-sm text-gray-600">
                  Status: <span className="text-gray-900 font-medium">{order.payment ? 'Paid' : 'Pending'}</span>
                </div>
                <div className="text-sm font-medium text-gray-900">
                  Total: {currency}{order.amount}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;