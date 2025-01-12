import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Ensure both bar and line elements are registered
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement, // Ensure LineElement is registered
  PointElement,
  Title,
  Tooltip,
  Legend
);

const Chart = () => {
  const [sensorData, setSensorData] = useState([]);
  
  // Fetch sensor data from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/sensors'); // Sesuaikan dengan endpoint API Anda
        setSensorData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Proses data untuk mengelompokkan berdasarkan jam
  const processData = (data) => {
    const groupedData = data.reduce((acc, { temperature, humidity, timestamp }) => {
      const hour = new Date(timestamp).getHours(); // Ambil jam dari timestamp

      // Jika jam belum ada dalam accumulator, inisialisasi
      if (!acc[hour]) {
        acc[hour] = { temperatures: [], humidities: [] };
      }

      // Masukkan suhu dan kelembapan ke dalam array yang sesuai dengan jam
      acc[hour].temperatures.push(temperature);
      acc[hour].humidities.push(humidity);

      return acc;
    }, {});

    // Hitung rata-rata suhu dan kelembapan per jam
    const labels = [];
    const avgTemperatures = [];
    const avgHumidities = [];

    for (let hour = 0; hour < 24; hour++) {
      if (groupedData[hour]) {
        labels.push(`${hour}:00`);
        avgTemperatures.push(
          groupedData[hour].temperatures.reduce((sum, temp) => sum + temp, 0) / groupedData[hour].temperatures.length
        );
        avgHumidities.push(
          groupedData[hour].humidities.reduce((sum, humidity) => sum + humidity, 0) / groupedData[hour].humidities.length
        );
      } else {
        labels.push(`${hour}:00`);
        avgTemperatures.push(0); // Jika tidak ada data untuk jam tersebut, isi dengan 0
        avgHumidities.push(0);
      }
    }

    return { labels, avgTemperatures, avgHumidities };
  };

  // Proses data jika sudah ada
  const { labels, avgTemperatures, avgHumidities } = sensorData.length ? processData(sensorData) : { labels: [], avgTemperatures: [], avgHumidities: [] };

  // Persiapkan data untuk chart
  const data = {
    labels: labels,
    datasets: [
      {
        type: 'bar',
        label: 'Suhu',
        data: avgTemperatures,
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
      {
        type: 'line',
        label: 'Humidity',
        data: avgHumidities,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        fill: false,
        tension: 0.4, // For a smooth curve
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Suhu dan Humidity per Jam',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      {sensorData.length > 0 ? (
        <Bar data={data} options={options} />
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default Chart;
