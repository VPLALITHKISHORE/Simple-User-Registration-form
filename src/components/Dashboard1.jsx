// src/Dashboard1.js

import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register the necessary components of Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Dashboard1 = () => {
  const [certificates, setCertificates] = useState([
    { no: '123456', name: 'John Doe', type: 'Birth Certificate', status: 'Pending' },
    { no: '789012', name: 'Jane Smith', type: 'Income Certificate', status: 'Approved' }
  ]);
  const [filter, setFilter] = useState('all');
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    // Fetch or update certificates data here
  }, []);

  const handleSearch = (event) => {
    setSearchInput(event.target.value.toLowerCase());
  };

  const handleFilter = (event) => {
    setFilter(event.target.value.toLowerCase());
  };

  const filteredCertificates = certificates.filter(cert => 
    (filter === 'all' || cert.status.toLowerCase() === filter) &&
    (cert.no.toLowerCase().includes(searchInput) || cert.name.toLowerCase().includes(searchInput))
  );

  const handleChangeStatus = (index, newStatus) => {
    const updatedCertificates = [...certificates];
    updatedCertificates[index].status = newStatus;
    setCertificates(updatedCertificates);
  };

  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Approved Certificates',
        data: [12, 19, 3, 5, 2, 3],
        borderColor: 'green',
        fill: false
      },
      {
        label: 'Rejected Certificates',
        data: [2, 3, 20, 5, 1, 4],
        borderColor: 'red',
        fill: false
      },
      {
        label: 'Pending Certificates',
        data: [15, 10, 12, 7, 8, 13],
        borderColor: 'blue',
        fill: false
      }
    ]
  };

  return (
    <div className="dashboard" style={styles.dashboard}>
      <h1>Certificate Monitoring Dashboard</h1>

      <div className="stats" style={styles.stats}>
        <div className="card" style={styles.card}>
          <h3>Total Certificates</h3>
          <p>{certificates.length}</p>
        </div>
        <div className="card" style={styles.card}>
          <h3>Pending Approval</h3>
          <p>{certificates.filter(cert => cert.status === 'Pending').length}</p>
        </div>
        <div className="card" style={styles.card}>
          <h3>Rejected Certificates</h3>
          <p>{certificates.filter(cert => cert.status === 'Rejected').length}</p>
        </div>
        <div className="card" style={styles.card}>
          <h3>Under Review</h3>
          <p>{certificates.filter(cert => cert.status === 'Under Review').length}</p>
        </div>
      </div>

      <input
        className="search-bar"
        type="text"
        placeholder="Search by Certificate No or Applicant Name"
        value={searchInput}
        onChange={handleSearch}
        style={styles.searchBar}
      />

      <div className="filters">
        <label htmlFor="status">Filter by Status: </label>
        <select id="status" onChange={handleFilter} style={styles.select}>
          <option value="all">All</option>
          <option value="approved">Approved</option>
          <option value="pending">Pending</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      <div className="recent-activity" style={styles.recentActivity}>
        <h2>Recent Activity</h2>
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Certificate No</th>
              <th>Applicant Name</th>
              <th>Type</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCertificates.map((cert, index) => (
              <tr key={cert.no}>
                <td>{cert.no}</td>
                <td>{cert.name}</td>
                <td>{cert.type}</td>
                <td>{cert.status}</td>
                <td>
                  <button style={styles.button} onClick={() => alert(`Viewing certificate: ${cert.no}`)}>View</button>
                  {cert.status !== 'Approved' && <button style={styles.button} onClick={() => handleChangeStatus(index, 'Approved')}>Approve</button>}
                  {cert.status !== 'Rejected' && <button style={{ ...styles.button, backgroundColor: '#dc3545' }} onClick={() => handleChangeStatus(index, 'Rejected')}>Reject</button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="chart-container" style={styles.chartContainer}>
        <h2>Certificate Activity Over Time</h2>
        <Line data={data} options={{ responsive: true, scales: { x: { beginAtZero: true }, y: { beginAtZero: true } } }} />
      </div>
    </div>
  );
};

// Inline styles for simplicity
const styles = {
  dashboard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px'
  },
  stats: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: '20px'
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    width: '23%',
    textAlign: 'center'
  },
  searchBar: {
    padding: '10px',
    width: '100%',
    marginBottom: '20px',
    borderRadius: '4px',
    border: '1px solid #ccc'
  },
  select: {
    padding: '5px',
    borderRadius: '4px',
    border: '1px solid #ccc'
  },
  recentActivity: {
    width: '100%',
    marginBottom: '20px'
  },
  table: {
    width: '100%',
    backgroundColor: 'white',
    borderCollapse: 'collapse',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)'
  },
  button: {
    padding: '5px 10px',
    color: 'white',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    margin: '0 5px'
  },
  chartContainer: {
    width: '100%',
    marginTop: '30px',
    backgroundColor: 'white',
    padding: '20px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px'
  }
};

export default Dashboard1;
