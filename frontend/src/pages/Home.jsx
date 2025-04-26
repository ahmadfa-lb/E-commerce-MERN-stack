import React from 'react'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'

const Home = () => {
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
