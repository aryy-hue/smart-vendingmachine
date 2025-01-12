import React, { useState } from 'react';

export default function TableStokBarang() {
  // Data dummy untuk snack dan minuman
  const data = [
    {
      id: 1,
      gambar: 'https://via.placeholder.com/100', // Gambar KitKat
      namaBarang: 'KitKat',
      jumlah: 20,
      kategori: 'Snack',
      deskripsi: 'Cokelat wafer 4 fingers.',
      tanggalKedaluwarsa: '2025-06-15',
    },
    {
      id: 2,
      gambar: 'https://via.placeholder.com/100', // Gambar Coca-Cola
      namaBarang: 'Coca-Cola',
      jumlah: 50,
      kategori: 'Minuman',
      deskripsi: 'Minuman berkarbonasi 1,5L.',
      tanggalKedaluwarsa: '2024-12-31',
    },
    {
      id: 3,
      gambar: 'https://via.placeholder.com/100', // Gambar Sprite
      namaBarang: 'Sprite',
      jumlah: 40,
      kategori: 'Minuman',
      deskripsi: 'Minuman lemon-lime 1,5L.',
      tanggalKedaluwarsa: '2024-11-30',
    },
    {
      id: 4,
      gambar: 'https://via.placeholder.com/100', // Gambar Lays
      namaBarang: 'Lays',
      jumlah: 25,
      kategori: 'Snack',
      deskripsi: 'Keripik kentang rasa original.',
      tanggalKedaluwarsa: '2025-01-20',
    },
    {
      id: 5,
      gambar: 'https://via.placeholder.com/100', // Gambar Pocari Sweat
      namaBarang: 'Pocari Sweat',
      jumlah: 30,
      kategori: 'Minuman',
      deskripsi: 'Minuman isotonik 500ml.',
      tanggalKedaluwarsa: '2025-03-10',
    },
    {
      id: 6,
      gambar: 'https://via.placeholder.com/100', // Gambar Oreo
      namaBarang: 'Oreo',
      jumlah: 35,
      kategori: 'Snack',
      deskripsi: 'Biskuit cokelat isi krim vanilla.',
      tanggalKedaluwarsa: '2025-05-05',
    },
  ];

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  // Data untuk halaman saat ini
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = data.slice(indexOfFirstItem, indexOfLastItem);

  // Fungsi untuk navigasi
  const nextPage = () => {
    if (currentPage < Math.ceil(data.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleUpdate = (id) => {
    alert(`Update data dengan ID: ${id}`);
  };

  const handleDelete = (id) => {
    alert(`Hapus data dengan ID: ${id}`);
  };

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
            <th style={{ padding: '10px', width: '50px' }}>ID</th>
            <th style={{ padding: '10px', width: '200px' }}>Gambar</th>
            <th style={{ padding: '10px', width: '200px' }}>Nama Barang</th>
            <th style={{ padding: '10px', width: '100px' }}>Jumlah</th>
            <th style={{ padding: '10px', width: '150px' }}>Kategori</th>
            <th style={{ padding: '10px', width: '150px' }}>Deskripsi</th>
            <th style={{ padding: '10px', width: '150px' }}>Tanggal Kadaluarsa</th>
            <th style={{ padding: '10px', width: '100px' }}>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((item) => (
            <tr key={item.id} style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: '10px', width: '50px' }}>{item.id}</td>
              <td style={{ padding: '10px', width: '200px' }}>
                <img src={item.gambar} alt={item.namaBarang} style={{ width: '100px', height: 'auto' }} />
              </td>
              <td style={{ padding: '10px', width: '200px' }}>{item.namaBarang}</td>
              <td style={{ padding: '10px', width: '100px' }}>{item.jumlah}</td>
              <td style={{ padding: '10px', width: '150px' }}>{item.kategori}</td>
              <td style={{ padding: '10px', width: '150px' }}>{item.deskripsi}</td>
              <td style={{ padding: '10px', width: '150px' }}>{item.tanggalKedaluwarsa}</td>
              <td style={{ padding: '10px', width: '100px', textAlign: 'center' }}>
                {/* Ikon Update */}
                <button
                  onClick={() => handleUpdate(item.id)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', marginRight: '10px' }}
                >
                  <i className="fas fa-edit" style={{ color: 'blue', fontSize: '18px' }}></i>
                </button>
                {/* Ikon Delete */}
                <button
                  onClick={() => handleDelete(item.id)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  <i className="fas fa-trash" style={{ color: 'red', fontSize: '18px' }}></i>
                </button>
              </td>
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
          disabled={currentPage >= Math.ceil(data.length / itemsPerPage)}
          style={{
            padding: '10px 20px',
            cursor: currentPage >= Math.ceil(data.length / itemsPerPage) ? 'not-allowed' : 'pointer',
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}
