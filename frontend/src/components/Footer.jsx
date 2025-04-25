import React from 'react'
import { Link } from 'react-router-dom'

import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='bg-cream px-4 sm:px-6 md:px-8'>
      <div className='container mx-auto'>
        <div className='flex flex-col sm:grid sm:grid-cols-2 md:grid-cols-[3fr_1fr_1fr] gap-8 sm:gap-10 md:gap-14 py-10 sm:py-14 md:py-20 text-sm'>

          <div className='mb-6 sm:mb-0'>
          <Link to="/" className="flex-shrink-0 transition-transform hover:scale-105">
                    <h1 className="text-2xl text-black md:text-3xl font-serif font-bold">GRAVO</h1>
                    <p className="text-xs text-gravo-gray tracking-wider text-gold">REDEFINING MEN'S LUXURY</p>
                </Link>
          </div>

          <div className='mb-6 sm:mb-0'>
            <p className='text-lg sm:text-xl font-medium mb-3 sm:mb-5'>COMPANY</p>
            <ul className='flex flex-col gap-2 text-gray-600'>
              <li className='cursor-pointer  transition-colors duration-200 hover:text-gold hover:underline'>Home</li>
              <li className='cursor-pointer duration-200 hover:text-gold hover:underline transition-colors'>About us</li>
              <li className='cursor-pointer duration-200 hover:text-gold hover:underline transition-colors'>Delivery</li>
              <li className='cursor-pointer duration-200 hover:text-gold hover:underline transition-colors'>Privacy policy</li>
            </ul>
          </div>

          <div>
            <p className='text-lg sm:text-xl font-medium mb-3 sm:mb-5'>GET IN TOUCH</p>
            <ul className='flex flex-col gap-2 text-gray-600'>
              <li className='cursor-pointer duration-200 hover:text-gold hover:underline transition-colors'>+961 03 520 863</li>
              <li className='cursor-pointer duration-200 hover:text-gold hover:underline transition-colors'>contact@GRAVOyou.com</li>
            </ul>
          </div>

        </div>

        <div>
          <hr className='border-gray-800' />
          <p className='py-4 sm:py-5 text-xs sm:text-sm text-center text-gray-600'>© 2025 Gravo.com - All Rights Reserved.</p>
        </div>
      </div>
    </div>
  )
}

export default Footer