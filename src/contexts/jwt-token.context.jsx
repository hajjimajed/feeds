import { createContext, useState } from "react";


export const JwtTokenContext = createContext({
    jwtToken: null,
    setJwtToken: () => null,
    userData: null,
    setUserData: () => null
})

export const JwtTokenProvider = ({ children }) => {
    const [jwtToken, setJwtToken] = useState(localStorage.getItem('token'));

    const [userData, setUserData] = useState(() => {
        const storedUserData = localStorage.getItem('userData');
        return storedUserData ? JSON.parse(storedUserData) : null;
    });

    const value = { jwtToken, setJwtToken, userData, setUserData };

    console.log('bla bla', userData);

    return <JwtTokenContext.Provider value={value}>{children}</JwtTokenContext.Provider>;
}