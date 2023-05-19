import { createContext, useState } from "react";


export const JwtTokenContext = createContext({
    jwtToken: null,
    setJwtToken: () => null
})

export const JwtTokenProvider = ({ children }) => {
    const [jwtToken, setJwtToken] = useState(localStorage.getItem('token'));

    const value = { jwtToken, setJwtToken };

    return <JwtTokenContext.Provider value={value}>{children}</JwtTokenContext.Provider>;
}

