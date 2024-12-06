import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../Context/StoreContext';
import { products } from '../assets/assets';
import TitleText from './TitleText';
import ProductItem from './ProductItem';

const BestSeller = () => {

    const {prducts} = useContext(StoreContext);
    const [BestSeller,setBestSeller] =useState([]);

    useEffect(()=>{
        const bestProduct = products.filter((item)=>(item.bestseller));
        setBestSeller(bestProduct.splice(0,5))
    },[])

  return (
    <div className='my-10'>
    <div className="text-center py-8 text-3xl">
      <TitleText text1={'BEST'} text2={"SELLERS"}/>
      <p className="w3/4 m-auto text-xs sm:text-sm md:text-base to-gray-600">
      Browse Our Best Seller Products
      </p>
    </div>
{/* rendering products */}
    <div className="flex justify-between flex-wrap ">
      {
        BestSeller.map((item,index)=>(
          <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price}/>
        ))
      }
    </div>
  </div>
)
}

export default BestSeller
