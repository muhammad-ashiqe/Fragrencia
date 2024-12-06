import { createContext, useEffect, useState } from "react";
import { products } from "../assets/assets";
import { toast } from "react-toastify";

export const StoreContext = createContext();

export const StoreContextProvider = (props) => {

    const currency ="₹"

    const [search,setSearch]=useState('');
    const [showSearch,setShowSearch] =useState(false);

    const [cartItems,setCartItems]=useState({});

    const addToCart=async(itemId,size)=>{
        let cartData = structuredClone(cartItems) //using it because cart items is object

        if (!size) {
            toast.error("Select Product Size");
            return
        }
        if (cartData[itemId]){ // checking the item already available in cart
            if (cartData[itemId][size]) { //if it is available again checking the size are same
                cartData[itemId][size] += 1; //if true add 1 with existing object
            }else{
                cartData[itemId][size]=1 //if item size not available in cart it will create 1st one 
            }
        }else{ //if item not available
            cartData[itemId]={} // create an empty object
            cartData[itemId][size]=1 //create first element of the object 
        }
        setCartItems(cartData); //set cartData to cart items
    }

    const getCartCount = () => {
        let totalCount = 0;
        for(const items in cartItems){ //iterate through items in cartItems
            for(const item in cartItems[items]){ //iterate through Cart item properties like quantity
                try {
                    if (cartItems[items][item]>0) { //id quantity >0
                        totalCount += cartItems[items][item]; //increment cart count by using the total count
                    }
                } catch (error) {
                    console.log("error occur")
                }
            }
        }
        return totalCount;
    };


    const updateCart=(itemId,size,quantity)=>{
        let cartData = structuredClone(cartItems); //cloning the cartItems
        cartData[itemId][size]=quantity; //setting new quantity
        setCartItems(cartData); // seting up cart data

    }
  
    const value = {
        products,currency,search,setSearch,showSearch,setShowSearch,addToCart,cartItems,setCartItems,getCartCount,updateCart
    };

    return (
        <StoreContext.Provider value={value}>
            {props.children}
        </StoreContext.Provider>
    );
};
