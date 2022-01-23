import React, { useState, useEffect } from "react";
import firebaseConfig from "./config";

//import style
import './custom.scss';
import { Spinner } from 'react-bootstrap';

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        firebaseConfig.auth().onAuthStateChanged((user) => {
            setCurrentUser(user);
            setLoading(false);
        })
    }, []);

    if (loading) {
        return   <Spinner animation="border" className="spinner" />
    }

    return (
        <AuthContext.Provider value={{currentUser}}>
            {children}
        </AuthContext.Provider>
    )
}