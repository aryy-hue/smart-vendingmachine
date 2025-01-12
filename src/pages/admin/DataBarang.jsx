import React from 'react'
import Navbar from '../../components/admin/Navbar'
import Chart from '../../components/admin/Chart';
import { Link } from 'react-router-dom'
import TableDataBarang from '../../components/admin/TableDataBarang'

export default function DataBarang() {
  return (
    <div className="admin">
      <div className="container">
        <Navbar />
       
        {/* Tambahkan Data Table di bawah chart */}
        <div className="data-table-section">
          <div className="data-table-header">
            <h1>Data Barang</h1>
            {/* <Link to="/data-barang/add">
              <button className="add-item-btn">Tambah Data Barang</button>
            </Link> */}
          </div>
          <TableDataBarang />
        </div>
      </div>
    </div>
  )
}
