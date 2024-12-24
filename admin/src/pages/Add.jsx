import React from "react";
import { assets } from "../assets/assets";

const Add = () => {
  return (
    <form className="flex flex-col w-full items-start gap-3">
      <div>
        <p className="p-2cl">Upload Image</p>

        <div className="flex gap-2">
          <label htmlFor="image1">
            <img className="w-20" src={assets.upload_area} alt="" />
            <input type="file" id="image1" hidden />
          </label>
          <label htmlFor="image2">
            <img className="w-20" src={assets.upload_area} alt="" />
            <input type="file" id="image2" hidden />
          </label>
          <label htmlFor="image3">
            <img className="w-20" src={assets.upload_area} alt="" />
            <input type="file" id="image3" hidden />
          </label>
          <label htmlFor="image4">
            <img className="w-20" src={assets.upload_area} alt="" />
            <input type="file" id="image4" hidden />
          </label>
        </div>
      </div>

      <div className="w-full">
        <p className="mb-2">Product name</p>
        <input
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="Type here"
        />
      </div>

      <div className="w-full">
        <p className="mb-2">Product description</p>
        <textarea
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="Type here"
        />
      </div>

      <div className="flex flex-col sm:flex-row w-full sm:gap-8">
        <div>
        <p className="mb-2">Product Category</p>
        <select className="w-full px-3 py-2">
          <option value="Men">Men</option>
          <option value="Women">Women</option>
          <option value="Unisex">Unisex</option>
        </select>
        </div>

        <div>
          <p className="mb-2">Sub Category</p>
          <select className="w-full px-3 py-2">
            <option value="Spicy">Spicy</option>
            <option value="Aquatic">Aquatic</option>
            <option value="Citrus">Citrus</option>
          </select>
        </div>

        <div>
          <p className="mb-2">Product Price</p>
          <input
            className="w-full px-3 py-2 sm:w-[120px]"
            placeholder="1499.00"
            type="number"
          />
        </div>
      </div>
      <div>
        <p>Product Sizes</p>
        <div className="flex gap-4">
          <div>
            <p className="bg-slate-200 px-3 py-1 cursor-pointer">50ml</p>
          </div>

          <div>
            <p className="bg-slate-200 px-3 py-1 cursor-pointer">100ml</p>
          </div>

          <div>
            <p className="bg-slate-200 px-3 py-1 cursor-pointer">150ml</p>
          </div>

          <div>
            <p className="bg-slate-200 px-3 py-1 cursor-pointer">200ml</p>
          </div>
        </div>
      </div>

      <div className="flex gap-2 mt-2">
        <input type="checkbox" id="bestseller" />
        <label htmlFor="bestseller">Add to bestseller</label>
      </div>

      <button type="submit" className="px-5 py-3 mt-4 bg-black text-white">Add Product</button>
    </form>
  );
};

export default Add;
