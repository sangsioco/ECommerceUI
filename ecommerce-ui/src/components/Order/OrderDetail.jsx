import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Card } from 'react-bootstrap';


const OrderDetail = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    fetchOrderDetails();
  }, [id]);

  const fetchOrderDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/orders/${id}`);
      setOrder(response.data);
    } catch (error) {
      console.error('Error fetching order details:', error);
    }
  };

  if (!order) {
    return <div>Loading...</div>;
  }

  return (
    <Container className="order-detail">
      <h2>Order Details</h2>
      <Card>
        <Card.Body>
          <Card.Title>Order ID: {order.id}</Card.Title>
          <Card.Text>
            <strong>Customer:</strong> {order.customer.name}<br />
            <strong>Product:</strong> {order.product.name}<br />
            <strong>Quantity:</strong> {order.quantity}<br />
            <strong>Total Price:</strong> ${order.totalPrice}<br />
            <strong>Status:</strong> {order.status}<br />
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default OrderDetail;
