class CustomerForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            phone: '',
            errors: {}
        };
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
        console.log(name, value);
    };

    // VALIDATE FORM
    validateForm = () => {
        const { name, email, phone } = this.state;
        const errors = {};
        if (!name) errors.name = 'Name is required';
        if (!email) errors.email = 'Email is required';
        if (!phone) errors.phone = 'Phone is required';
        return errors;
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const errors = this.validateForm();
        if (Object.keys(errors).length === 0) {
            console.log('Submitted customer', this.state);
            const customerData = {
                name: this.state.name.trim(),
                email: this.state.email.trim(),
                phone: this.state.phone.trim(),
            };
            axios.post('http://127.0.0.1:5000/customers', customerData)
                .then(response => {
                    console.log('Data successfully submitted:', response.data);
                })
                .catch(error => {
                    console.error('There was an error submitting the form:', error);
                });
        } else {
            this.setState({ errors });
        }
    };

    render() {
        const { name, email, phone, errors } = this.state;

        return (
            <form onSubmit={this.handleSubmit}>
                <h3>Add/Edit</h3>
                <label>
                    Name:
                    <input type="text" name="name" value={name} onChange={this.handleChange} />
                    {errors.name && <div style={{ color: 'red' }}>{errors.name}</div>}
                </label>
                <br />
                <label>
                    Email:
                    <input type="text" name="email" value={email} onChange={this.handleChange} />
                    {errors.email && <div style={{ color: 'red' }}>{errors.email}</div>}
                </label>
                <br />
                <label>
                    Phone:
                    <input type="text" name="phone" value={phone} onChange={this.handleChange} />
                    {errors.phone && <div style={{ color: 'red' }}>{errors.phone}</div>}
                </label>
                <br />
                <button type="submit">Submit</button>
            </form>
        );
    }
}

export default CustomerForm;