import React, { useContext, useEffect, useState } from "react";
import TitleText from "../Components/TitleText";
import { StoreContext } from "../Context/StoreContext";
import ProductItem from "../Components/ProductItem";

const Collection = () => {
  const { products, search, showSearch } = useContext(StoreContext);

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relevent");

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setSubCategory((prev) => [...prev, e.target.value]);
    }
  };

  const applyFilter = () => {
    let productCopy = products.slice();

    if (showSearch && search) {
      productCopy = productCopy.filter((item) =>
        item.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
      );
    }

    if (category.length > 0) {
      productCopy = productCopy.filter((item) => category.includes(item.category));
    }

    setFilteredProducts(productCopy);

    if (subCategory.length > 0) {
      productCopy = productCopy.filter((item) => subCategory.includes(item.subCategory));
    }
    setFilteredProducts(productCopy);
  };

  const sortProducts = () => {
    let fpCopy = filteredProducts.slice();
    switch (sortType) {
      case "high-low":
        setFilteredProducts([...fpCopy.sort((a, b) => b.price - a.price)]);
        break;

      case "low-high":
        setFilteredProducts([...fpCopy.sort((a, b) => a.price - b.price)]);
        break;

      default:
        applyFilter();
        break;
    }
  };

  useEffect(() => {
    sortProducts();
  }, [sortType]);

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch, products]);

  return (
    <div>
      <div className="flex flex-wrap md:flex-nowrap">
        {/* Filter Section */}
        <div className="w-full md:w-1/4 my-5 flex flex-col px-5">
          <p className="text-[18px] text-gray-800">FILTERS</p>

          {/* Category Filter */}
          <div className="flex flex-col border p-5 my-5 border-gray-300 gap-2">
            <p className="text-gray-700 text-[16px]">CATEGORY</p>
            <div className="flex gap-2">
              <input
                type="checkbox"
                value={"Men"}
                onChange={toggleCategory}
                id=""
              />
              <p className="text-gray-500 text-[14px]">MEN</p>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                value={"Women"}
                onChange={toggleCategory}
                id=""
              />
              <p className="text-gray-500 text-[14px]">WOMEN</p>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                value={"Unisex"}
                onChange={toggleCategory}
                id=""
              />
              <p className="text-gray-500 text-[14px]">UNISEX</p>
            </div>
          </div>

          
          {/* <div className="flex flex-col border p-5 my-5 border-gray-300 gap-2">
            <p className="text-gray-700 text-[16px]">SCENT-NOTES</p>
            <div className="flex gap-2">
              <input
                type="checkbox"
                value={"spicy"}
                id=""
                onChange={toggleSubCategory}
              />
              <p className="text-gray-500 text-[14px]">SPICY</p>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                value={"aquatic"}
                id=""
                onChange={toggleSubCategory}
              />
              <p className="text-gray-500 text-[14px]">AQUATIC</p>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                value={"citrus"}
                id=""
                onChange={toggleSubCategory}
              />
              <p className="text-gray-500 text-[14px]">CITRUS</p>
            </div>
          </div> */}
        </div>

        {/* Products Section */}
        <div className="w-full md:w-3/4">
          <div className="flex justify-between px-5">
            <TitleText text1={"ALL"} text2={"COLLECTIONS"} />
            <select
              className="border text-sm cursor-pointer border-gray-400 p-2 outline-none"
              name=""
              id=""
              onChange={(e) => setSortType(e.target.value)}
            >
              <option value="relevent">Most Relevent</option>
              <option value="high-low">High to Low</option>
              <option value="low-high">Low to High</option>
            </select>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 gap-y-6 px-5">
            {filteredProducts.map((item, index) => (
              <ProductItem
                key={index}
                id={item._id}
                image={item.Image}
                name={item.name}
                price={item.price}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collection;
