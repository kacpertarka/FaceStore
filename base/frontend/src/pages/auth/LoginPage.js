import React, {useContext} from "react";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const email = localStorage.getItem('email') ? localStorage.getItem('email') : 'Enter your Email adress'
   
    const { login } = useContext(AuthContext)
    const navigate = useNavigate()
    const handleClick = () => {
        navigate('/register')
    }

    return (
        <div class='form-container'>
        <form onSubmit={login} className='input-form'>
            <input type='email' name='email' placeholder={email}  />
            <input type='password' name='password' placeholder='Enter your Password' />
            <input type='submit' value='Login' />
            <p onClick={handleClick}>New? Let's create an account</p>
        </form>
        
        </div>
    )
}

export default LoginPage
