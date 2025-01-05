import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) {
      return null;
    }

    try {
      const response = await axios.post(
        backendUrl + "/api/order/list",
        {},
        { headers: { token } }
      );

      // Fix: Access `response.data.orders` instead of `response.orders`
      if (response.data.orders) {
        setOrders(response.data.orders.reverse());
      } else {
        toast.error(response.data.message || "Failed to fetch orders");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("An error occurred while fetching orders.");
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/order/status",
        { orderId, status: event.target.value },
        { headers: { token } }
      );

      if (response.data.success) {
        await fetchAllOrders();
      }
    } catch (error) {
      console.log(error);
     toast.error(response.data.error)
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div className="h-[80vh] overflow-y-scroll">
      <h3>Order Page</h3>
      <div>
        {orders.length > 0 ? (
          orders.map((order, index) => (
            <div
              key={index}
              className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700"
            >
              <img
                className="w-12"
                src={assets.parcel_icon}
                alt="Parcel Icon"
              />
              <div className="">
                <div>
                  {order.items.map((item, itemIndex) => (
                    <p className="py-0.5" key={itemIndex}>
                      {item.name} x {item.quantity} <span>{item.size}</span>
                      {itemIndex !== order.items.length - 1 && ","}
                    </p>
                  ))}
                </div>
                <p className="mt-3 mb-2 font-medium">
                  {order.address.firstName + " " + order.address.lastName}
                </p>
                <div className="">
                  <p>{order.address.street + " "}</p>
                  <p>
                    {order.address.city +
                      ", " +
                      order.address.state +
                      "," +
                      order.address.zipcode}
                  </p>
                </div>
                <div className="">
                  <p>{order.address.phone}</p>
                </div>
              </div>

              <div className="">
                <p className="text-sm sm:text-[15px]">
                  Items : {order.items.length}
                </p>
                <p className="mt-3">Payment Method : {order.paymentMethod}</p>
                <p>Payment : {order.payment ? "Done" : "Pending"}</p>
                <p>Date : {new Date(order.date).toLocaleDateString()}</p>
              </div>
              <p className="text-sm sm:text-[15px] font-semibold">
                ₹ {order.amount}
              </p>
              <select onChange={(event)=>statusHandler(event,order._id)} value={order.status} className="p-2 ">
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for Delivery">Out for Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          ))
        ) : (
          <p>No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default Orders;
