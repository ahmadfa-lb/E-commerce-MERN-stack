import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { FaSearch } from 'react-icons/fa';
import { LuCircleUserRound } from "react-icons/lu";
import { FiShoppingBag } from "react-icons/fi";
import ProfilePopup from './ProfilePopup';

const Navbar = () => {

    const [visible, setVisible] = useState(false);
    const [showProfilePopup, setShowProfilePopup] = useState(false);

    const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems } = useContext(ShopContext);

    const logout = () => {
        navigate('/login')
        localStorage.removeItem('token')
        setToken('')
        setCartItems({})
    }

    return (
        <div className='sticky w-full top-0 z-50 bg-white px-4 md:px-6 lg:px-8 shadow-lg'>
            <div className='flex items-center justify-between py-4 max-w-7xl mx-auto font-medium'>
                {/* Logo */}
                <Link to="/" className="flex-shrink-0 transition-transform hover:scale-105">
                    <h1 className="text-2xl text-black md:text-3xl font-serif font-bold">GRAVO</h1>
                    <p className="text-xs text-gravo-gray tracking-wider text-gold">REDEFINING MEN'S LUXURY</p>
                </Link>

                <nav className='hidden sm:block'>
                    <ul className='flex gap-6 md:gap-8 text-sm text-gray-700'>
                        <NavLink to="/" className={({ isActive }) => `flex flex-col items-center gap-1 text-black hover:text-gold transition-colors duration-200 ${isActive ? 'text-gold font-semibold border-b-2 border-gold' : ''}`}>
                            <p>HOME</p>
                        </NavLink>
                        <NavLink to='/collection' className={({ isActive }) => `flex flex-col items-center gap-1 hover:text-gold transition-colors duration-200 ${isActive ? 'text-gold font-semibold border-b-2 border-gold' : ''}`}>
                            <p>COLLECTION</p>
                        </NavLink>
                        <NavLink to='/about' className={({ isActive }) => `flex flex-col items-center gap-1 hover:text-gold transition-colors duration-200 ${isActive ? 'text-gold font-semibold border-b-2 border-gold' : ''}`}>
                            <p>ABOUT</p>
                        </NavLink>
                        <NavLink to='/contact' className={({ isActive }) => `flex flex-col items-center gap-1 hover:text-gold transition-colors duration-200 ${isActive ? 'text-gold font-semibold border-b-2 border-gold' : ''}`}>
                            <p>CONTACT</p>
                        </NavLink>
                    </ul>
                </nav>

                <div className='flex items-center gap-4 md:gap-8'>
                    <button
                        onClick={() => { setShowSearch(true); navigate('/collection') }}
                        className='w-5 h-5 opacity-70 hover:opacity-100 transition-opacity duration-200'
                        aria-label="Search"
                    >
                        <FaSearch className='text-black text-2xl hover:text-gold transition-colors duration-200' />
                    </button>

                    <div className='group relative'>
                        <button
                            onClick={() => token ? null : navigate('/login')}
                            className='w-5 h-5 opacity-70 hover:opacity-100 transition-opacity duration-200'
                            aria-label="Profile"
                        >
                            <LuCircleUserRound className='text-black text-3xl hover:text-gold transition-colors duration-200' />
                        </button>

                        {/* Dropdown Menu */}
                        {token &&
                            <div className='group-hover:block hidden absolute right-0 pt-4 z-50'>
                                <div className='flex flex-col w-40 py-3 px-4 bg-white shadow-lg rounded-md text-gray-600'>
                                    <button 
                                        onClick={() => setShowProfilePopup(true)} 
                                        className='text-left py-2 px-2 hover:bg-gray-50 rounded transition-colors duration-150'
                                    >
                                        My Profile
                                    </button>
                                    <button onClick={() => navigate('/orders')} className='text-left py-2 px-2 hover:bg-gray-50 rounded transition-colors duration-150'>Orders</button>
                                    <button onClick={logout} className='text-left py-2 px-2 hover:bg-gray-50 rounded transition-colors duration-150'>Logout</button>
                                </div>
                            </div>}
                    </div>

                    <Link to='/cart' className='relative group'>
                        <div className='w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity duration-200'>
                            <FiShoppingBag className='text-black text-2xl hover:text-gold transition-colors duration-200' />
                        </div>
                        <div className='absolute -right-2 bottom-2 w-4 h-4 flex items-center justify-center bg-black text-white text-xs rounded-full transform group-hover:scale-110 transition-transform duration-200'>
                            {getCartCount()}
                        </div>
                    </Link>

                    <button
                        onClick={() => setVisible(true)}
                        className='w-5 h-5 opacity-70 hover:opacity-100 transition-opacity duration-200 sm:hidden'
                        aria-label="Menu"
                    >
                        <img className='w-full' src={assets.menu_icon} alt="Menu" />
                    </button>
                </div>
            </div>

            {/* Mobile Sidebar Menu */}
            <div className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <div className={`absolute top-0 right-0 bottom-0 w-64 bg-white shadow-xl transition-transform duration-300 ease-in-out ${visible ? 'translate-x-0' : 'translate-x-full'}`}>
                    <div className='flex flex-col h-full'>
                        <div className='p-4 flex items-center justify-between border-b'>
                            <h2 className='font-semibold'>Menu</h2>
                            <button
                                onClick={() => setVisible(false)}
                                className='p-2 rounded-full hover:bg-gray-100 transition-colors'
                                aria-label="Close menu"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className='flex flex-col py-2'>
                            <NavLink onClick={() => setVisible(false)} to="/" className={({ isActive }) => `py-3 px-6 hover:text-gold transition-colors ${isActive ? 'font-semibold bg-cream text-gold' : ''}`}>HOME</NavLink>
                            <NavLink onClick={() => setVisible(false)} to='/collection' className={({ isActive }) => `py-3 px-6 hover:text-gold transition-colors ${isActive ? 'font-semibold bg-cream text-gold' : ''}`}>COLLECTION</NavLink>
                            <NavLink onClick={() => setVisible(false)} to='/about' className={({ isActive }) => `py-3 px-6 hover:text-gold transition-colors ${isActive ? 'font-semibold bg-cream text-gold' : ''}`}>ABOUT</NavLink>
                            <NavLink onClick={() => setVisible(false)} to='/contact' className={({ isActive }) => `py-3 px-6 hover:text-gold transition-colors ${isActive ? 'font-semibold bg-cream text-gold' : ''}`}>CONTACT</NavLink>
                        </div>
                    </div>
                </div>
            </div>

            {/* Profile Popup */}
            <ProfilePopup 
                isOpen={showProfilePopup} 
                onClose={() => setShowProfilePopup(false)} 
            />
        </div>
    )
}

export default Navbar