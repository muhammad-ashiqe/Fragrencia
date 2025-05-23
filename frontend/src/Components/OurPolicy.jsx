import React from "react";
import { assets } from "../assets/assets";

const OurPolicy = () => {
  return (
    <div className="px-4 py-6 sm:py-10">
      <div className="flex justify-between sm:justify-around items-start gap-2 sm:gap-4">
        {/* Policy 1 */}
        <div className="text-center flex-1 min-w-[80px]">
          <img 
            src={assets.exchange_icon} 
            className="w-8 sm:w-12 mx-auto mb-2 sm:mb-4" 
            alt="Return" 
          />
          <p className="text-xs sm:text-sm font-semibold leading-tight">Easy Returns</p>
          <p className="text-[10px] sm:text-xs text-gray-400 hidden sm:block mt-1">
            Hassle-free 30-day policy
          </p>
        </div>

        {/* Policy 2 */}
        <div className="text-center flex-1 min-w-[80px]">
          <img 
            src={assets.quality_icon} 
            className="w-8 sm:w-12 mx-auto mb-2 sm:mb-4" 
            alt="Quality" 
          />
          <p className="text-xs sm:text-sm font-semibold leading-tight">Quality Assured</p>
          <p className="text-[10px] sm:text-xs text-gray-400 hidden sm:block mt-1">
            Premium quality products
          </p>
        </div>

        {/* Policy 3 */}
        <div className="text-center flex-1 min-w-[80px]">
          <img 
            src={assets.support_img} 
            className="w-8 sm:w-12 mx-auto mb-2 sm:mb-4" 
            alt="Support" 
          />
          <p className="text-xs sm:text-sm font-semibold leading-tight">24/7 Support</p>
          <p className="text-[10px] sm:text-xs text-gray-400 hidden sm:block mt-1">
            Always available help
          </p>
        </div>
      </div>
    </div>
  );
};

export default OurPolicy;
