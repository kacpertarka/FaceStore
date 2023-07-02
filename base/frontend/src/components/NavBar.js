import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const NavBar = () => {

    const { logout } =useContext(AuthContext)
    return (
        <div className='navbar'>
            <ul>
                <li>Profile </li>
                <li>Add New Post</li>
                <li>Notifications</li>
                <li>Messages</li>
                <li onClick={logout}>LogOut</li>
            </ul>
        </div>
    )
}

export default NavBar
