import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';
import { RiDeleteBinLine } from "react-icons/ri";

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItems[items][item]
            })
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, products])

  return (
    <div className='pt-14 px-4 sm:px-6 md:px-8 lg:px-20 max-w-7xl mx-auto'>
      <div className='mb-6 sm:text-lg'>
        <Title text1={'YOUR'} text2={'CART'}/>
      </div>

      <div className="divide-y divide-gray-200 bg-cream rounded px-4">
        {cartData.length === 0 ? (
          <div className="py-12 text-center text-gray-500 my-10">
            <p className="text-lg mb-4">Your cart is empty</p>
            <button 
              onClick={() => navigate('/')} 
              className="bg-gold text-white px-6 py-2 rounded hover:scale-105 duration-200 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          cartData.map((item, index) => {
            const productData = products.find((product) => product._id === item._id);

            return (
              <div key={index} className='py-6 text-gray-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4'>
                <div className='flex items-start gap-4 flex-grow'>
                  <img 
                    className='w-20 h-20 object-cover rounded shadow-sm' 
                    src={productData.image[0]} 
                    alt={productData.name} 
                  />
                  <div className="flex-grow">
                    <p className='text-base sm:text-lg font-medium mb-1'>{productData.name}</p>
                    <div className='flex flex-wrap items-center gap-3 mt-1'>
                      {productData.discount ? (
                        <>
                          <p className='text-red-600 font-bold text-lg'>{currency}{Number((productData.price * (1 - productData.discount / 100 ))).toFixed(2)}</p>
                          <p className='line-through text-gray-500'>{currency}{productData.price}</p>
                        </>
                      ) : (
                        <p className="font-medium">{currency}{productData.price}</p>
                      )}
                      <span className='px-3 py-1 border border-gold bg-cream rounded-md text-sm'>{item.size}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 mt-3 sm:mt-0">
                  <div className="flex items-center">
                    <label htmlFor={`quantity-${item._id}-${item.size}`} className="sr-only">Quantity</label>
                    <input 
                      id={`quantity-${item._id}-${item.size}`}
                      onChange={(e) => e.target.value === '' || e.target.value === '0' ? null : updateQuantity(item._id, item.size, Number(e.target.value))} 
                      className='border-2 rounded border-gray-300 focus:border-black focus:ring-0 w-16 py-1 px-2 text-center' 
                      type="number" 
                      min={1} 
                      defaultValue={item.quantity} 
                    />
                  </div>
                  <button 
                    onClick={() => updateQuantity(item._id, item.size, 0)} 
                    className='text-gray-600 hover:text-red-600 hover:bg-red-200 rounded-full transition-colors p-2'
                    aria-label="Remove item"
                  >
                    <RiDeleteBinLine className='w-5 h-5' />
                  </button>
                </div>
              </div>
            )
          })
        )}
      </div>

      {cartData.length > 0 && (
        <div className='mt-8 mb-16'>
          <div className='ml-auto w-full md:w-2/3 lg:w-1/2 bg-gray-50 p-6 rounded-lg shadow-sm'>
            <CartTotal />
            <div className='flex justify-end mt-6'>
              <button 
                onClick={() => navigate('/place-order')} 
                className='bg-black text-white font-medium px-8 py-3 rounded hover:bg-gray-800 transition-colors'
              >
                PROCEED TO CHECKOUT
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart