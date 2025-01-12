import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import './index.css'
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Admin from './pages/admin/HomeAdmin';
import CheckOut from './pages/CheckOut';
import Produk from './pages/Produk';
import Profile from './pages/Profile';
import DataBarangAdd from './pages/admin/DataBarangAdd.jsx';
import Transaksi from './pages/admin/Transaksi';
import TransaksiAdd from './pages/admin/TransaksiAdd';
import DataBarang from './pages/admin/DataBarang';
import Monitoring from './components/admin/Monitoring.jsx';
import Summary from './components/admin/summary.jsx';
import { useEffect, useState } from 'react';
import LoginPage from './pages/admin/LoginPage.jsx';

function App() {

  // State untuk menyimpan data ringkasan penjualan
  const [summaryData, setSummaryData] = useState({
    totalQuantity: 0,
    totalRevenue: 0,
    totalTransactions: 0,
  });

  // Mengambil data summary dari backend
  useEffect(() => {
    fetch('http://localhost:3000/api/sales/summary')
      .then(response => response.json())
      .then(data => setSummaryData(data))
      .catch(error => console.error('Error fetching summary data:', error));
  }, []);

  return (
    <Router>
      <Routes>
        {/* USER */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/checkout" element={<CheckOut />} />
        <Route path="/profile" element={<Profile />} />
        {/* ADMIN */}
        <Route path="/login/admin" element={<LoginPage />} />
        {/* <Route path="/admin" element={<Admin />} /> */}
        <Route path="/admin" element={<DataBarang />} />
        <Route path="/data-barang/add" element={<DataBarangAdd />} />
        <Route path="/produk/add" element={<Produk />} />
        <Route path="/transaksi" element={<Transaksi />} />
        <Route path="/transaksi/add" element={<TransaksiAdd />} />
        <Route path="/monitoring" element={<Monitoring />} />
        <Route path="/summary" element={<Summary data={summaryData} />} />
      </Routes>
    </Router>
  )
}
export default App
