import React, { useState } from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import { LuPhone, LuMapPin, LuSend } from "react-icons/lu";
import { HiOutlineMail } from "react-icons/hi";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import axios from 'axios';
import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';

const Contact = () => {

  const { backendUrl } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      // Connect to our backend API
      const response = await axios.post(`${backendUrl}/api/contact/send-email`, {
        ...formData,
      });
      
      if (response.data.success) {
        setSubmitStatus({ success: true, message: 'Message sent successfully! We will get back to you soon.' });
        // Reset form
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
      } else {
        setSubmitStatus({ success: false, message: response.data.message || 'Failed to send message. Please try again.' });
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setSubmitStatus({ 
        success: false, 
        message: error.response?.data?.message || 'An error occurred. Please try again later.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='container  px-4 md:px-10'>
      
      <div className='text-center text-2xl pt-8'>
        <Title text1={'CONTACT'} text2={'US'} />
      </div>

      <div className='flex flex-col md:flex-row gap-12 mb-28 mt-4'>
        {/* Left side - Image with shadow */}
        <div className='w-full md:w-1/2'>
          <div className='rounded-lg overflow-hidden shadow-xl'>
            <img 
              className='w-full h-auto object-cover md:h-[30rem]' 
              src={assets.contact_img} 
              alt="Our store location" 
            />
          </div>
        </div>
        
        {/* Right side - Contact information */}
        <div className='w-full md:w-1/2 flex flex-col justify-center space-y-8'>
          <div>
            <h2 className='font-bold text-2xl text-gray-800 mb-6 border-b pb-2 border-gray-200'>Our Store</h2>
            
            <div className='grid grid-cols-1 md:grid-cols-2 gap-y-6 sm:gap-8'>
              <div className='flex items-start space-x-4'>
                <div className='text-gray-600 mt-1'><LuMapPin size={20} className='text-gold'/></div>
                <div>
                  <p className='font-medium text-gray-800 bg-cream rounded-full px-4 py-1 inline-block'>Location</p>
                  <p className='text-gray-600 mt-1'>Lebanon, 🇱🇧</p>
                </div>
              </div>
              
              <div className='flex items-start space-x-4'>
                <div className='text-gray-600 mt-1'><LuPhone size={20} className='text-gold'/></div>
                <div>
                  <p className='font-medium text-gray-800 bg-cream rounded-full px-4 py-1 inline-block'>Phone</p>
                  <p className='text-gray-600 mt-1'>+961 03 520 863</p>
                  <p className='text-gray-500 text-sm text-gray'>Monday to Sunday | 24/7</p>
                </div>
              </div>
              
              <div className='flex items-start space-x-4'>
                <div className='text-gray-600 mt-1'><HiOutlineMail size={20} className='text-gold'/></div>
                <div>
                  <p className="font-medium text-gray-800 bg-cream rounded-full px-4 py-1 inline-block">Email</p>
                  <p className='text-gray-600 mt-1'>gravo.store.service@gmail.com</p>
                  <p className='text-gray-500 text-sm text-gray'>We'll respond as soon as possible</p>
                </div>
              </div>
              
              <div className='flex items-start space-x-4'>
                <div className='text-gray-600 mt-1'><FaInstagram size={20} className='text-gold'/></div>
                <div className='flex flex-col'>
                  <p className='font-medium text-gray-800 bg-cream rounded-full px-4 py-1 inline-block'>Instagram</p>
                  <a href='#' className='text-gray-600 hover:text-blue-500 transition-colors mt-1'>@GRAVO</a>
                </div>
              </div>
            </div>
          </div>
          
          {/* Social media and WhatsApp button */}
          <div className='pt-4 border-t border-gray-200'>
            <p className='text-gray-700 mb-4'>Follow us on social media or reach out directly via WhatsApp:</p>
            <a 
              href='https://wa.me/+96103520863' 
              rel="noopener noreferrer" 
              className='inline-flex items-center gap-2 text-white py-3 px-6 bg-[#25D366] rounded-md hover:bg-opacity-90 transition-colors shadow-md'
            >
              <FaWhatsapp size={20} />
              <span>Message on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
      {/* Send Message Form Section */}
      <div className='mb-20'>
        <div className='text-center mb-8'>
          <h2 className='text-3xl font-bold text-gray-800'>Send us a Message</h2>
          <p className='text-gray-600 mt-2'>We'd love to hear from you. Fill out the form below and we'll get back to you soon.</p>
        </div>

        <div className='max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8'>
          <form onSubmit={handleSubmit}>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
              <div>
                <label htmlFor="fullName" className='block text-gray-700 font-medium mb-2'>Full Name</label>
                <input 
                  type="text" 
                  id="fullName" 
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold' 
                  required 
                />
              </div>
              <div>
                <label htmlFor="email" className='block text-gray-700 font-medium mb-2'>Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold' 
                  required 
                />
              </div>
              <div>
                <label htmlFor="phone" className='block text-gray-700 font-medium mb-2'>Phone Number</label>
                <input 
                  type="tel" 
                  id="phone" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold' 
                />
              </div>
              <div>
                <label htmlFor="subject" className='block text-gray-700 font-medium mb-2'>Subject</label>
                <input 
                  type="text" 
                  id="subject" 
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold' 
                  required 
                />
              </div>
            </div>
            <div className='mb-6'>
              <label htmlFor="message" className='block text-gray-700 font-medium mb-2'>Message</label>
              <textarea 
                id="message" 
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5" 
                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold' 
                required
              ></textarea>
            </div>
            
            {submitStatus && (
              <div className={`mb-4 p-3 rounded-md ${submitStatus.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {submitStatus.message}
              </div>
            )}
            
            <button 
              type="submit" 
              disabled={isSubmitting}
              className='inline-flex items-center gap-2 bg-gold text-white py-3 px-6 rounded-md hover:bg-cream hover:text-black hover:scale-105 transition-colors shadow-md disabled:opacity-70'
            >
              {isSubmitting ? 'Sending...' : (
                <>
                  <LuSend size={18} />
                  <span>Send Message</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Contact