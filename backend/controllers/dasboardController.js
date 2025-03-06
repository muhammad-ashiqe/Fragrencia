import orderModel from "../models/orderModel.js";
import productModel from "../models/productModel.js";
import userModel from "../models/userModel.js";

// Get Dashboard Stats
export const getDashboardStats = async (req, res) => {
  try {
    // Total number of orders
    const totalOrders = await orderModel.countDocuments();

    // Total revenue (sum of all order amounts)
    const totalRevenueResult = await orderModel.aggregate([
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);
    const totalRevenue = totalRevenueResult[0]?.total || 0;

    // Total number of products
    const totalProducts = await productModel.countDocuments();

    // Total number of users
    const totalUsers = await userModel.countDocuments();

    // Average Order Value
    const averageOrderValue = totalRevenue / totalOrders || 0;

    // Recent orders (last 5 orders)
    const recentOrders = await orderModel
      .find()
      .sort({ date: -1 })
      .limit(5)
      .exec();

    // Monthly Revenue Data (for charts)
    const monthlyRevenue = await orderModel.aggregate([
      {
        $addFields: {
          dateObject: { $toDate: "$date" }, // Convert the timestamp to a date object
        },
      },
      {
        $group: {
          _id: { $month: "$dateObject" }, // Extract the month from the date object
          total: { $sum: "$amount" },
        },
      },
      { $sort: { _id: 1 } }, // Sort by month
    ]);

    res.status(200).json({
      success: true,
      totalOrders,
      totalRevenue,
      totalProducts,
      totalUsers,
      averageOrderValue,
      recentOrders,
      monthlyRevenue,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching dashboard stats",
      error: error.message,
    });
  }
};