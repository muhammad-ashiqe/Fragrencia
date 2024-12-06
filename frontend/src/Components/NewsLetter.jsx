import React from 'react'

const NewsLetter = () => {

    const onsubmitHandler =(event)=>{
        event.preventDefault();

    }

  return (
    <div className='text-center py-20'>
      <p className='text-2xl font-medium text-gray-800'>Subscribe now and get upto 50% off</p>
      <p className='text-gray-400 mt-3'>
        Connect with us for exciting rewards and more
      </p>
      <form onSubmit={onsubmitHandler} action="" className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border border-gray-600 pl-3'>
        <input type="email" className='w-full sm:flex-1 outline-none '  placeholder='Enter your email ' required/>
        <button type='submit' className='bg-black text-white text-xs px-10 py-4 '>SUBSCRIBE</button>
      </form>
    </div>
  )
}

export default NewsLetter
