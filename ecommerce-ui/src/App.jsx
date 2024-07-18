import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Container, Navbar, Nav } from 'react-bootstrap';
import CustomerList from './components/Customer/CustomerList';
import CustomerForm from './components/Customer/CustomerForm';
import UpdateCustomerForm from './components/Customer/UpdateCustomerForm';
import ProductList from './components/Product/ProductList';
import CreateProductForm from './components/Product/ProductForm';
import UpdateProductForm from './components/Product/UpdateProductForm';
import ProductDetail from './components/Product/ProductDetail';
import ProductStock from './components/Product/ProductStock';
import OrderDetail from './components/Order/OrderDetail';
import OrderForm from './components/Order/OrderForm';
import OrderTracking from './components/Order/OrderTracking';
import Footer from './components/Shared/Footer';
import NotFound from './components/Shared/NotFound';

function App() {
  const appStyles = {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh'
  };

  const contentStyles = {
    flex: '1'
  };

  return (
    <Router>
      <div style={appStyles}>
        <Navbar bg="dark" variant="dark" expand="lg">
          <Navbar.Brand as={Link} to="/">E-Commerce App</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/customers">Customers</Nav.Link>
            <Nav.Link as={Link} to="/customers/new">Add Customer</Nav.Link>
            <Nav.Link as={Link} to="/products">Products</Nav.Link>
            <Nav.Link as={Link} to="/products/new">Add Product</Nav.Link>
            <Nav.Link as={Link} to="/product-stock">Manage Stock</Nav.Link>
            <Nav.Link as={Link} to="/orderform">Place Order</Nav.Link>
            <Nav.Link as={Link} to="/ordertracking">Track Order</Nav.Link>
          </Nav>
        </Navbar>
        <Container className="mt-4" style={contentStyles}>
          <Routes>
            <Route path="/customers" element={<CustomerList />} />
            <Route path="/customers/new" element={<CustomerForm />} />
            <Route path="/customers/edit/:id" element={<UpdateCustomerForm />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/new" element={<CreateProductForm />} />
            <Route path="/products/edit/:id" element={<UpdateProductForm />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/product-stock" element={<ProductStock />} />
            <Route path="/orderform" element={<OrderForm />} />
            <Route path="/ordertracking" element={<OrderTracking />} />
            <Route path="/orders/:id" element={<OrderDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Container>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
