import Order from "../models/orderModel.js";
import User from "../models/userModel.js";
import Product from "../models/productModel.js";
import mongoose from "mongoose";

// 📌 Get Dashboard Details
export const getDashboardDetails = async (req, res) => {
  try {
    // 📊 Total Users (Customers)
    const totalUsers = await User.countDocuments();

    // 📦 Total Orders
    const totalOrders = await Order.countDocuments();

    // 💰 Total Revenue (Sum of all order amounts)
    const totalRevenue = await Order.aggregate([
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);
    const revenue = totalRevenue.length > 0 ? totalRevenue[0].total : 0;

    // 🕒 Recent Orders (Last 5 Orders)
    const recentOrders = await Order.find()
      .sort({ date: -1 })
      .limit(5)
      .populate("userId", "name email"); // Populate user details

    // 🔝 Most Sold Products
    const topProducts = await Order.aggregate([
      { $unwind: "$items" },
      {
        $group: {
          _id: "$items.productId",
          totalSold: { $sum: "$items.quantity" },
        },
      },
      { $sort: { totalSold: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "productDetails",
        },
      },
      { $unwind: "$productDetails" },
      {
        $project: {
          _id: 1,
          totalSold: 1,
          name: "$productDetails.name",
          price: "$productDetails.price",
        },
      },
    ]);

    // 📈 Revenue Line Chart (Monthly Sales)
    const monthlySales = await Order.aggregate([
      {
        $group: {
          _id: { $month: { $toDate: "$date" } },
          totalRevenue: { $sum: "$amount" },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // 🥧 Total Sales Pie Chart (Sales by Category)
    const salesByCategory = await Order.aggregate([
      { $unwind: "$items" },
      {
        $lookup: {
          from: "products",
          localField: "items.productId",
          foreignField: "_id",
          as: "productInfo",
        },
      },
      { $unwind: "$productInfo" },
      {
        $group: {
          _id: "$productInfo.category",
          totalSales: { $sum: "$items.quantity" },
        },
      },
      { $sort: { totalSales: -1 } },
    ]);

    // 🆕 New User Registrations (Last 5 Users)
    const newRegistrations = await User.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("name email createdAt");

    res.status(200).json({
      totalUsers,
      totalOrders,
      totalRevenue: revenue,
      recentOrders,
      topProducts,
      monthlySales,
      salesByCategory,
      newRegistrations,
    });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
