import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Summary from './summary.jsx'; // Import komponen Summary untuk data ringkasan
import Navbar from './Navbar.jsx';

const Monitoring = () => {
  const [sensorData, setSensorData] = useState([]);
  const [salesData, setSalesData] = useState([]);

  // Fetch sensor data (Temperature and Humidity)
  useEffect(() => {
    const fetchSensorData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/sensors'); // Endpoint untuk data sensor
        setSensorData(response.data);
      } catch (error) {
        console.error('Error fetching sensor data:', error);
      }
    };

    // Fetch sales data (Sales chart)
    const fetchSalesData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/sales'); // Endpoint untuk data penjualan
        setSalesData(response.data);
      } catch (error) {
        console.error('Error fetching sales data:', error);
      }
    };

    // Call both APIs periodically
    fetchSensorData();
    fetchSalesData();
    const interval = setInterval(() => {
      fetchSensorData();
      fetchSalesData();
    }, 5000);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return (
    <div className="monitoring-container" style={{ padding: '20px' }}>
      <h1>Vending Machine Monitoring</h1>
      <Navbar />
      {/* Grafik Temperature dan Humidity Berdampingan */}
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px' }}>
        <div style={{ flex: 1 }}>
          <h2>Temperature Monitoring</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={sensorData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="timestamp" />
              <YAxis label={{ value: '°C', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="temperature"
                stroke="#8884d8"
                name="Temperature (°C)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div style={{ flex: 1 }}>
          <h2>Humidity Monitoring</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={sensorData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="timestamp" />
              <YAxis label={{ value: '%', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="humidity"
                stroke="#82ca9d"
                name="Humidity (%)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Grafik Penjualan dan Data Ringkasan di sampingnya */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '40px' }}>
        <div style={{ flex: 2 }}>
          <h2>Sales Monitoring</h2>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="sale_date" label={{ value: 'Date', position: 'insideBottom', offset: -5 }} />
              <YAxis label={{ value: 'Items Sold', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="total_quantity"
                stroke="#FF8042"
                name="Total Items Sold"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div style={{ flex: 1, backgroundColor: '#f7f7f7', padding: '20px', borderRadius: '8px' }}>
        <Summary sensorData={sensorData} salesData={salesData} />
        </div>
      </div>
    </div>
  );
};

export default Monitoring;