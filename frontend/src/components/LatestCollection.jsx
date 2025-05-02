import React, { useContext, useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';


const LatestCollection = () => {
  const { products, navigate } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    setLatestProducts(products.slice(0, 8));
  }, [products])

  return (
    <div className='flex flex-col my-10 sm:mx-20'>
      <div className='text-center py-8 text-3xl'>
        <Title text1={'LATEST'} text2={'COLLECTIONS'} />
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
          Explore our latest collections featuring the finest fabrics and impeccable tailoring for the discerning gentleman.
        </p>
      </div>

      {/* Rendering Products */}
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 gap-y-6'>
        {
          latestProducts.map((item, index) => (
            <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} discount={item.discount} />
          ))
        }
      </div>
      <button onClick={() => navigate("/collection")} className="items-center justify-center bg-gold text-white mt-6 py-3 px-3 sm:px-6 rounded-md hover:bg-cream hover:text-black shadow-md mx-auto transition-transform hover:scale-105">
                  See full collections  
      </button>
    </div>
  )
}

export default LatestCollection
