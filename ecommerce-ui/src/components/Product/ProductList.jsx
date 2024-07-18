import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Alert, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/products');
      setProducts(response.data);
      setError(null); // Clear previous errors
    } catch (err) {
      setError('Failed to load products. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/products/${id}`);
      setSuccess('Product deleted successfully!');
      setProducts(products.filter(product => product.id !== id)); // Update the product list
      setError(null); // Clear previous errors
    } catch (err) {
      setError('Failed to delete product. Please try again.');
    }
  };

  return (
    <div>
      <h2>Product List</h2>
      {loading ? (
        <Spinner animation="border" />
      ) : (
        <>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>
                    <Link to={`/products/${product.id}`}>
                      <Button variant="info" className="mr-2">View</Button>
                    </Link>
                    <Link to={`/products/edit/${product.id}`}>
                      <Button variant="info" className="mr-2">Edit</Button>
                    </Link>
                    <Button
                      variant="danger"
                      onClick={() => deleteProduct(product.id)}
                    >
                      Delete
                    </Button>
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

export default ProductList;
