import React from "react";
import { assets } from "../assets/assets";

const OurPolicy = () => {
  return (
    <div className="flex sm:flex-row justify-around gap-12 sm:gap-2 text-center py-10 text-xs sm:text-base to-gray-700">
      <div className="">
        <img src={assets.exchange_icon} className="w-12 m-auto mb-5 " alt="" />
        <p className="font-semibold">Easy Return Policy</p>
        <p className="text-gray-400 md:hidden">We offer hassle free return policy</p>
      </div>
      <div className="">
        <img src={assets.quality_icon} className="w-12 m-auto mb-5 " alt="" />
        <p className="font-semibold">Assured Quality Product</p>
        <p className="text-gray-400">We offer a verity of quality products</p>
      </div>
      <div className="">
        <img src={assets.support_img} className="w-12 m-auto mb-5 " alt="" />
        <p className="font-semibold">24/7 Customer Support</p>
        <p className="text-gray-400">We offer fulltime customer support</p>
      </div>
    </div>
  );
};

export default OurPolicy;
