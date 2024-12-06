import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../Context/StoreContext'
import { products } from '../assets/assets';
import TitleText from './TitleText';
import ProductItem from './ProductItem';

const LatestCollections = () => {
    const {products} = useContext(StoreContext);

    const [latestProduct,setLatestProduct]=useState([])

    useEffect(()=>{
      setLatestProduct(products.slice(0,5))
    },[])
  return (
    <div className='my-10'>
      <div className="text-center py-8 text-3xl">
        <TitleText text1={'LATEST'} text2={"COLLECTIONS"}/>
        <p className="w3/4 m-auto text-xs sm:text-sm md:text-base to-gray-600">
        Browse Our Latest Collection
        </p>
      </div>
{/* rendering products */}
      <div className="flex justify-between flex-wrap ">
        {
          latestProduct.map((item,index)=>(
            <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price}/>
          ))
        }
      </div>
    </div>
  )
}

export default LatestCollections
