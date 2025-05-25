import { createContext, useState, useContext } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState(null);

    const updateAuthToken = (newToken) => {
        setAuthToken(newToken);
    }

    const clearAuthToken = () => {
        setAuthToken(null);
    }

    return (
        <AuthContext.Provider value={{ authToken, updateAuthToken, clearAuthToken }}>
            {children}
        </AuthContext.Provider>
    );

};

export const useAuth = () => {
    return useContext(AuthContext);
};