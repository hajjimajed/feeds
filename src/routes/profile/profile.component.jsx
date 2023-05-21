import { useContext } from "react";
import './profile.styles.scss'

import { JwtTokenContext } from "../../contexts/jwt-token.context";

const Profile = () => {

    const { userData } = useContext(JwtTokenContext)

    console.log(userData, 'from profile')

    return (
        <div className="profile-container">
            <h1>Profile</h1>
            <img src="https://cdn-icons-png.flaticon.com/512/5087/5087579.png" alt="" />
            <p>Name: {userData.name}</p>
            <p>Name: {userData.email}</p>
            <p>Status: {userData.status}</p>
        </div>
    )

}

export default Profile;