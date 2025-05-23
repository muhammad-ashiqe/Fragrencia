import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../Context/StoreContext'
import TitleText from './TitleText';
import ProductItem from './ProductItem';

const LatestCollections = () => {
    const { products } = useContext(StoreContext);
    const [latestProduct, setLatestProduct] = useState([]);

    useEffect(() => {
        setLatestProduct(products.slice(0, 5))
    }, [products])

    return (
        <div className='my-10 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 max-w-7xl mx-auto'>
            {/* Heading Section */}
            <div className="text-center py-8">
                <TitleText text1={'LATEST'} text2={"COLLECTIONS"} />
                <p className="w-full md:w-3/4 lg:w-1/2 mx-auto text-xs sm:text-sm md:text-base text-gray-600 mt-2">
                    Browse Our Latest Collection
                </p>
            </div>

            {/* Centered Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 md:gap-8 justify-items-center">
                {latestProduct.map((item, index) => (
                    <ProductItem 
                        key={index} 
                        id={item._id} 
                        image={item.Image} 
                        name={item.name} 
                        price={item.price}
                        className="w-full max-w-[250px]"
                    />
                ))}
            </div>
        </div>
    )
}

export default LatestCollections
