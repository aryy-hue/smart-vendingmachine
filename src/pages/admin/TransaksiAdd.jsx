import React, { useState } from 'react';
import { Link } from 'react-router-dom'

export default function TambahTransaksi() {
  // State untuk menyimpan input form
  const [productId, setProductId] = useState('');
  const [customerId, setCustomerId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [totalPrice, setTotalPrice] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  
  // State untuk menyimpan status pengiriman
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Fungsi untuk menangani pengiriman form
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validasi input
    if (!productId || !quantity || !totalPrice || !paymentMethod) {
      setError('Semua kolom harus diisi!');
      return;
    }
    
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('http://localhost:3000/api/transaksi/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          product_id: productId,
          customer_id: customerId,
          quantity,
          total_price: totalPrice,
          payment_method: paymentMethod,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Transaksi berhasil ditambahkan!');
        // Reset form setelah sukses
        setProductId('');
        setCustomerId('');
        setQuantity('');
        setTotalPrice('');
        setPaymentMethod('');
      } else {
        setError(data.message || 'Terjadi kesalahan saat menambah transaksi');
      }
    } catch (err) {
      setError('Terjadi kesalahan jaringan!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ width: '50%', margin: '0 auto', padding: '20px' }}>
      <h2>Tambah Data Transaksi</h2>
      
      {/* Menampilkan pesan error atau sukses */}
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {success && <div style={{ color: 'green' }}>{success}</div>}

      {/* Form Input Transaksi */}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="product_id">Product ID:</label>
          <input
            type="text"
            id="product_id"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="customer_id">Customer ID (Optional):</label>
          <input
            type="text"
            id="customer_id"
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="total_price">Total Price:</label>
          <input
            type="number"
            id="total_price"
            value={totalPrice}
            onChange={(e) => setTotalPrice(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="payment_method">Payment Method:</label>
          <input
            type="text"
            id="payment_method"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        {/* Tombol untuk mengirim data */}
        <div>
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: '10px 20px',
              backgroundColor: '#4CAF50',
              color: 'white',
              margin:'20px 0px',
              border: 'none',
              cursor: loading ? 'not-allowed' : 'pointer',
              width: '100%',
            }}
          >
            {loading ? 'Loading...' : 'Tambah Transaksi'}
          </button>
          <Link to="/transaksi">
              <button className="add-item-btn"
                style={{
                  backgroundColor: 'red',
                  color: 'white',
                  border: 'none',
                
                  width: '100%',
                }}
              >Kembali</button>
          </Link>
        </div>
      </form>
    </div>
  );
}
