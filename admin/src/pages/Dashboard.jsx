import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar, Pie, Line } from "react-chartjs-2";
import { motion } from "framer-motion";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    totalUsers: 0,
    totalOrders: 0,
    totalRevenue: 0,
    recentOrders: [],
    topProducts: [],
    monthlySales: [],
    salesByCategory: [],
    newRegistrations: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get("http://localhost:7000/api/dashboard/dashboard");
        setDashboardData(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch dashboard data");
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) return <div className="flex justify-center items-center h-screen text-gray-600">Loading...</div>;
  if (error) return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;

  const {
    totalUsers,
    totalOrders,
    totalRevenue,
    recentOrders,
    topProducts,
    monthlySales,
    salesByCategory,
    newRegistrations,
  } = dashboardData;

  // Data for Monthly Sales Line Chart
  const monthlySalesData = {
    labels: monthlySales.map((sale) => `Month ${sale._id}`),
    datasets: [
      {
        label: "Monthly Revenue",
        data: monthlySales.map((sale) => sale.totalRevenue),
        borderColor: "#6366F1", // Indigo color
        backgroundColor: "rgba(99, 102, 241, 0.1)",
        borderWidth: 2,
        tension: 0.4, // Smooth line
      },
    ],
  };

  // Data for Sales by Category Pie Chart
  const salesByCategoryData = {
    labels: salesByCategory.map((category) => category._id),
    datasets: [
      {
        label: "Sales by Category",
        data: salesByCategory.map((category) => category.totalSales),
        backgroundColor: ["#6366F1", "#A5B4FC", "#C7D2FE", "#E0E7FF"],
        borderColor: "#ffffff",
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {["Total Users", "Total Orders", "Total Revenue"].map((metric, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200"
          >
            <h2 className="text-lg font-semibold text-gray-600">{metric}</h2>
            <p className="text-2xl font-bold text-gray-900">
              {index === 0 ? totalUsers : index === 1 ? totalOrders : `₹ ${totalRevenue.toFixed(2)}`}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Recent Orders */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-6 rounded-lg shadow-sm mb-8 border border-gray-200"
      >
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Orders</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="py-3 px-4">Order ID</th>
                <th className="py-3 px-4">User</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Amount</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order, index) => (
                <motion.tr
                  key={order._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
                  <td className="py-3 px-4 text-gray-700">{order._id}</td>
                  <td className="py-3 px-4 text-gray-700">{order.userId.name}</td>
                  <td className="py-3 px-4 text-gray-700">{order.userId.email}</td>
                  <td className="py-3 px-4 text-gray-700">₹ {order.amount.toFixed(2)}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Monthly Revenue</h2>
          <Line data={monthlySalesData} />
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Sales by Category</h2>
          <Pie data={salesByCategoryData} />
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
