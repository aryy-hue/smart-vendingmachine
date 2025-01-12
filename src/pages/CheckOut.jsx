import React from 'react';
import { useLocation } from 'react-router-dom';

export default function Checkout() {
  const location = useLocation();
  const { cart } = location.state || { cart: [] };  // Mendapatkan data keranjang

  return (
    <div className="checkout-container">
      <style jsx>{`
        .checkout-container {
          font-family: Arial, sans-serif;
          display: flex;
          justify-content: center;
          padding: 20px;
          background-color: #f5f5f5;
          min-height: 100vh;
        }
        .checkout-main {
          display: flex;
          flex-direction: row;
          gap: 20px;
          background: #fff;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
        }
        .cart-section, .summary-section {
          flex: 1;
        }
        .cart-item {
          display: flex;
          align-items: center;
          margin-bottom: 20px;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 8px;
          background: #fafafa;
        }
        .cart-item-image {
          width: 100px;
          height: 100px;
          background-color: #ccc;
          margin-right: 15px;
        }
        .cart-item-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .cart-item-details h4 {
          margin: 0;
          font-size: 1.2em;
          color: #555;
        }
        .pay-button {
          width: 100%;
          padding: 10px 0;
          font-size: 1.2em;
          font-weight: bold;
          color: #fff;
          background: #28a745;
          border: none;
          border-radius: 8px;
          cursor: pointer;
        }
      `}</style>
      <main className="checkout-main">
        <section className="cart-section">
          <h1>Barang yang dibeli</h1>
          <button style={{ margin: "10px 0px" , padding: "10px" , borderRadius: "10px" ,background: "#FF6969" , border: 'none' , color: '#fff'}} ><a href='/'>Kembali</a></button>
          {cart.length > 0 ? (
            cart.map((product, index) => (
              <div key={index} className="cart-item">
                <div className="cart-item-image">
                  <img src={`images/${product.image_url}`} alt={product.name} />
                </div>
                <div className="cart-item-details">
                  <h4>{product.name}</h4>
                  <p>Rp.{product.price.toLocaleString('id-ID')}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No items in the cart.</p>
          )}
        </section>

        <section className="summary-section">
          <h3>Ringkasan Belanja</h3>
          <div className="summary-item">
            <span>Total Belanja</span>
            <span>Rp.{cart.reduce((total, product) => total + product.price, 0).toLocaleString('id-ID')}</span>
          </div>
          <button className="pay-button">Bayar</button>
        </section>
      </main>
    </div>
  );
}
