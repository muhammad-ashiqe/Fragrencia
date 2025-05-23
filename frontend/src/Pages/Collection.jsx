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
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filter Section - Mobile Collapsible */}
        <div className="w-full lg:w-1/4">
          <div className="bg-white p-4 shadow-sm rounded-lg lg:sticky lg:top-4">
            <p className="text-lg font-medium text-gray-800 mb-4">FILTERS</p>

            {/* Category Filter */}
            <div className="space-y-3 border-b pb-4 mb-4">
              <p className="text-sm font-semibold text-gray-700">CATEGORY</p>
              {["Men", "Women", "Unisex"].map((cat) => (
                <label 
                  key={cat} 
                  className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded"
                >
                  <input
                    type="checkbox"
                    value={cat}
                    onChange={toggleCategory}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="text-sm text-gray-600">{cat}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div className="w-full lg:w-3/4">
          {/* Header with Title and Sort */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <TitleText text1={"ALL"} text2={"COLLECTIONS"} />
            <select
              className="w-full sm:w-48 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onChange={(e) => setSortType(e.target.value)}
            >
              <option value="relevent">Most Relevant</option>
              <option value="high-low">Price: High to Low</option>
              <option value="low-high">Price: Low to High</option>
            </select>
          </div>

          {/* Centered Product Grid */}
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 justify-items-center">
            {filteredProducts.map((item, index) => (
              <ProductItem
                key={index}
                id={item._id}
                image={item.Image}
                name={item.name}
                price={item.price}
                className="w-full max-w-[200px]"
              />
            ))}
          </div>

          {/* Empty State */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              No products found matching your criteria
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Collection;
