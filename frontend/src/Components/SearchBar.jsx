import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { StoreContext } from "../Context/StoreContext";
import { assets } from "../assets/assets";
import { useLocation } from "react-router-dom";

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } =useContext(StoreContext);
  const location = useLocation();
  const [visible,setVisible]=useState(false)

  useEffect(()=>{
    if (location.pathname.includes("collection")) {
      setVisible(true)
    }else{
      setVisible(false)
    }
  },[location]);
  return showSearch && visible ? (
    <div className="mb-5 text-center">
      <div className="inline-flex items-center justify-center border border-gray-400 py-2 px-5 my-5 mx-3 rounded-full w-3/4 sm:w-1/2">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          className="flex-1 outline-none bg-inherit text-sm"
          id=""
        />
        <img className="w-4" src={assets.search_icon} alt="" />
      </div>
      <img
        onClick={() => setShowSearch(false)}
        className="inline w-3 cursor-pointer"
        src={assets.cross_icon}
        alt=""
      />
    </div>
  ) : null;
};

export default SearchBar;
