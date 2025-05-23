import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../Context/StoreContext';
import TitleText from "../Components/TitleText"
import ProductItem from './ProductItem';

const RelatedProducts = ({ category, subCategory }) => {
    const { products } = useContext(StoreContext);
    const [related, setRelated] = useState([]);

    useEffect(() => {
        if (products.length > 0) {
            let productsCopy = products.slice();
            productsCopy = productsCopy.filter((item) => subCategory === item.subCategory);
            setRelated(productsCopy.slice(0, 5));
        }
    }, [products, subCategory]);

    return (
        <div className='my-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto'>
            <div className="text-center mb-8">
                <TitleText text1={"RELATED"} text2={"PRODUCTS"} />
                <p className="mt-2 text-sm text-gray-500">Discover similar items you might like</p>
            </div>
            
            {related.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 justify-items-center">
                    {related.map((item, index) => (
                        <ProductItem 
                            key={index} 
                            id={item._id} 
                            name={item.name} 
                            image={item.Image} 
                            price={item.price}
                            className="w-full max-w-[200px]"
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center text-gray-500 py-8">
                    No related products found
                </div>
            )}
        </div>
    )
}

export default RelatedProducts;
