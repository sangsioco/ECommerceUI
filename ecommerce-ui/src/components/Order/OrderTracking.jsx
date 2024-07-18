import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Alert, Spinner } from 'react-bootstrap';

const OrderTracking = () => {
  const [orderId, setOrderId] = useState('');
  const [orderStatus, setOrderStatus] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Loading state

  const handleTrackOrder = async (event) => {
    event.preventDefault();
    setError(''); // Clear any previous errors
    setOrderStatus(''); // Clear previous status
    setLoading(true); // Start loading
    
    try {
      const response = await axios.get(`http://localhost:5000/orders/${orderId}/status`);
      setOrderStatus(response.data.status);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setError('Order not found. Please check the Order ID and try again.');
      } else {
        setError('An error occurred while fetching the order status. Please try again later.');
      }
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <Container className="order-tracking">
      <h2>Track Your Order</h2>
      <Form onSubmit={handleTrackOrder}>
        <Form.Group controlId="orderId">
          <Form.Label>Order ID</Form.Label>
          <Form.Control
            type="text"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? <Spinner as="span" animation="border" size="sm" /> : 'Track Order'}
        </Button>
      </Form>
      {orderStatus && <Alert variant="success" className="mt-3">Status: {orderStatus}</Alert>}
      {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
    </Container>
  );
};

export default OrderTracking;
