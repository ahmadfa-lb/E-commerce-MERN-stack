import React from 'react'
import { IoLogOut } from "react-icons/io5";
import { assets } from '../assets/assets'

const Navbar = ({ setToken }) => {
  return (
    <div className='w-full sticky top-0 z-50 flex bg-white items-center shadow-md py-2 px-[4%] justify-between'>
      <div className="flex-shrink-0 transition-transform hover:scale-105">
        <h1 className="text-2xl text-black md:text-3xl font-serif font-bold">GRAVO</h1>
        <p className="text-xs text-gravo-gray tracking-wider text-gold">REDEFINING MEN'S LUXURY</p>
      </div>
      <div className='flex flex-row gap-1 cursor-pointer bg-gold text-white px-4 py-2 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm  transition-colors duration-200 hover:bg-cream hover:text-black hover:scale-105' onClick={() => setToken('')}>
        <span>Logout</span>
        <button>
          <IoLogOut className='w-4 h-4 sm:h-6 sm:w-6'/>
        </button>
      </div>

    </div>
  )
}

export default Navbar