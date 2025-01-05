import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Razorpay from "razorpay";

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
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    //clear cartData
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({ success: true, message: "order placed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//globel variables
const currency = "INR";
const deliveryCharge = 10;

//  //gateway intialize
 const razorpayInstance = new Razorpay({
  key_id: "rzp_test_qFPBs96zoma5zn",
  key_secret: "4GqxVHeAAgIW8u8kz6D4tiw1",
});

//placing order usingg razorpay method
const placeOrderRazorpay = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    // Create order data
    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "Razorpay",
      payment: false,
      date: Date.now(),
    };

    // Save the order to the database
    const newOrder = new orderModel(orderData);
    await newOrder.save();

    // Razorpay order options
    const options = {
      amount: amount*100, // Amount in paise (INR)
      currency: currency,
      receipt: newOrder._id.toString(),
    };

    // Create Razorpay order
    const razorpayOrder = await razorpayInstance.orders.create(options);

    // Send success response with the created order
    return res.json({ success: true, order: razorpayOrder });
  } catch (error) {
    console.error("Error placing order:", error);
    return res
      .status(500)
      .json({
        success: false,
        message: error.message || "Internal Server Error",
      });
  }
};

const verifyRazorpay = async(req,res)=>{
  try {
    const {userId,razorpay_order_id} =req.body

    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)
    if (orderInfo.status === 'paid') {
      await orderModel.findByIdAndUpdate(orderInfo.receipt,{payment:true});
      await userModel.findByIdAndUpdate(userId,{cartData:{}})
      res.json({success:true,message:"Payment Successfull"})
    }else{
      res.json({success:false,message:"Payment Failed"})
    }
  } catch (error) {
    res.json({success:false,message:error.message})
  }
}

// All orders data for admin panel
const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//user Order data for frontend
const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    const orders = await orderModel.find({ userId });
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//update order status from admin panel
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await orderModel.findByIdAndUpdate(orderId, { status });
    res.json({ success: "true", message: "status updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { placeOrder, placeOrderRazorpay, allOrders, userOrders, updateStatus ,verifyRazorpay};
