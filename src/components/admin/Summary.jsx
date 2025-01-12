// src/components/Summary.js
import React, { useEffect, useState } from 'react';

const Summary = () => {
  const [summaryData, setSummaryData] = useState(null);  // Menggunakan null untuk memastikan data belum ada

  useEffect(() => {
    // Memanggil API untuk mendapatkan data ringkasan
    const fetchSummaryData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/sales/summary');
        const data = await response.json();
        setSummaryData(data);  // Set data yang didapat dari API
      } catch (error) {
        console.error('Error fetching summary data:', error);
      }
    };

    fetchSummaryData();  // Memanggil fungsi untuk mengambil data saat komponen pertama kali dipasang
  }, []);

  // Menampilkan loading saat data belum diterima
  if (!summaryData) {
    return <div>Loading...</div>;
  }

  // Render data jika summaryData sudah terisi
  return (
    <div className="summary">
      <h2>Data Ringkasan</h2>
      <ul>
        <li>Total Quantity Today: {summaryData.total_quantity_today}</li>
        <li>Total Revenue Today: ${summaryData.total_revenue_today.toFixed(2)}</li>
        <li>Average Temperature Today: {summaryData.avg_temperature_today}°C</li>
        <li>Average Humidity Today: {summaryData.avg_humidity_today}%</li>
      </ul>
    </div>
  );
};

export default Summary;