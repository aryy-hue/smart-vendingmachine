import React from 'react'
import Navbar from '../../components/admin/Navbar'
import Chart from '../../components/admin/Chart';
import { Link } from 'react-router-dom'
import TableTransaksi from '../../components/admin/TableTransaksi'

export default function Transaksi() {
  return (
    <div className="admin">
      <div className="container">
        <Navbar />
        {/* Tambahkan Data Table di bawah chart */}
        <div className="data-table-section">
          <div className="data-table-header">
            <h1>Data Transaksi</h1>
            <Link to="/transaksi/add">
              <button className="add-item-btn">Tambah Data Transaksi</button>
            </Link>
          </div>
          <TableTransaksi />
        </div>
      </div>
    </div>
  )
}
