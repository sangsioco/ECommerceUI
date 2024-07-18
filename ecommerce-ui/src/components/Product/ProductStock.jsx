import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Form } from 'react-bootstrap';

const ProductStock = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showRestockModal, setShowRestockModal] = useState(false);
  const [restockQuantity, setRestockQuantity] = useState(0);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleRestockClick = (product) => {
    setSelectedProduct(product);
    setShowRestockModal(true);
  };

  const handleRestock = async () => {
    try {
      await axios.post(`http://localhost:5000/products/${selectedProduct.id}/restock`, { quantity: restockQuantity });
      fetchProducts();
      setShowRestockModal(false);
      setRestockQuantity(0);
      setSelectedProduct(null);
    } catch (error) {
      console.error('Error restocking product:', error);
    }
  };

  return (
    <div>
      <h2>Manage Product Stock</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>${product.price}</td>
              <td>{product.stock}</td>
              <td>
                <Button variant="primary" onClick={() => handleRestockClick(product)}>
                  Restock
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Restock Modal */}
      <Modal show={showRestockModal} onHide={() => setShowRestockModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Restock Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="restockQuantity">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                min="1"
                value={restockQuantity}
                onChange={(e) => setRestockQuantity(Number(e.target.value))}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowRestockModal(false)}>Close</Button>
          <Button variant="primary" onClick={handleRestock}>Restock</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProductStock;
