import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.styles.scss'

import Button from '../../components/button/button.component'

import { JwtTokenContext } from '../../contexts/jwt-token.context';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { jwtToken, setJwtToken } = useContext(JwtTokenContext)

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        const loginData = {
            email: email,
            password: password
        };

        fetch('http://localhost:8080/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        })
            .then(response => response.json())
            .then(data => {
                // Assuming the response contains the token and userId
                const { token, userId } = data;

                // Store the token in localStorage
                localStorage.setItem('token', token);
                setJwtToken(token);

                // Redirect or perform any other action after successful login
                console.log('Login successful. Token:', token);
            })
            .catch(error => {
                // Handle any errors
                console.error('Login error:', error);
            });
    };


    return (
        <div className='login-container'>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <Button type="submit">Login</Button>
            </form>
        </div>
    );
};

export default Login;
