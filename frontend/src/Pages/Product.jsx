import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { StoreContext } from "../Context/StoreContext";
import { assets, products } from "../assets/assets";
import RelatedProducts from "../Components/RelatedProducts";

const Product = () => {
  const { productId } = useParams();
  const { products, currency ,addToCart,cartItems} = useContext(StoreContext);
  const [productData, setProductData ] = useState(false);
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
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100 ">
      {/* product data */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* product images */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData.Image.map((item, index) => (
              <img
                onClick={() => setMainImage(item)}
                src={item}
                key={index}
                alt=""
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img className="w-full h-auto" src={mainImage} alt="" />
          </div>
        </div>

        {/* product information */}
        <div className="flex-1">
          <h1 className="font-medium text-[25px] mt-2">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_dull_icon} alt="" className="w-3 5" />
            <p className="pl-2">(502)</p>
          </div>
          <p className="mt-5 text-2xl font-medium">
            {currency}
            {productData.price}
          </p>
          <p className="mt-5 to-gray-500 md:w-4/5 ">
            {productData.description} Lorem, ipsum dolor sit amet consectetur
            adipisicing elit. Molestiae mollitia cupiditate asperiores? Nostrum
            iste, amet rerum aliquid nam nemo dignissimos ex dolorem, sapiente
            quia nulla quae autem natus repellat. Iure.
          </p>
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-4">
              {productData.sizes.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  key={index}
                  className={`border border-gray-300 px-4 py-2 ${
                    item === size ? "border-yellow-900 border-2" : ""
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <button onClick={()=>addToCart(productData._id,size)} className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700">
            Add to Cart
          </button>
          <hr className="mt-5 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p className="font-medium">This Perfume is Preferred to  {productData.category}</p>
            <p className="font-medium">Scent Notes are {productData.subCategory}</p>
            <p className="font-medium">{productData.description}</p>
          </div>
        </div>

      </div>
        {/* Related Products */}

          <RelatedProducts category={productData.category} subCategory={productData.subCategory}/>

    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
