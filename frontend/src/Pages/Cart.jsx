import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../Context/StoreContext";
import TitleText from "../Components/TitleText";
import { assets, products } from "../assets/assets";
import CartTotal from "../Components/CartTotal";

const Cart = () => {
  const { currency, products, cartItems, updateCart, navigate } =
    useContext(StoreContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];

      for (const items in cartItems) {
        for (const item in cartItems[items]) {
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
    }
  }, [cartItems, products]);

  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <TitleText text1={"YOUR"} text2={"CART"} />
      </div>

      <div>
        {cartData.map((item, index) => {
          const productData = products.find(
            (product) => product._id === item._id
          );

          return (
            <div
              key={index}
              className="py-4 border-t border-b text-gray-700 grid grid-cols-1 sm:grid-cols-3 items-center gap-4"
            >
              {/* Product Details */}
              <div className="flex items-center gap-6 sm:gap-4">
                <img
                  className="w-16 sm:w-20 md:w-24"
                  src={productData.Image[0]}
                  alt=""
                />
                <div>
                  <p className="text-xs sm:text-lg font-medium">{productData.name}</p>
                  <div className="flex items-center gap-5 mt-2">
                    <p className="text-sm sm:text-base">
                      {currency}
                      {productData.price}
                    </p>
                    <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50 text-xs sm:text-sm">
                      {item.size}
                    </p>
                  </div>
                </div>
              </div>

              {/* Flexbox container for Quantity Input and Delete Button */}
              <div className="flex flex-row items-center justify-start gap-4 sm:gap-8 w-full">
                {/* Quantity Input */}
                <input
                  onChange={(e) =>
                    e.target.value === "" || e.target.value === "0"
                      ? null
                      : updateCart(item._id, item.size, Number(e.target.value))
                  }
                  type="number"
                  className="border min-w-10 sm:max-w-20 px-1 sm:px-2 py-1 text-sm sm:text-base w-24 sm:w-32"
                  min={1}
                  defaultValue={item.quantity}
                />

                {/* Delete Button */}
                <img
                  onClick={() => updateCart(item._id, item.size, 0)}
                  className="w-4 sm:w-5 cursor-pointer ml-2"
                  src={assets.bin_icon}
                  alt="Remove"
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Checkout Section */}
      <div className="flex justify-end my-20 px-5 sm:px-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <div className="w-full text-end">
            <button
              onClick={() => navigate("/place-order")}
              className="bg-black text-white text-sm sm:text-base my-8 px-8 py-3 sm:px-10 sm:py-4"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
