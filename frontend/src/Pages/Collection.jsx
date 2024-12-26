import React, { useContext, useEffect, useState } from "react";
import TitleText from "../Components/TitleText";
import { StoreContext } from "../Context/StoreContext";
import ProductItem from "../Components/ProductItem";

const Collection = () => {
  const { products,search,showSearch} = useContext(StoreContext);

  const [filteredProducts, setFilteredProducts] = useState([]);

  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relevent'); 


  const toggleCategory = (e) => {

    // checking the category includes the selected checkbox value
    if (category.includes(e.target.value)) {
      // if it is already exisit it will be removed by filtering it out
      setCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      //if it is not available it will be added
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


  const applyFilter =()=>{
    //making a copy of all products
    let productCopy = products.slice();


    //if search button is clicked and have anything in the input 
    if (showSearch && search) {
      //convert it to lowercase and filter the products
      productCopy=productCopy.filter(item =>item.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
    }

    //checking any filter happend
    if (category.length > 0) {
      // filter the item which include the category
      productCopy = productCopy.filter((item)=>category.includes(item.category));
    }
    //setting it to render on collections page
    setFilteredProducts(productCopy);

    if (subCategory.length >0) {
      productCopy = productCopy.filter((item)=>subCategory.includes(item.subCategory));
    }
    setFilteredProducts(productCopy)
  }


  const sortProducts = () => {
    let fpCopy = filteredProducts.slice(); // Make a copy of the array
    switch (sortType) {
      case "high-low":
        // Sort in descending order for high to low price
        setFilteredProducts([...fpCopy.sort((a, b) => b.price - a.price)]);
        break;
  
      case "low-high":
        // Sort in ascending order for low to high price
        setFilteredProducts([...fpCopy.sort((a, b) => a.price - b.price)]);
        break;
  
      default:
        applyFilter();
        break;
    }
  };


  

  useEffect(()=>{
    sortProducts();
  },[sortType])


  useEffect(()=>{
    applyFilter()
  },[category,subCategory,search,showSearch,products])


  return (
    <div>
      <div className="flex ">
        {/* filter div */}
        <div className="min-w-60 my-5 flex flex-col ">
          <p className="text-[18px] text-gray-800">FILTERS</p>

          {/* filter by category */}
          <div className="flex flex-col border p-5 my-5 border-gray-300 gap-2">
            <p className="text-gray-700 text-[16px]">CATEGORY</p>
            <div className="flex gap-2">
              <input
                type="checkbox"
                value={"Men"}
                onChange={toggleCategory}
                id=""
              />
              <p className="text-gray-500 text-[14px] ">MEN</p>
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

          {/* filter by notes */}
          <div className="flex flex-col border p-5 my-5 border-gray-300 gap-2">
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
          </div>
        </div>

        {/* product div */}
        <div className="w-full">
          <div className="flex justify-between">
            <TitleText text1={"ALL"} text2={"COLLECTIONS"} className="ml-10" />
            <select
              className="border text-sm cursor-pointer border-gray-400 p-2 outline-none"
              name=""
              id=""
              onChange={(e)=>setSortType(e.target.value)}
            >
              <option value="relevent">Most Relevent</option>
              <option value="high-low">High to Low</option>
              <option value="low-high">Low to High</option>
            </select>
          </div>

          {/* rendering of products */}
          <div className="grid grid-cols-2 pl-16 md:grid-cols-3 lg:grid-cols-3 gap-4 gap-y-6">
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
