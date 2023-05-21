import { useState, useContext, useEffect } from "react";
import './profile.styles.scss'

import { JwtTokenContext } from "../../contexts/jwt-token.context";

const Profile = () => {
    const { userData, jwtToken, setUserData } = useContext(JwtTokenContext);
    const { name, nickname, email, status, profileImg, _id } = userData;

    const [updatedUserData, setUpdatedUserData] = useState({
        name: name,
        nickname: nickname,
        email: email,
        profileImg: null
    });

    useEffect(() => {
        setUpdatedUserData({
            name: name,
            nickname: nickname,
            email: email,
            profileImg: null
        });
    }, [name, nickname, email]);

    const image = `http://localhost:8080/${profileImg}`;

    const handleChange = (e) => {
        if (e.target.name === 'profileImg') {
            setUpdatedUserData({
                ...updatedUserData,
                profileImg: e.target.files[0]
            });
        } else {
            setUpdatedUserData({
                ...updatedUserData,
                [e.target.name]: e.target.value
            });
        }
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', updatedUserData.name);
        formData.append('nickname', updatedUserData.nickname);
        formData.append('email', updatedUserData.email);
        if (updatedUserData.profileImg) {
            formData.append('image', updatedUserData.profileImg);
        }

        const requestOptions = {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${jwtToken}`
            },
            body: formData
        };

        fetch('http://localhost:8080/auth/user-data', requestOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error updating user data');
                }
                // Handle successful update
                alert('User data updated!');
                // Fetch the updated user data and update in the context
                fetch(`http://localhost:8080/auth/user-data`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${jwtToken}`
                    }
                })
                    .then(response => response.json())
                    .then(userData => {
                        // Assuming the userData contains the updated user data
                        console.log('Updated user data:', userData);
                        setUserData(userData.user);
                        localStorage.setItem('userData', JSON.stringify(userData.user));
                        // Save the user data to localStorage or state, if needed
                    })
                    .catch(error => {
                        console.error('Error fetching updated user data:', error);
                    });
            })
            .catch(error => {
                // Handle error
                console.error(error);
            });
    };


    return (
        <div className="profile-container">
            <h1>Profile</h1>
            <img src={image} alt="" />
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" value={updatedUserData.name} onChange={handleChange} />
                <label htmlFor="nickname">Nickname:</label>
                <input type="text" id="nickname" name="nickname" value={updatedUserData.nickname} onChange={handleChange} />
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" value={updatedUserData.email} onChange={handleChange} />
                <label htmlFor="profileImg">Profile Image:</label>
                <input type="file" id="profileImg" name="profileImg" onChange={handleChange} />
                <button type="submit">Update</button>
            </form>
            <p>Status: {status}</p>
        </div>
    );
}

export default Profile;
