import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    const response = await axios.get(`http://localhost:5000/products/${id}`);
    setProduct(response.data);
  };

  if (!product) return <div>Loading...</div>;

  const deleteProduct = async () => {
    await axios.delete(`http://localhost:5000/products/${id}`);
    navigate('/products');
  };
  
  // Add a button to call deleteProduct
  <Button variant="danger" onClick={deleteProduct}>Delete</Button>
  
  return (
    <div>
      <h2>Product Details</h2>
      <p><strong>Name:</strong> {product.name}</p>
      <p><strong>Price:</strong> ${product.price}</p>
    </div>
  );
};

export default ProductDetail;
