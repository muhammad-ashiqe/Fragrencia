import React, { useContext } from 'react'
import { StoreContext } from '../Context/StoreContext'
import {Link} from "react-router-dom"

const ProductItem = ({id,image,name,price}) => {

    const {currency} =useContext(StoreContext)
  return (
    <Link className='text-gray-700 cursor-pointer  p-3' to={`/product/${id}`}>
        <div className="overflow-hidden w-[200px] flex content-center">
            <img className='hover:scale-110 transition ease-in-out w-[100%]' src={image[0]} alt="" />
        </div>
        <p className='pt-3 pb-1 text-sm'>{name}</p>
        <p className='text-sm font-medium'>{currency}{price}</p>
    </Link>
  )
}

export default ProductItem
