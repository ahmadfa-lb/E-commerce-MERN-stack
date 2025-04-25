import React from 'react'

const Title = ({text1,text2}) => {
  return (
    <div className='inline-flex gap-2 items-center mb-3'>
      <p className='text-gold'>{text1} <span className='text-black font-medium'>{text2}</span></p>
      <p className='hidden sm:flex w-8 sm:w-12  sm:h-[2px] bg-gold'></p>
    </div>
  )
}

export default Title
