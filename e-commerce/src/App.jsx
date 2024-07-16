import React, { Component } from 'react';
import './AppStyles.css';
import CustomerForm from './components/customers/CustomerForm';
import CustomerList from './components/customers/CustomerList';
import OrderList from './components/orders/OrderList';
import ProductList from './components/products/ProductList';
import ProductForm from './components/products/ProductForm';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedCustomerId: null,
            selectedOrderId: null,
            showCustomerForm: false,
            showProductForm: false,
            formType: '', // to differentiate between "add" and "edit" forms
        };
    }

    handleCustomerSelect = (customerId) => {
        this.setState({ selectedCustomerId: customerId, selectedOrderId: null });
    }

    handleOrderSelect = (orderId) => {
        this.setState({ selectedOrderId: orderId });
    }

    handleAddCustomer = () => {
        this.setState({ showCustomerForm: true, formType: 'add' });
    }

    handleEditCustomer = () => {
        this.setState({ showCustomerForm: true, formType: 'edit' });
    }

    handleAddProduct = () => {
        this.setState({ showProductForm: true, formType: 'add' });
    }

    handleEditProduct = () => {
        this.setState({ showProductForm: true, formType: 'edit' });
    }

    closeForm = () => {
        this.setState({ showCustomerForm: false, showProductForm: false });
    }

    render() {
        const { selectedCustomerId, selectedOrderId, showCustomerForm, showProductForm, formType } = this.state;

        return (
            <div className='app-container'>
                <h1>Our Customers</h1>
                <CustomerList onCustomerSelect={this.handleCustomerSelect} />

                <button onClick={this.handleAddCustomer}>Add Customer</button>
                <button onClick={this.handleAddProduct}>Add Product</button>

                {selectedCustomerId && (
                    <>
                        <OrderList
                            customerId={selectedCustomerId}
                            onOrderSelect={this.handleOrderSelect}
                        />
                        <button onClick={this.handleEditCustomer}>Edit Customer</button>
                    </>
                )}

                {selectedOrderId && (
                    <ProductList orderId={selectedOrderId} />
                )}

                {showCustomerForm && (
                    <CustomerForm
                        customerId={selectedCustomerId}
                        formType={formType}
                        onClose={this.closeForm}
                    />
                )}

                {showProductForm && (
                    <ProductForm
                        orderId={selectedOrderId}
                        formType={formType}
                        onClose={this.closeForm}
                    />
                )}
            </div>
        );
    }
}

export default App;