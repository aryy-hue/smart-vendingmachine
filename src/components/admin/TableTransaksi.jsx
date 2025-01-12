import React, { useState, useEffect } from 'react';

export default function TableTransaksi() {
  // State untuk menyimpan data transaksi, status loading, dan error
  const [transaksi, setTransaksi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State untuk pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Ambil data transaksi dari API saat komponen dimuat
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/transaksi');
        if (!response.ok) {
          throw new Error('Gagal mengambil data transaksi');
        }
        const data = await response.json();
        setTransaksi(data.data); // Simpan data transaksi ke state
        setLoading(false); // Set loading ke false setelah data diterima
      } catch (error) {
        setError(error.message); // Simpan error jika ada
        setLoading(false); // Set loading ke false meskipun error
      }
    };

    fetchData();
  }, []);

  // Menentukan data yang akan ditampilkan pada halaman saat ini
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = transaksi.slice(indexOfFirstItem, indexOfLastItem);

  // Fungsi untuk navigasi halaman berikutnya
  const nextPage = () => {
    if (currentPage < Math.ceil(transaksi.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Fungsi untuk navigasi halaman sebelumnya
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Menampilkan loading atau error jika ada masalah
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div style={{ marginTop: '20px', width: '100%', height: '575px' }}>
      <table
        style={{
          width: '1160px',
          borderCollapse: 'collapse',
          textAlign: 'left',
          margin: '0 auto',
        }}
      >
        <thead>
          <tr
            style={{
              backgroundColor: '#f0f0f0',
              borderBottom: '2px solid #ddd',
            }}
          >
            <th style={{ padding: '10px', width: '50px' }}>ID Transaksi</th>
            <th style={{ padding: '10px', width: '150px' }}>Tanggal</th>
            <th style={{ padding: '10px', width: '200px' }}>Nama Barang</th>
            <th style={{ padding: '10px', width: '100px' }}>Jumlah Dibeli</th>
            <th style={{ padding: '10px', width: '150px' }}>Total Harga</th>
            <th style={{ padding: '10px', width: '150px' }}>Metode Pembayaran</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((item) => (
            <tr key={item.id} style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: '10px', width: '50px' }}>{item.id}</td>
              <td style={{ padding: '10px', width: '150px' }}>
                {new Date(item.date_time).toLocaleDateString()}
              </td>
              <td style={{ padding: '10px', width: '200px' }}>{item.product_name}</td>
              <td style={{ padding: '10px', width: '100px' }}>{item.quantity}</td>
              <td style={{ padding: '10px', width: '150px' }}>
                {`Rp ${item.total_price.toLocaleString('id-ID')}`}
              </td>
              <td style={{ padding: '10px', width: '150px' }}>{item.payment_method}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Navigasi Pagination */}
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          style={{
            padding: '10px 20px',
            marginRight: '10px',
            cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
          }}
        >
          Previous
        </button>
        <button
          onClick={nextPage}
          disabled={currentPage >= Math.ceil(transaksi.length / itemsPerPage)}
          style={{
            padding: '10px 20px',
            cursor: currentPage >= Math.ceil(transaksi.length / itemsPerPage)
              ? 'not-allowed'
              : 'pointer',
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}
