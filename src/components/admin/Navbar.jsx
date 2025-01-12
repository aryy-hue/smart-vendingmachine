import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar-admin">
      {/* Bagian Bawah */}
      <div className="navbar-bottom">
        <Link to="/monitoring">
          <button>Monitoring</button>
        </Link>
        <Link to="/admin">
          <button>Data Barang</button>
        </Link>
        <Link to="/transaksi">
          <button>Transaksi</button>
        </Link>
        <Link to="/login">
          <button>Logout</button>
        </Link>
      </div>
    </nav>
  );
}
