import React from 'react'
import { assets } from '../assets/assets'

const Hero = () => {
  return (
    <div className='p-2 md:p-5 w-full h-auto rounded-xl '>
      <img src={assets.hero} alt="" className='w-[100%] h-[100%] rounded-xl '/>
    </div>
  )
}

export default Hero
