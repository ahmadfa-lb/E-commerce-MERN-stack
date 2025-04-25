import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'

const ProductItem = ({ id, image, name, price, discount }) => {
    const { currency } = useContext(ShopContext);

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
    const discountedPrice = calculateDiscountedPrice(price, discount);
    const hasDiscount = discount && discount > 0;

    return (
        <Link onClick={() => scrollTo(0, 0)} className='text-gray-700 cursor-pointer block group' to={`/product/${id}`}>
            <div className='overflow-hidden w-full pb-[130%] relative rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300'>
                {/* Inclined discount badge */}
                {hasDiscount ? <>
                    <div className=''>
                    <img
                        className='group-hover:scale-110 transition ease-in-out duration-300 absolute top-0 left-0 w-full h-full object-cover object-center'
                        src={image[0]}
                        alt={name}
                    />
                        <div className='bg-gold absolute top-4 right-0 z-10 text-white font-bold py-2 w-96 text-center transform rotate-45 translate-x-36 shadow-md'>
                            <span className='text-xs md:text-sm'>{discount}% OFF</span>
                        </div>
                    </div>
                </> : <>
                    <img
                        className='group-hover:scale-110 transition ease-in-out duration-300 absolute top-0 left-0 w-full h-full object-cover object-center'
                        src={image[0]}
                        alt={name}
                    /></>}

                {/* Quick view overlay on hover */}
                <div className='absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100'>
                    <span className='bg-white text-gray-800 py-2 px-4 rounded-full text-sm font-medium shadow-lg'>
                        Quick View
                    </span>
                </div>
            </div>

            <div className='pt-4 pb-2'>
                <p className='text-sm md:text-base font-medium truncate'>{name}</p>

                <div className='flex flex-wrap items-center gap-2 mt-1'>
                    {hasDiscount ? (
                        <>
                            <span className='text-base md:text-lg font-bold text-red-600'>{currency}{formatPrice(discountedPrice)}</span>
                            <span className='text-xs md:text-sm font-medium line-through text-gray-500'>{currency}{formatPrice(price)}</span>
                        </>
                    ) : (
                        <span className='text-base md:text-lg font-medium text-gray-800'>{currency}{formatPrice(price)}</span>
                    )}
                </div>
            </div>
        </Link>
    )
}

export default ProductItem