import React from 'react'
import { useContext, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'

const Verify = () => {
    const { navigate, token, setCartItems } = useContext(ShopContext)
    const [searchParams] = useSearchParams()
    
    const success = searchParams.get('success')

    useEffect(() => {
        // Simple verification without payment gateway
        if (success === 'true' && token) {
            setCartItems({})
            toast.success('Order placed successfully!')
            navigate('/orders')
        } else {
            navigate('/cart')
        }
    }, [token, success, navigate, setCartItems])

    return (
        <div>
            {/* Empty component as we're handling redirect in useEffect */}
        </div>
    )
}

export default Verify