import React, { useEffect } from 'react'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'

const Home = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className='mx-4'>
      <Hero />
      <BestSeller/>
      <LatestCollection/>
      <OurPolicy/>
    </div>
  )
}

export default Home
