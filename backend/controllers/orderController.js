import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

//placing order usingg cod method
const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    const orderData = {
      userId,
      items,
      amount,
      paymentMethod: "COD",
      payment: false,
      address,
      date: Date.now(),
    }

    const newOrder = new orderModel(orderData)
    await newOrder.save()

    //clear cartData
    await userModel.findByIdAndUpdate(userId,{cartData:{}})

    res.json({success:true,message:"order placed"})
  } catch (error) {
    console.log(error)
    res.json({success:false,message:error.message})
  }
};

//placing order usingg razorpay method
const placeOrderRazorpay = async (req, res) => {};

//all orders data for admin panel
const allOrders = async (req, res) => {};

//user Order data for frontend
const userOrders = async (req, res) => {
  try {
    const {userId} = req.body
    const orders = await orderModel.find({userId})
    res.json({success:true,orders})
  } catch (error) {
    console.log(error);
    res.json({success:false,message:error.message})
  }
};

//update order status from admin panel
const updateStatus = async (req, res) => {};

export { placeOrder, placeOrderRazorpay, allOrders, userOrders, updateStatus };
