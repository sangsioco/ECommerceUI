import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/customers');
      setCustomers(response.data);
    } catch (error) {
      if (error.response) {
        // Server responded with a status code outside of the 2xx range
        setError('Error fetching customers. Please try again later.');
      } else if (error.request) {
        // The request was made but no response was received
        setError('No response from server. Please check your network connection.');
      } else {
        // Something went wrong in setting up the request
        setError('An unexpected error occurred. Please try again later.');
      }
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const deleteCustomer = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/customers/${id}`);
      setCustomers(customers.filter((customer) => customer.id !== id));
    } catch (error) {
      if (error.response) {
        // Server responded with a status code outside of the 2xx range
        setError('Error deleting customer. Please try again later.');
      } else if (error.request) {
        // The request was made but no response was received
        setError('No response from server. Please check your network connection.');
      } else {
        // Something went wrong in setting up the request
        setError('An unexpected error occurred. Please try again later.');
      }
    }
  };

  return (
    <div>
      <h2>Customer List</h2>
      {loading ? (
        <p>Loading...</p> // Show loading text while fetching data
      ) : (
        <>
          {error && <Alert variant="danger">{error}</Alert>}
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.id}>
                  <td>{customer.name}</td>
                  <td>{customer.email}</td>
                  <td>{customer.phone}</td>
                  <td>
                    <Link to={`/customers/edit/${customer.id}`}>
                      <Button variant="info" className="mr-2">Edit</Button>
                    </Link>
                    <Button variant="danger" onClick={() => deleteCustomer(customer.id)}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </div>
  );
};

export default CustomerList;
