// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            if (!isTokenExpired(parsedUser.token)) {
                setUser(parsedUser);
            }
        }
    }, []);

    const isTokenExpired = (token) => {
        if (!token) return true;
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.exp * 1000 < Date.now();
    };

    const login = async (credentials) => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/token/', credentials);
            const userData = { token: response.data.access };
            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData));
        } catch (error) {
            throw new Error('Login failed');
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
