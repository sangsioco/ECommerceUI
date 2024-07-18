import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Container, Alert, Spinner } from 'react-bootstrap';

const OrderForm = () => {
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState(null);   // Error state
  const [success, setSuccess] = useState(null); // Success state
  const [loading, setLoading] = useState(true);  // Loading state

  useEffect(() => {
    fetchCustomers();
    fetchProducts();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/customers');
      setCustomers(response.data);
    } catch (error) {
      setError('Failed to fetch customers. Please try again later.');
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/products');
      setProducts(response.data);
    } catch (error) {
      setError('Failed to fetch products. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handlePlaceOrder = async (event) => {
    event.preventDefault();
    setError(null);  // Clear any previous errors
    setSuccess(null);  // Clear previous success messages
    
    try {
      await axios.post('http://localhost:5000/orders', {
        customerId: selectedCustomer,
        productId: selectedProduct,
        quantity,
      });
      setSuccess('Order placed successfully!');
    } catch (error) {
      setError('Failed to place the order. Please try again.');
    }
  };

  return (
    <Container className="order-form">
      <h2>Place Order</h2>
      {loading ? (
        <Spinner animation="border" />
      ) : (
        <Form onSubmit={handlePlaceOrder}>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}
          <Form.Group controlId="customerSelect">
            <Form.Label>Customer</Form.Label>
            <Form.Control
              as="select"
              value={selectedCustomer}
              onChange={(e) => setSelectedCustomer(e.target.value)}
              required
            >
              <option value="">Select Customer</option>
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>{customer.name}</option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="productSelect">
            <Form.Label>Product</Form.Label>
            <Form.Control
              as="select"
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
              required
            >
              <option value="">Select Product</option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>{product.name}</option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="quantity">
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">Place Order</Button>
        </Form>
      )}
    </Container>
  );
};

export default OrderForm;
