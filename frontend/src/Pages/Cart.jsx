import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../Context/StoreContext";
import TitleText from "../Components/TitleText";
import { assets, products } from "../assets/assets";
import CartTotal from "../Components/CartTotal";

const Cart = () => {
  const { currency, products, cartItems ,updateCart ,navigateTo} = useContext(StoreContext);
  const [cartData, setCartData] = useState([]);
  useEffect(() => {
    const tempData = [];

    for (const items in cartItems) {
      // iterate through each product
      for (const item in cartItems[items]) {
        //iterate throug product size of product
        if (cartItems[items][item] > 0) {
          tempData.push({
            _id: items,
            size: item,
            quantity: cartItems[items][item],
          });
        }
      }
    }
    setCartData(tempData);
  }, [cartItems]);
  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <TitleText text1={"YOUR"} text2={"CART"} />
      </div>

      <div className="">
        {cartData.map((item, index) => {
          const productData = products.find(
            (product) => product._id === item._id
          );

          return (
            <div
              key={index}
              className="py-4 border-t border-b text-gray-700 grid grid-cols-3 items-center"
            >
              <div className="flex items-start gap-6">
                <img
                  className="w-16 sm:w-20"
                  src={productData.image[0]}
                  alt=""
                />
              
              <div className="">
                <p className="text-xs sm:text-lg font-medium">
                  {productData.name}
                </p>

                <div className="flex items-center gap-5 mt-2">
                  <p className="">
                    {currency}
                    {productData.price}
                  </p>
                  <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">
                    {item.size}
                  </p>
                </div>
              </div>
              </div>
              <input onChange={(e)=>e.target.value === "" || e.target.value=== "0" ? null : updateCart(item._id,item.size,Number(e.target.value))} type="number" className="border min-w-10 sm:max-w-20 px-1 sm:px-2 py-1" min={1} defaultValue={item.quantity} />
              <img onClick={()=>updateCart(item._id,item.size,0)} className="w-4 mr-4 sm:w-5 cursor-pointer" src={assets.bin_icon} alt="" />
            </div>
          );
        })}
      </div>
      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <div className="w-full text-end ">
            <button onClick={()=>navigateTo('/place-order')} className="bg-black text-white text-sm my-8 px-8 py-3">PROCEED TO CHECKOUT</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
