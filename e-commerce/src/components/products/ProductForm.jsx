import React, { useRef, useState } from 'react';

const ProductForm = () => {
    const nameRef = useRef(null);
    const priceRef = useRef(null);
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const errors = {};
        const name = nameRef.current.value;
        const price = parseFloat(priceRef.current.value);  // Ensure price is a number
        if (!name) errors.name = 'Product name is required';
        if (!price || price <= 0) errors.price = 'Price must be a positive number';
        return errors;
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const errors = validateForm();
        if (Object.keys(errors).length === 0) {
            const name = nameRef.current.value;
            const price = parseFloat(priceRef.current.value);
            console.log('Submitted product:', {name, price});
        } else {
            setErrors(errors);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Add/Edit</h3>
            <label>
                Name:
                <input type="text" ref={nameRef} />
                {errors.name && <div style={{ color: 'red' }}>{errors.name}</div>}
            </label>
            <br />
            <label>
                Price:
                <input type="number" ref={priceRef} />
                {errors.price && <div style={{ color: 'red' }}>{errors.price}</div>}
            </label>
            <br />
            <button type="submit">Submit</button>
        </form>
    );
};

export default ProductForm;