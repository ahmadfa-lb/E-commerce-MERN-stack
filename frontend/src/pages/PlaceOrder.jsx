import React, { useContext, useState, useEffect } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const PlaceOrder = () => {
    const [method, setMethod] = useState('cod');
    const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products } = useContext(ShopContext);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        street: '',
        city: '',
        country: '',
        phone: ''
    })

    const onChangeHandler = (event) => {
        const name = event.target.name
        const value = event.target.value
        setFormData(data => ({ ...data, [name]: value }))
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault()
        try {
            let orderItems = []

            for (const items in cartItems) {
                for (const item in cartItems[items]) {
                    if (cartItems[items][item] > 0) {
                        const itemInfo = structuredClone(products.find(product => product._id === items))
                        if (itemInfo) {
                            itemInfo.size = item
                            itemInfo.quantity = cartItems[items][item]
                            orderItems.push(itemInfo)
                        }
                    }
                }
            }

            let orderData = {
                address: formData,
                items: orderItems,
                amount: getCartAmount() + delivery_fee
            }
            
            switch (method) {
                // API Calls for COD
                case 'cod':
                    const response = await axios.post(backendUrl + '/api/order/place', orderData, {headers:{token}})
                    if (response.data.success) {
                        setCartItems({})
                        navigate('/orders')
                    } else {
                        toast.error(response.data.message)
                    }
                    break;
                    // we can add more methods .....
                default:
                    break;
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

    return (
        <div className="bg-gray-50 min-h-screen py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
                    <p className="mt-2 text-sm text-gray-600">Complete your order by providing delivery and payment details</p>
                </div>
                
                <form onSubmit={onSubmitHandler} className="bg-white shadow-lg rounded-lg overflow-hidden">
                    <div className="flex flex-col lg:flex-row">
                        {/* ------------- Left Side (Delivery Information) ---------------- */}
                        <div className="flex-1 p-6 lg:p-8 border-b lg:border-b-0 lg:border-r border-gray-200">
                            <div className="mb-6">
                                <Title text1={'DELIVERY'} text2={'INFORMATION'} />
                            </div>
                            
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                                        <input 
                                            required 
                                            id="firstName"
                                            onChange={onChangeHandler} 
                                            name="firstName" 
                                            value={formData.firstName} 
                                            className="border border-gray-300 rounded-md py-2 px-3 w-full focus:ring-2 outline-none focus:ring-gold focus:border-gold transition" 
                                            type="text" 
                                            placeholder="John" 
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                                        <input 
                                            required 
                                            id="lastName"
                                            onChange={onChangeHandler} 
                                            name="lastName" 
                                            value={formData.lastName} 
                                            className="border border-gray-300 rounded-md py-2 px-3 w-full outline-none focus:ring-2 focus:ring-gold focus:border-gold transition" 
                                            type="text" 
                                            placeholder="Doe" 
                                        />
                                    </div>
                                </div>
                                
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                    <input 
                                        required 
                                        id="email"
                                        onChange={onChangeHandler} 
                                        name="email" 
                                        value={formData.email} 
                                        className="border border-gray-300 rounded-md py-2 px-3 w-full outline-none focus:ring-2 focus:ring-gold focus:border-gold transition" 
                                        type="email" 
                                        placeholder="your@email.com" 
                                    />
                                </div>
                                
                                <div>
                                    <label htmlFor="street" className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                                    <input 
                                        required 
                                        id="street"
                                        onChange={onChangeHandler} 
                                        name="street" 
                                        value={formData.street} 
                                        className="border border-gray-300 rounded-md py-2 px-3 w-full focus:ring-2 outline-none focus:ring-gold focus:border-gold transition" 
                                        type="text" 
                                        placeholder="Ashrafieh Main St." 
                                    />
                                </div>
                                
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City</label>
                                        <input 
                                            required 
                                            id="city"
                                            onChange={onChangeHandler} 
                                            name="city" 
                                            value={formData.city} 
                                            className="border border-gray-300 rounded-md py-2 px-3 w-full focus:ring-2 outline-none focus:ring-gold focus:border-gold transition" 
                                            type="text" 
                                            placeholder="Beirut" 
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="country" className="block text-sm font-medium  text-gray-700 mb-1">Country</label>
                                        <input 
                                            required 
                                            id="country"
                                            onChange={onChangeHandler} 
                                            name="country" 
                                            value={formData.country} 
                                            className="border border-gray-300 rounded-md py-2 px-3 w-full focus:ring-2  focus:ring-gold outline-none focus:border-gold transition" 
                                            type="text" 
                                            placeholder="Lebanon" 
                                        />
                                    </div>
                                </div>
                                
                                {/* <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                    <input 
                                        required 
                                        id="phone"
                                        onChange={onChangeHandler} 
                                        name="phone" 
                                        value={formData.phone} 
                                        className="border border-gray-300 rounded-md py-2 px-3 w-full focus:ring-2 outline-none focus:ring-gold focus:border-gold transition" 
                                        type="number" 
                                        placeholder="01234567" 
                                    />
                                </div> */}
                                                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                    <input 
                                        required 
                                        id="phone"
                                        onChange={onChangeHandler} 
                                        name="phone" 
                                        value={formData.phone} 
                                        className="border border-gray-300 rounded-md py-2 px-3 w-full focus:ring-2 outline-none focus:ring-gold focus:border-gold transition" 
                                        type="tel" 
                                        placeholder="03520863" 
                                        pattern="[0-9]{8}"
                                        title="Please enter a valid 8-digit Lebanese phone number"
                                        maxLength="8"
                                    />
                                    <p className="mt-1 text-xs text-gray-500">Enter an 8-digit Lebanese phone number (e.g., 03520863)</p>
                                </div>
                            </div>
                        </div>
                        
                        {/* ------------- Right Side (Cart and Payment) ------------------ */}
                        <div className="flex-1 p-6 lg:p-8 bg-gray-50">
                            <div className="mb-6">
                                <Title text1={'ORDER'} text2={'SUMMARY'} />
                            </div>
                            
                            <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
                                <CartTotal />
                            </div>
                            
                            <div className="mt-8">
                                <Title text1={'PAYMENT'} text2={'METHOD'} />
                                <div className="mt-4 space-y-3">
                                    <div 
                                        onClick={() => setMethod('cod')} 
                                        className={`flex items-center gap-3 border p-4 rounded-lg cursor-pointer transition ${method === 'cod' ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300'}`}
                                    >
                                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${method === 'cod' ? 'border-indigo-600' : 'border-gray-400'}`}>
                                            {method === 'cod' && <div className="w-3 h-3 bg-indigo-600 rounded-full"></div>}
                                        </div>
                                        <p className="font-medium">Cash on Delivery</p>
                                    </div>
                                    
                                    {/* Placeholder for additional payment methods */}
                                    <div className="p-4 border border-dashed border-gray-300 rounded-lg bg-gray-50 text-center text-sm text-gray-500">
                                        Additional payment methods coming soon
                                    </div>
                                </div>
                            </div>
                            
                            <div className="mt-8">
                                <button 
                                    type="submit" 
                                    className="w-full bg-gold text-white py-3 rounded-md font-medium transition duration-200 transform hover:translate-y-px focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2"
                                >
                                    PLACE ORDER
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
                
                <div className="text-center mt-6 text-sm text-gray-500">
                    <p>Need help? Contact our customer support team</p>
                </div>
            </div>
        </div>
    )
}

export default PlaceOrder