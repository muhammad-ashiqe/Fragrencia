import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const StoreContext = createContext();

export const StoreContextProvider = (props) => {
  const backendUrl = "https://fragrencia.onrender.com";
  const currency = "₹";
  const delivery_fee = 50.0;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  const [token, setToken] = useState("");

  const addToCart = async (itemId, size) => {
    let cartData = structuredClone(cartItems); //using it because cart items is object

    if (!size) {
      toast.error("Select Product Size");
      return;
    }
    if (cartData[itemId]) {
      // checking the item already available in cart
      if (cartData[itemId][size]) {
        //if it is available again checking the size are same
        cartData[itemId][size] += 1; //if true add 1 with existing object
      } else {
        cartData[itemId][size] = 1; //if item size not available in cart it will create 1st one
      }
    } else {
      //if item not available
      cartData[itemId] = {}; // create an empty object
      cartData[itemId][size] = 1; //create first element of the object
    }
    setCartItems(cartData); //set cartData to cart items

    if (token) {
      try {
        await axios.post(
          backendUrl + "/api/cart/add",
          { itemId, size },
          { headers: { token } }
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      //iterate through items in cartItems
      for (const item in cartItems[items]) {
        //iterate through Cart item properties like quantity
        try {
          if (cartItems[items][item] > 0) {
            //id quantity >0
            totalCount += cartItems[items][item]; //increment cart count by using the total count
          }
        } catch (error) {
          console.log("error occur");
        }
      }
    }
    return totalCount;
  };

  const updateCart = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems); //cloning the cartItems
    cartData[itemId][size] = quantity; //setting new quantity
    setCartItems(cartData); // seting up cart data

    if (token) {
      try {
        await axios.post(
          backendUrl + "/api/cart/update",
          { itemId, size, quantity },
          { headers: { token } }
        );
      } catch (error) {
        console.log(error)
        toast.error(error.message)
      }
    }
  };

  const getCartAmount = () => {
    let totalAmount = 0; //initializing total cartamount 0
    for (const items in cartItems) {
      //iterating throung products in cart
      let itemInfo = products.find((product) => product._id === items); //finding the product where id is is same
      for (const item in cartItems[items]) {
        //iterate through quantity
        try {
          if (cartItems[items][item] > 0) {
            //if cart is not empty
            totalAmount += itemInfo.price * cartItems[items][item]; //item price muliplies quantity = total
          }
        } catch (error) {
          console.log("error", error);
        }
      }
    }
    return totalAmount; //return the total amount
  };

  const getProductsData = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");

      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const getUserCart =async(token)=>{
    try{
        const response = await axios.post(backendUrl + '/api/cart/get',{},{headers:{token}})
        if (response.data.success) {
          setCartItems(response.data.cartData)
        }
    }catch{
      console.log(error)
      toast.error(error.message)
    }
  }
  useEffect(() => {
    getProductsData();
  }, []);

  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
      getUserCart(localStorage.getItem('token'))
    }
  }, []);

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    addToCart,
    cartItems,
    setCartItems,
    getCartCount,
    updateCart,
    getCartAmount,
    navigate,
    backendUrl,
    token,
    setToken,
  };

  return (
    <StoreContext.Provider value={value}>
      {props.children}
    </StoreContext.Provider>
  );
};
