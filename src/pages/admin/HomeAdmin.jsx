import React from 'react';
import Navbar from '../../components/admin/Navbar';
import '../../css/admin.css';
import Chart from '../../components/admin/Chart';
import { Link } from 'react-router-dom';
import TableStokBarang from '../../components/admin/TableStokBarang';

export default function HomeAdmin() {
  return (
    <div className="admin">
      <div className="container">
        <Navbar />
        {/* Tambahkan Data Table di bawah chart */}
        <div className="data-table-section">
          <div className="data-table-header">
            <h1>Stok Barang</h1>
            <Link to="/stokBarang/tambah">
              <button className="add-item-btn">Tambah Barang</button>
            </Link>
          </div>
          <TableStokBarang />
        </div>
      </div>
    </div>
  );
}
