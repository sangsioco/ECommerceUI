import { Component } from "react";
import { func } from "prop-types";
import Axios from 'axios';

class CustomerList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedCustomerId: null,
            customers: []
        };
    }

    componentDidMount() {
        Axios.get('http://127.0.0.1:5000/customers')
            .then(response => {
                this.setState({ customers: response.data });
            })
            .catch(error => {
                console.error('There was an error fetching the customers!', error);
            });
    }

    // UPDATING
    componentDidUpdate(prevProps, prevState) {
        if (prevState.selectedCustomerId !== this.state.selectedCustomerId) {
            console.log(`New customer selected: ID ${this.state.selectedCustomerId}`);
        }
    }

    // UNMOUNTING
    componentWillUnmount() {
        console.log('Customer component is being unmounted');
    }

    selectCustomer = (id) => {
        this.setState({ selectedCustomerId: id });
        this.props.onCustomerSelect(id);
    }

    render() {
        const { selectedCustomerId, customers } = this.state;

        return (
            <div className='customer-list'>
                <h3>Customers</h3>
                <ul>
                    {customers.map(customer => (
                        <li key={customer.id} onClick={() => this.selectCustomer(customer.id)}>
                            {customer.name}
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

CustomerList.propTypes = {
    onCustomerSelect: func

};


export default CustomerList;
