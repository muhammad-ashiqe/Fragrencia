import React, { useContext, useState } from "react";
import TitleText from "../Components/TitleText";
import CartTotal from "../Components/CartTotal";
import { assets } from "../assets/assets";
import { StoreContext } from "../Context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");

  const {
    navigate,
    backendUrl,
    token,
    setCartItems,
    getCartAmount,
    delivery_fee,
    products, // Fixed typo here from 'produts' to 'products'
    cartItems,
  } = useContext(StoreContext);

  const [formData,setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((data) => ({ ...data,[name]:value }));
  };


  const onSubmitHandler = async (event) => {
    event.preventDefault();
  
    try {
      let orderItems = [];

      // Loop through cartItems to create orderItems
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items))
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }
      console.log(orderItems)


      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };

      console.log(orderData)

      switch (method) {
        //api calls for cash on delivery
        case "cod":
          const response = await axios.post(backendUrl + '/api/order/place',orderData,{headers:{token}})

          console.log(response.data)
          if (response.data.success) {
            setCartItems({})
            navigate('/orders')
          }else{
            toast.error("response is false")
          }
          break;

        default:
          break;
      }
    } catch (error) {
      console.error("Error in submitting the order:", error);
      toast.error(error.message)
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh]"
    >
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <TitleText text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>
        <div className="flex gap-3">
          <input
            required
            onChange={onChangeHandler}
            name="firstName"
            value={formData.firstName}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            placeholder="First name"
            type="text"
          />
          <input
            required
            onChange={onChangeHandler}
            name="lastName"
            value={formData.lastName}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            placeholder="Last name"
            type="text"
          />
        </div>
        <input
          required
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          placeholder="E-mail address"
          type="email"
          onChange={onChangeHandler}
          name="email"
          value={formData.email}
        />
        <input
          required
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          placeholder="Street"
          type="text"
          onChange={onChangeHandler}
          name="street"
          value={formData.street}
        />
        <div className="flex gap-3">
          <input
            required
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            placeholder="City"
            type="text"
            onChange={onChangeHandler}
            name="city"
            value={formData.city}
          />
          <input
            required
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            placeholder="State"
            type="text"
            onChange={onChangeHandler}
            name="state"
            value={formData.state}
          />
        </div>
        <div className="flex gap-3">
          <input
            required
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            placeholder="Zip code"
            type="text"
            onChange={onChangeHandler}
            name="zipcode"
            value={formData.zipcode}
          />
          <input
            required
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            placeholder="Country"
            type="text"
            onChange={onChangeHandler}
            name="country"
            value={formData.country}
          />
        </div>
        <input
          required
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          placeholder="Phone"
          type="number"
          onChange={onChangeHandler}
          name="phone"
          value={formData.phone}
        />
      </div>

      {/* Right side  */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>

        <div className="mt-12">
          <TitleText text1={"PAYMENT"} text2={"METHOD"} />
          <div className="flex gap-3  flex-col lg:flex-row">
            <div
              onClick={() => setMethod("razorpay")}
              className="flex items-center gap-3 border px-3  py-3  cursor-pointer "
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full  ${
                  method === "razorpay" ? "bg-green-400 " : ""
                }`}
              ></p>
              <img className="h-5 mx-4" src={assets.razorpay_logo} alt="" />
            </div>
            <div
              onClick={() => setMethod("cod")}
              className="flex items-center gap-3 border px-3 py-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "cod" ? "bg-green-400" : ""
                }`}
              ></p>
              <p className="text-gray-500 text-sm font-medium">
                CASH ON DELIVERY
              </p>
            </div>
          </div>

          <div className="w-full text-end mt-8">
            <button
              type="submit"
              className="bg-black text-white px-16 py-3 text-sm"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
