import React, { useState, useEffect } from 'react'

const Hero = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    
    const images = [
        "https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
        "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=1926&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1622622016645-7b7065e7c129?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ];

    // Auto rotate images every 3 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000);
        
        return () => clearInterval(interval);
    }, [images.length]);

    // Manual navigation
    const goToImage = (index) => {
        setCurrentImageIndex(index);
    };

    return (
        <div className='flex flex-col sm:flex-row border border-gray-400 sm:max-h-[35rem] sm:mx-20'>
            {/* Hero Left Side */}
            <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0'>
                <div className='text-[#414141]'>
                    <div className='flex items-center gap-2'>
                        <p className='w-8 md:w-11 h-[2px] bg-gold'></p>
                        <p className='font-medium text-sm md:text-base'>OUR BESTSELLERS</p>
                    </div>

                    <h1 className='prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed'>Latest Arrivals</h1>

                    <div className='flex items-center gap-2'>
                        <p className='font-semibold text-sm md:text-base'>SHOP NOW</p>
                        <p className='w-8 md:w-11 h-[2px] bg-gold'></p>
                    </div>
                </div>
            </div>

            {/* Hero Right Side with Pagination - Now fully responsive */}
            <div className='w-full sm:w-1/2 relative'>
                {/* Image container with proper aspect ratio on mobile */}
                <div className='w-full h-96 sm:h-auto sm:aspect-square'>
                    {images.map((image, index) => (
                        <div 
                            key={index}
                            className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${
                                index === currentImageIndex ? 'opacity-100' : 'opacity-0 pointer-events-none'
                            }`}
                        >
                            <img 
                                className='w-full h-full object-cover' 
                                src={image} 
                                alt={`Slideshow image ${index + 1}`} 
                            />
                        </div>
                    ))}
                </div>
                
                {/* Pagination Indicators - Enhanced for better touch targets on mobile */}
                <div className='absolute bottom-4 left-0 right-0 flex justify-center gap-3'>
                    {images.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToImage(index)}
                            className={`w-3 h-3 rounded-full transition-all ${
                                index === currentImageIndex ? 'bg-gold w-5' : 'bg-lightgray'
                            }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Hero