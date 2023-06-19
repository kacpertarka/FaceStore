import React, { useState, createContext, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

import { API_URL } from "../constants/constants";

const AuthContext = createContext('');


export default AuthContext;

export const AuthProvider = ({children}) => {

    const [user, setUser] = useState(
        localStorage.getItem('authToken') ? jwt_decode( localStorage.getItem('authToken') ) : null
    );
    const [authToken, setAuthToken] = useState(
        localStorage.getItem('authToken') ? JSON.parse(localStorage.getItem('authToken')) : null
    )
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    const login = async(e ) => {
        // login function
        e.preventDefault()
        
        const URL = API_URL + '/auth/token/'
        const body = {
            'email': e.target.email.value,
            'password': e.target.password.value
        }
        try {
            const response = await fetch(URL, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(body)
            })
            if (response.status === 200) {
                const data = await response.json();
                setAuthToken(data)
                setUser(jwt_decode(data.access))
                localStorage.setItem('authToken', JSON.stringify(data))
                navigate('/')
            } else {
                // TODO handle incorrect login
                alert('Login Error')
            }
        } catch(err) {
            // TODO - handle error - server error
            console.log('ERROR: ', err)
        }
    }

    const logout = async() => {
        setAuthToken(null)
        setUser(null)
        localStorage.removeItem('authToken')
        navigate('/login')
    }

    const refreshToken = async() => {
        const URL = API_URL + '/auth/token/refresh/'
        try {
            const response = await fetch(URL, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({'refresh':authToken?.refresh})
            })

            if (response.status === 200) {
                const data = await response.json()
                setAuthToken(data)
                setUser(jwt_decode(data.access))
                localStorage.setItem('authTokens', JSON.stringify(data))
            } else {
                logout()
            }
        } catch {
            logout()
        }
        if (loading) {
            setLoading(false)
        }
    }

    useEffect( () => {
        if (loading) {
            refreshToken()
        }
        const intervalTime = 1000 * 60 * 4 // 4 minutes
        const interval = setInterval( () => {
            if (authToken) {
                refreshToken()
            }
        }, intervalTime)
        return () => clearInterval(interval)
    }, [authToken, loading])

    const contextData = {
        login: login,
        logout: logout,
        user: user,
        authToken: authToken
    }
    return (
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    )
}
