import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    totalProducts: 0,
    totalUsers: 0,
    averageOrderValue: 0,
    recentOrders: [],
    bestSellingProducts: [],
    monthlyRevenue: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get("http://localhost:7000/api/dashboard/dashboard");
        setStats(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return <div className="text-center py-8 text-gray-800">Loading...</div>;
  }

  return (
    <div className="bg-gray-50 text-gray-800 min-h-screen p-8">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12">Admin Dashboard</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Total Orders */}
          <motion.div
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-xl font-medium text-gray-600">Total Orders</h2>
            <p className="text-3xl font-semibold text-gray-900">{stats.totalOrders}</p>
          </motion.div>

          {/* Total Revenue */}
          <motion.div
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-xl font-medium text-gray-600">Total Revenue</h2>
            <p className="text-3xl font-semibold text-gray-900">₹{stats.totalRevenue.toLocaleString()}</p>
          </motion.div>

          {/* Total Products */}
          <motion.div
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-xl font-medium text-gray-600">Total Products</h2>
            <p className="text-3xl font-semibold text-gray-900">{stats.totalProducts}</p>
          </motion.div>

          {/* Total Users */}
          <motion.div
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-xl font-medium text-gray-600">Total Users</h2>
            <p className="text-3xl font-semibold text-gray-900">{stats.totalUsers}</p>
          </motion.div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Monthly Revenue Chart */}
          <motion.div
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-xl font-medium text-gray-600 mb-6">Monthly Revenue</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stats.monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="_id" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="total" fill="#001111" />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Average Order Value */}
          <motion.div
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-xl font-medium text-gray-600 mb-6">Average Order Value</h2>
            <p className="text-4xl font-semibold text-gray-900">₹{stats.averageOrderValue.toFixed(2)}</p>
          </motion.div>
        </div>

        {/* Recent Orders Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-12">
          <h2 className="text-xl font-medium text-gray-600 mb-6">Recent Orders</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white text-gray-800">
              <thead>
                <tr>
                  <th className="py-2 px-4 text-left">Order ID</th>
                  <th className="py-2 px-4 text-left">User ID</th>
                  <th className="py-2 px-4 text-left">Amount</th>
                  <th className="py-2 px-4 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentOrders.map((order) => (
                  <tr key={order._id} className="border-t hover:bg-gray-100">
                    <td className="py-2 px-4">{order._id}</td>
                    <td className="py-2 px-4">{order.userId}</td>
                    <td className="py-2 px-4">₹{order.amount}</td>
                    <td className="py-2 px-4">{order.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      
      </div>
    </div>
  );
};

export default Dashboard;
