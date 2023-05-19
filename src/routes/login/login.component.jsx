import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.styles.scss'

import Button from '../../components/button/button.component'

import { JwtTokenContext } from '../../contexts/jwt-token.context';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { jwtToken, setJwtToken, setUserData } = useContext(JwtTokenContext);
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

                // Fetch user data based on userId
                fetch(`http://localhost:8080/auth/user-data`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                    .then(response => response.json())
                    .then(userData => {
                        // Assuming the userData contains the user data
                        console.log('User data:', userData);
                        setUserData(userData.user);
                        localStorage.setItem('userData', JSON.stringify(userData.user));
                        // Save the user data to localStorage or state, if needed
                    })
                    .catch(error => {
                        console.error('Error fetching user data:', error);
                    });

                // Redirect or perform any other action after successful login
                console.log('Login successful. Token:', token);
                navigate('/');
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
