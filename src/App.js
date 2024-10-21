import React, { useState } from 'react';
import axios from 'axios';
import './styles.css';

function App() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        secret_number: '',
        image: null
    });

    const handleChange = e => {
        const { name, value, files } = e.target;
        if (files) {
            setFormData({ ...formData, [name]: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async e => {
        e.preventDefault();

        const data = new FormData();
        data.append('name', formData.name);
        data.append('email', formData.email);
        data.append('secret_number', formData.secret_number);
        data.append('image', formData.image);

        try {
            await axios.post('internal-apptierbackendloadbalancer-203828678.us-east-1.elb.amazonaws.com/submit', data);
            alert('Data submitted successfully!');
        } catch (error) {
            console.error(error);
            alert('An error occurred while submitting data.');
        }
    };

    return (
        <div className="container">
            <h2>User Information Form</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    required
                    onChange={handleChange}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                    onChange={handleChange}
                />
                <input
                    type="number"
                    name="secret_number"
                    placeholder="Secret Number"
                    required
                    onChange={handleChange}
                />
                <input
                    type="file"
                    name="image"
                    accept="image/*"
                    required
                    onChange={handleChange}
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default App;
