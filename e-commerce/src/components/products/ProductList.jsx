import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Axios from 'axios';


const ProductList = ({ orderId }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Fetch products only when orderId is present
        if (orderId) {
            const fetchProducts = async () => {
                try {
                    const response = await Axios.get('http://127.0.0.1:5000/products');
                    setProducts(response.data);
                } catch (error) {
                    console.error('Error fetching products', error);
                }
            };

            fetchProducts();
        }
    }, [orderId]);

    return (
        <div className='product-list'>
            <h3>Products</h3>
            <ul>
                {products.map(product => (
                    <li key={product.id}>
                        {product.name} (ID: {product.id})
                    </li>
                ))}
            </ul>
        </div>
    );
}

ProductList.propTypes = {
    orderId: PropTypes.number  // Use PropTypes.number.isRequired if orderId is required
};

export default ProductList;