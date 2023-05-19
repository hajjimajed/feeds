import { useContext } from "react";

import { JwtTokenContext } from "../../contexts/jwt-token.context";

const Profile = () => {

    const { userData } = useContext(JwtTokenContext)

    console.log(userData, 'from profile')

    return (
        <div>
            <h1>Profile</h1>
            <p>Name: {userData.name}</p>
            <p>Name: {userData.email}</p>
            <p>Status: {userData.status}</p>
        </div>
    )

}

export default Profile;