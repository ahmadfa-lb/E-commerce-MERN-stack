import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {

  const [currentState, setCurrentState] = useState('Login');
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext)

  const [name, setName] = useState('')
  const [password, setPasword] = useState('')
  const [email, setEmail] = useState('')

  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetStatus, setResetStatus] = useState({ loading: false, message: '' });


  const handleForgotPassword = async (e) => {
    e.preventDefault();

    if (!resetEmail) {
      toast.error('Please enter your email');
      return;
    }

    setResetStatus({ loading: true, message: '' });

    try {
      const response = await axios.post(`${backendUrl}/api/user/forgot-password`, { email: resetEmail });

      if (response.data.success) {
        setResetStatus({
          loading: false,
          message: 'Password reset link sent to your email'
        });
        toast.success('Password reset link sent to your email');
      } else {
        setResetStatus({ loading: false, message: '' });
        toast.error(response.data.message);
      }
    } catch (error) {
      setResetStatus({ loading: false, message: '' });
      toast.error('Failed to send reset link. Please try again.');
    }
  };

  const forgotPasswordModal = (
    <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ${showForgotPassword ? 'block' : 'hidden'}`}>
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Reset Password</h2>
        <p className="text-gray-600 mb-4">Enter your email address and we'll send you a link to reset your password.</p>

        {resetStatus.message && (
          <div className="mb-4 p-3 bg-green-50 text-green-700 rounded">
            {resetStatus.message}
          </div>
        )}

        <form onSubmit={handleForgotPassword}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter your email"
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowForgotPassword(false)}
              className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={resetStatus.loading}
              className="px-4 py-2 bg-gold text-white rounded hover:bg-cream hover:text-black"
            >
              {resetStatus.loading ? 'Sending...' : 'Send Reset Link'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (currentState === 'Sign Up') {
        const response = await axios.post(backendUrl + '/api/user/register', { name, email, password })
        if (response.data.success) {
          setToken(response.data.token)
          localStorage.setItem('token', response.data.token)
        } else {
          toast.error(response.data.message)
        }

      } else {

        const response = await axios.post(backendUrl + '/api/user/login', { email, password })
        if (response.data.success) {
          setToken(response.data.token)
          localStorage.setItem('token', response.data.token)
        } else {
          toast.error(response.data.message)
        }

      }


    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [token])

  return (
  <>
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] mb-14 sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regular text-3xl'>{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
      </div>
      {currentState === 'Login' ? '' : <input onChange={(e) => setName(e.target.value)} value={name} type="text" className='w-full px-3 py-2 border border-gray-800' placeholder='Name' required />}
      <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" className='w-full px-3 py-2 border border-gray-800' placeholder='Email' required />
      <input onChange={(e) => setPasword(e.target.value)} value={password} type="password" className='w-full px-3 py-2 border border-gray-800' placeholder='Password' required />
      <div className='w-full flex justify-between text-sm mt-[-8px]'>
        <button
          type="button"
          onClick={() => setShowForgotPassword(true)}
          className="text-gold hover:underline cursor-pointer text-sm"
        >
          Forgot your password?
        </button>
        {
          currentState === 'Login'
            ? <p onClick={() => setCurrentState('Sign Up')} className=' cursor-pointer'>Create account</p>
            : <p onClick={() => setCurrentState('Login')} className=' cursor-pointer'>Login Here</p>
        }
      </div>
      <button className='bg-black text-white font-light px-8 py-2 mt-4'>{currentState === 'Login' ? 'Sign In' : 'Sign Up'}</button>
    </form>
    {forgotPasswordModal}
    </>
  )
}

export default Login
