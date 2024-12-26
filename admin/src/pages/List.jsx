import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const List = ({token}) => {
  const [list, setList] = useState([]);

  // Fetch the product list
  const fetchList = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      console.log("API Response:", response.data); // Log API response for debugging

      if (response.data.success) {
        // Ensure proper path based on API structure
        setList(response.data.products || []);
      } else {
        toast.error("Unable to get product details");
      }
    } catch (error) {
      console.error("Error fetching product list:", error);
      toast.error("Something went wrong while fetching the product list");
    }
  };

  //remove item button function
  const removeProducts = async(id)=>{
    try {
      const response = await axios.post(backendUrl + '/api/product/remove' ,{id} ,{headers:{token}})

      if (response) {
        toast.success("Product removed");
        await fetchList()
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
  // UseEffect to fetch data on component mount
  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      <p className="text-lg font-bold">All Products</p>
      <div className="flex flex-col gap-2">
        {/* List table title */}
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 bg-gray-100 text-sm">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className="text-center">Action</b>
        </div>

        {/* Product list or fallback */}
        {list.length > 0 ? (
          list.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-2 px-2 border-b text-sm"
            >
              {/* Display product details */}
              <img
                src={item.Image[0]}
                className="h-12 w-12 object-cover"
              />
              <p>{item.name || "No Name"}</p>
              <p>{item.category || "No Category"}</p>
              <p>{item.price ? `₹${item.price}` : "No Price"}</p>
              <button onClick={()=>removeProducts(item._id)} className="bg-red-500 text-white py-1 px-2 rounded">Delete</button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 mt-4">No products available</p>
        )}
      </div>
    </>
  );
};

export default List;
