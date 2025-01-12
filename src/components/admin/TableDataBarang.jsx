import React, { useState, useEffect } from 'react';

export default function TableDataBarang() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/products');
        const result = await response.json();
        if (result.message === 'Products retrieved successfully') {
          setData(result.data);
        } else {
          setError('Failed to retrieve products');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = data.slice(indexOfFirstItem, indexOfLastItem);

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

  // Handle delete product
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (confirmDelete) {
      try {
        const response = await fetch(`http://localhost:3000/api/products/delete/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setData(data.filter(item => item.id !== id)); // Remove item from the state
          alert('Product deleted successfully');
        } else {
          alert('Failed to delete the product');
        }
      } catch (err) {
        alert('Error: ' + err.message);
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

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
            <th style={{ padding: '10px', width: '150px' }}>Harga</th>
            <th style={{ padding: '10px', width: '100px' }}>Stok</th>
            <th style={{ padding: '10px', width: '100px' }}>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((item) => (
            <tr key={item.id} style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: '10px', width: '50px' }}>{item.id}</td>
              <td style={{ padding: '10px', width: '200px' }}>
                <img
                  src={`images/${item.image_url}`}
                  alt={item.name}
                  style={{ width: '100px', height: 'auto' }}
                />
              </td>
              <td style={{ padding: '10px', width: '200px' }}>{item.name}</td>
              <td style={{ padding: '10px', width: '150px' }}>{item.price}</td>
              <td style={{ padding: '10px', width: '100px' }}>{item.stock}</td>
              <td style={{ padding: '10px', width: '100px', textAlign: 'center' }}>
                <button
                  onClick={() => handleUpdate(item.id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    marginRight: '10px',
                  }}
                >
                  {/* <i className="fas fa-edit" style={{ color: 'blue', fontSize: '18px' }}></i> */}
                </button>
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
            cursor: currentPage >= Math.ceil(data.length / itemsPerPage)
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
