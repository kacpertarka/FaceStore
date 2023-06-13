import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const PrivateRoute = ({children}) => {
    const { user } = useContext(AuthContext)

    if (user) {
        return children
    }
    return <Navigate to='/login' replace />
}

export default PrivateRoute
