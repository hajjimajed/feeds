import { useState } from "react";
import './signup.styles.scss'

import Button from '../../components/button/button.component'

const Signup = () => {

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');
    const [profileImage, setProfileImage] = useState(null);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('email', email);
        formData.append('name', name);
        formData.append('nickname', nickname);
        formData.append('password', password);
        formData.append('image', profileImage);

        fetch('http://localhost:8080/auth/signup', {
            method: 'PUT',
            body: formData,
            headers: {
                Authorization: 'Bearer '
            },
        })

            .then((response) => {
                if (response.ok) {
                    console.log("User created successfully!");
                } else {
                    return response.json(); // parse response body as JSON
                }
            })
            .then((responseData) => {
                if (responseData && responseData.errors) {
                    // update component state to display validation errors
                    const errors = responseData.errors.map((error) => error.msg);
                    setError(errors);
                } else {
                    console.log("User created successfully!");
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div className="signup-container">
            <h1>Signup</h1>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="nickname">Nickname:</label>
                    <input
                        type="text"
                        id="nickname"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="profileImage">Image:</label>
                    <input
                        type="file"
                        id="profileImage"
                        onChange={(event) => setProfileImage(event.target.files[0])}
                    />
                </div>
                <Button type="submit">Signup</Button>
            </form>
        </div>
    )

}

export default Signup;