import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';  // Import Link dari react-router-dom

function ProductCard({ product, addToCart }) {
  return (
    <div className="product-card">
      <button className="favorite-icon">⭐</button>
      <div className="product-image"><img src={`images/${product.image_url}`} alt={product.name} /></div>
      <h3 className="product-name">{product.name}</h3>
      <p className="product-category">{product.category}</p>
      <p className="product-price">Rp.{product.price.toLocaleString('id-ID')}</p>
      <button className="add-to-cart-btn" onClick={() => addToCart(product)}>Buy Now!</button>
    </div>
  );
}

function DaftarProduk() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/products')
      .then((response) => {
        setProducts(response.data.data);
      })
      .catch((error) => {
        console.error('There was an error fetching the products!', error);
      });
  }, []);

  const addToCart = (product) => {
    // Tambahkan produk ke keranjang
    setCart([...cart, product]);

    // Bangun endpoint berdasarkan ID produk
    const servoEndpoint = `http://192.168.66.111/servo${product.id}`;

    // Panggil API dengan endpoint yang sesuai
    axios.post(servoEndpoint, { productId: product.id })
      .then(response => {
        console.log('API Response:', response.data);
      })
      .catch(error => {
        console.error('Error calling the API:', error);
      });
  };

  return (
    <div className="container">
      <div className="product-grid">
        {products.length > 0 ? (
          products.map((product, index) => (
            <ProductCard key={index} product={product} addToCart={addToCart} />
          ))
        ) : (
          <p>Loading products...</p>
        )}
      </div>

      <Link to={{ pathname: "/checkout", state: { cart } }}>
        <button className="view-cart-btn">Go to Checkout</button>
      </Link>
    </div>
  );
}

export default DaftarProduk;
