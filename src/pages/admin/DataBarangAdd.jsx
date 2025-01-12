import React, { useState } from 'react';

export default function DataBarangAdd() {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    stock: '',
    description: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  // Fungsi untuk menangani perubahan input teks
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Fungsi untuk menangani input file
  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  // Fungsi untuk submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Membuat FormData untuk mengirim data dengan file
    const data = new FormData();
    data.append('name', formData.name);
    data.append('price', formData.price);
    data.append('stock', formData.stock);
    data.append('description', formData.description);
    if (imageFile) {
      data.append('image_url', imageFile);
    }

    try {
      const response = await fetch('http://localhost:3000/api/products/add', {
        method: 'POST',
        body: data,
      });

      if (response.ok) {
        const result = await response.json();
        setMessage('Barang berhasil ditambahkan!');
        setFormData({
          name: '',
          price: '',
          stock: '',
          description: '',
        });
        setImageFile(null);
      } else {
        setError('Gagal menambahkan barang.');
      }
    } catch (err) {
      setError('Terjadi kesalahan: ' + err.message);
    }
  };

  return (
    <div style={{ marginTop: '20px', width: '600px', margin: '0 auto' }}>
      <h2>Tambah Barang</h2>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="name">Nama Barang:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '8px',
              marginTop: '5px',
              borderRadius: '4px',
              border: '1px solid #ccc',
            }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="price">Harga:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '8px',
              marginTop: '5px',
              borderRadius: '4px',
              border: '1px solid #ccc',
            }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="stock">Stok:</label>
          <input
            type="number"
            id="stock"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '8px',
              marginTop: '5px',
              borderRadius: '4px',
              border: '1px solid #ccc',
            }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="description">Deskripsi:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="4"
            style={{
              width: '100%',
              padding: '8px',
              marginTop: '5px',
              borderRadius: '4px',
              border: '1px solid #ccc',
            }}
          ></textarea>
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="image_url">Gambar:</label>
          <input
            type="file"
            id="image_url"
            name="image_url"
            onChange={handleFileChange}
            required
            style={{
              width: '100%',
              padding: '8px',
              marginTop: '5px',
              borderRadius: '4px',
              border: '1px solid #ccc',
            }}
          />
        </div>
        <button
          type="submit"
          style={{
            backgroundColor: '#4CAF50',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Tambah Barang
        </button>
      </form>
      <a
        href="/data-barang"
        style={{
          backgroundColor: 'red',
          color: 'white',
          margin: '10px 0px',
          textDecoration: 'none',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          display: 'inline-block',
          textAlign: 'center',
        }}
      >
        Kembali
      </a>
    </div>
  );
}
