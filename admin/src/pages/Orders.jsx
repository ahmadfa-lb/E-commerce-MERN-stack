// import React from 'react'
// import { useEffect } from 'react'
// import { useState } from 'react'
// import axios from 'axios'
// import { backendUrl, currency } from '../App'
// import { toast } from 'react-toastify'
// import { assets } from '../assets/assets'

// const Orders = ({ token }) => {

//   const [orders, setOrders] = useState([])

//   const fetchAllOrders = async () => {

//     if (!token) {
//       return null;
//     }

//     try {

//       const response = await axios.post(backendUrl + '/api/order/list', {}, { headers: { token } })
//       if (response.data.success) {
//         setOrders(response.data.orders.reverse())
//       } else {
//         toast.error(response.data.message)
//       }

//     } catch (error) {
//       toast.error(error.message)
//     }


//   }

//   const statusHandler = async ( event, orderId ) => {
//     try {
//       const response = await axios.post(backendUrl + '/api/order/status' , {orderId, status:event.target.value}, { headers: {token}})
//       if (response.data.success) {
//         await fetchAllOrders()
//       }
//     } catch (error) {
//       console.log(error)
//       toast.error(response.data.message)
//     }
//   }

//   useEffect(() => {
//     fetchAllOrders();
//   }, [token])

//   return (
//     <div>
//       <h3>Order Page</h3>
//       <div>
//         {
//           orders.map((order, index) => (
//             <div className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700' key={index}>
//               <img className='w-12' src={assets.parcel_icon} alt="" />
//               <div>
//                 <div>
//                   {order.items.map((item, index) => {
//                     if (index === order.items.length - 1) {
//                       return <p className='py-0.5' key={index}> {item.name} x {item.quantity} <span> {item.size} </span> </p>
//                     }
//                     else {
//                       return <p className='py-0.5' key={index}> {item.name} x {item.quantity} <span> {item.size} </span> ,</p>
//                     }
//                   })}
//                 </div>
//                 <p className='mt-3 mb-2 font-medium'>{order.address.firstName + " " + order.address.lastName}</p>
//                 <div>
//                   <p>{order.address.street + ","}</p>
//                   <p>{order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipcode}</p>
//                 </div>
//                 <p>{order.address.phone}</p>
//               </div>
//               <div>
//                 <p className='text-sm sm:text-[15px]'>Items : {order.items.length}</p>
//                 <p className='mt-3'>Method : {order.paymentMethod}</p>
//                 <p>Payment : { order.payment ? 'Done' : 'Pending' }</p>
//                 <p>Date : {new Date(order.date).toLocaleDateString()}</p>
//               </div>
//               <p className='text-sm sm:text-[15px]'>{currency}{order.amount}</p>
//               <select onChange={(event)=>statusHandler(event,order._id)} value={order.status} className='p-2 font-semibold'>
//                 <option value="Order Placed">Order Placed</option>
//                 <option value="Packing">Packing</option>
//                 <option value="Shipped">Shipped</option>
//                 <option value="Out for delivery">Out for delivery</option>
//                 <option value="Delivered">Delivered</option>
//               </select>
//             </div>
//           ))
//         }
//       </div>
//     </div>
//   )
// }

// export default Orders


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';
import { Package, RefreshCw, Truck, MapPin, Calendar, CreditCard, DollarSign } from 'lucide-react';

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllOrders = async () => {
    if (!token) {
      setLoading(false);
      return null;
    }

    setLoading(true);
    try {
      console.log(token);
      const response = await axios.post(
        backendUrl + '/api/order/list', 
        {}, 
        { headers: { token } }
      );
      
      if (response.data.success) {
        setOrders(response.data.orders.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const statusHandler = async (event, orderId) => {
    const newStatus = event.target.value;
    
    try {
      const response = await axios.post(
        backendUrl + '/api/order/status', 
        { orderId, status: newStatus }, 
        { headers: { token } }
      );
      
      if (response.data.success) {
        await fetchAllOrders();
        toast.success("Order status updated successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Failed to update order status");
    }
  };

  // New function to update payment status
  const updatePaymentStatus = async (orderId, paymentStatus) => {
    try {
      const response = await axios.post(
        backendUrl + '/api/order/payment', 
        { 
          orderId, 
          payment: paymentStatus 
        }, 
        { headers: { token } }
      );
      
      if (response.data.success) {
        await fetchAllOrders();
        toast.success(`Payment marked as ${paymentStatus ? 'paid' : 'pending'}`);
      } else {
        // Handle unsuccessful response
        toast.error(response.data.message || "Failed to update payment status");
      }
    } catch (error) {
      console.error('Payment update error:', error);
      toast.error(error.response?.data?.message || error.message || "Failed to update payment status");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  // Status color mapping
  const statusColors = {
    "Order Placed": "bg-blue-50 text-blue-700",
    "Packing": "bg-yellow-50 text-yellow-700",
    "Shipped": "bg-purple-50 text-purple-700",
    "Out for delivery": "bg-orange-50 text-orange-700",
    "Delivered": "bg-green-50 text-green-700"
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-3 sm:p-6 w-full max-w-full overflow-hidden">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4 sm:mb-6">
        <div className="flex items-center gap-2">
          <Truck className="text-gold" size={20} />
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Orders Management</h2>
        </div>
        <button 
          onClick={fetchAllOrders}
          className="flex items-center gap-2 px-3 py-1 sm:px-4 sm:py-2 bg-gold hover:bg-cream text-white hover:text-black hover:scale-105 rounded-md transition-all text-sm"
        >
          <RefreshCw size={14} />
          <span>Refresh Orders</span>
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold"></div>
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          No orders available
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {orders.map((order, index) => (
            <div 
              key={index} 
              className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Order header with status */}
              <div className="bg-gray-50 p-3 flex flex-col sm:flex-row justify-between items-start sm:items-center border-b">
                <div className="flex items-center gap-2">
                  <Package className="text-gold" size={18} />
                  <span className="font-medium">Order #{order._id.slice(-6)}</span>
                  <span className="text-sm text-gray-500">{new Date(order.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2 mt-2 sm:mt-0">
                  <button
                    onClick={() => updatePaymentStatus(order._id, !order.payment)}
                    className={`flex items-center gap-1 text-xs px-3 py-1 rounded-full transition-colors ${
                      order.payment 
                        ? 'bg-green-50 text-green-700 hover:bg-green-100' 
                        : 'bg-red-50 text-red-700 hover:bg-red-100'
                    }`}
                  >
                    <DollarSign size={12} />
                    {order.payment ? 'Paid' : 'Mark as Paid'}
                  </button>
                  <span className="font-semibold text-gray-900">{currency}{(order.amount).toFixed(2)}</span>
                </div>
              </div>

              {/* Order content */}
              <div className="grid grid-cols-1 lg:grid-cols-[2fr_2fr_1fr] gap-4 p-4">
                {/* Order items */}
                <div className='max-h-48 overflow-y-auto'>
                  <h3 className="text-sm sticky p-1 rounded top-0 bg-cream text-black font-semibold mb-2 flex items-center gap-1">
                    <Package size={14} />
                    Items ({order.items.length})
                  </h3>
                  <div className="bg-gray-100 p-3 rounded-md">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="py-1 border-b last:border-0 text-sm">
                        <div className="flex justify-between">
                          <span>{item.name} × {item.quantity}</span>
                          {item.size && <span className="text-gray-500 text-xs">Size: {item.size}</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Shipping details */}
                <div>
                  <h3 className="text-sm font-semibold bg-cream text-black p-1 rounded mb-2 flex items-center gap-1">
                    <MapPin size={14} />
                    Shipping Details
                  </h3>
                  <div className="bg-gray-100 p-3 rounded-md">
                    <p className="font-medium mb-1">{order.address.firstName} {order.address.lastName}</p>
                    <p className="text-sm text-gray-700">{order.address.street}</p>
                    <p className="text-sm text-gray-700">
                      {order.address.city}, {order.address.country}. 
                    </p>
                    <p className="text-sm text-gray-700 mt-1">📞 {order.address.phone}</p>
                  </div>
                </div>

                {/* Order actions */}
                <div>
                  <h3 className="text-sm bg-cream p-1 rounded font-semibold mb-2 flex items-center text-black gap-1">
                    <CreditCard size={14} />
                    Payment Method
                  </h3>
                  <div className="text-sm mb-3 bg-gray-100 p-3 rounded-md">
                    {order.paymentMethod}
                  </div>
                  
                  <h3 className="text-sm font-semibold mb-2">Status</h3>
                  <select 
                    onChange={(event) => statusHandler(event, order._id)} 
                    value={order.status} 
                    className="w-full p-2 border border-gray-300 rounded text-sm bg-white focus:border-gold focus:ring-2 focus:ring-gold focus:outline-none transition-colors"
                  >
                    <option value="Order Placed">Order Placed</option>
                    <option value="Packing">Packing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Out for delivery">Out for delivery</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                  
                  <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} />
                      {new Date(order.date).toLocaleDateString()}
                    </span>
                    <span className={`px-2 py-1 rounded-full ${statusColors[order.status] || "bg-gray-100 text-gray-700"}`}>
                      {order.status}
                    </span>
                  </div>
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