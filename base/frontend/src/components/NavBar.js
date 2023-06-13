import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const NavBar = () => {

    const { user, logout } =useContext(AuthContext)
    console.log("USER: ", user)
    return (
        <div>
            <ul>
                <li>Profile</li>
                <li>Add New Post</li>
                <li>Ntifications</li>
                <li>Messages</li>
                <li onClick={logout}>LogOut</li>
            </ul>
            <p>Hello {user.first_name}</p>
        </div>
    )
}

export default NavBar
