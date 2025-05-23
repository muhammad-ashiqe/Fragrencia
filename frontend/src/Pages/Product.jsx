import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { StoreContext } from "../Context/StoreContext";
import { assets, products } from "../assets/assets";
import RelatedProducts from "../Components/RelatedProducts";

const Product = () => {
  const { productId } = useParams();
  const { products, currency ,addToCart,cartItems} = useContext(StoreContext);
  const [productData, setProductData ] = useState("");
  const [mainImage, setMainImage] = useState("");
  const [size, setSize] = useState("");

  const fetchProduct = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setMainImage(item.Image[0]);
        return null;
      }
    });
  };

  useEffect(() => {
    fetchProduct();
  }, [productId, products]);

return productData ? (
    <div className="border-t-2 pt-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Product Content */}
      <div className="flex flex-col lg:flex-row gap-8 xl:gap-12">
        {/* Image Gallery */}
        <div className="w-full lg:w-1/2 flex flex-col-reverse sm:flex-row gap-4">
          {/* Thumbnails */}
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-auto gap-2 sm:w-24">
            {productData.Image.map((item, index) => (
              <img
                onClick={() => setMainImage(item)}
                src={item}
                key={index}
                alt="Thumbnail"
                className="w-20 h-20 sm:w-24 sm:h-24 object-cover cursor-pointer border hover:border-gray-400 flex-shrink-0"
              />
            ))}
          </div>
          
          {/* Main Image */}
          <div className="w-full aspect-square bg-gray-50">
            <img 
              className="w-full h-full object-contain p-4" 
              src={mainImage} 
              alt="Main Product" 
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="w-full lg:w-1/2">
          <h1 className="text-2xl md:text-3xl font-semibold">{productData.name}</h1>
          
          {/* Ratings */}
          <div className="flex items-center gap-2 mt-3">
            <div className="flex">
              {[...Array(4)].map((_, i) => (
                <img key={i} src={assets.star_icon} alt="star" className="w-4 h-4" />
              ))}
              <img src={assets.star_dull_icon} alt="star" className="w-4 h-4" />
            </div>
            <span className="text-sm text-gray-500">(502 reviews)</span>
          </div>

          {/* Price */}
          <p className="mt-4 text-2xl md:text-3xl font-bold">
            {currency}{productData.price}
          </p>

          {/* Description */}
          <p className="mt-6 text-gray-600 leading-relaxed">
            {productData.description}
          </p>

          {/* Size Selection */}
          <div className="mt-8">
            <h3 className="text-lg font-medium mb-4">Select Size</h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
              {productData.sizes.map((item) => (
                <button
                  key={item}
                  onClick={() => setSize(item)}
                  className={`p-2 text-sm md:text-base border rounded-md transition-colors
                    ${size === item ? 'border-2 border-black font-medium' : 'border-gray-300 hover:border-gray-400'}`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart */}
          <button
            onClick={() => addToCart(productData._id, size)}
            className="w-full sm:w-auto mt-8 px-8 py-3 bg-black text-white rounded-md
                      hover:bg-gray-800 active:bg-gray-900 transition-colors text-sm md:text-base"
          >
            Add to Cart
          </button>

          {/* Product Details */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="space-y-2 text-sm text-gray-600">
              <p><span className="font-medium">Category:</span> {productData.category}</p>
              <p><span className="font-medium">Scent Notes:</span> {productData.subCategory}</p>
              <p><span className="font-medium">Details:</span> {productData.description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-16">
        <RelatedProducts 
          category={productData.category} 
          subCategory={productData.subCategory}
        />
      </div>
    </div>
  ) : (
    <div className="h-screen flex items-center justify-center">Loading...</div>
  );
};

export default Product;
