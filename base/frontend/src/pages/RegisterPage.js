import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../constants/constants";




const RegisterPage = () => {
    const navigate = useNavigate()
    const [accountNotCreated, setAccountNotCreated] = useState(false)
    const boxRef1 = useRef(null)
    const boxRef2 = useRef(null)

    function checkEqualityPassword(e ) {
        const password = e.target.password.value
        const confirmed_password = e.target.confirmed_password.value
        return password == confirmed_password
    }

    const handleClick = () =>{
        navigate('/login')
    }
   
    const handleRegister = async(e ) => {
        e.preventDefault()
        if (!checkEqualityPassword(e)) {
            const boxElement1 = boxRef1.current
            const boxElement2 = boxRef2.current
            if (boxElement1 && boxElement2) {
                boxElement1.classList.add('shake-animation');
                boxElement2.classList.add('shake-animation');
                boxElement1.addEventListener('animationend', () => {
                    boxElement1.classList.remove('shake-animation');
                });
                boxElement2.addEventListener('animationend', () => {
                    boxElement2.classList.remove('shake-animation');
                });
            }
            e.target.password.value = ''
            e.target.confirmed_password.value = ''
            return
        }
        const URL = API_URL + '/auth/user/'
        const body = {
            'email': e.target.email.value,
            'first_name': e.target.first_name.value,
            'last_name': e.target.last_name.value,
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
                // TODO ---- zrobic generacje kodu do akywacji konta
                navigate('/login')
            } else {
                console.log("JEstem tutaj")
                setAccountNotCreated(true)
            }
        } catch {
            alert("Something went wrong")
        }
    }

    return (
        
        <div class='form-container'>
            <form onSubmit={handleRegister} class='input-form'>
                <input type='text' name='first_name' placeholder='First Name' autoComplete='first_name' /> <br />
                <input type='text' name='last_name' placeholder='Last Name' autoComplete='last_name' /> <br />
                <input type='email' name='email' placeholder='Enter Your Email' autoComplete='email' /> <br />
                <input ref={boxRef1} type='password' name='password' placeholder='Enter Your Password' /> <br />
                <input ref={boxRef2} type='password' name='confirmed_password' placeholder='Confirm Your Password' /> <br />
                <input type='submit' value='Register'/>
                <div>
                        {accountNotCreated ? <AccountNotCreated /> : <></>}
                </div>
                <p onClick={handleClick}>Have an account? Let's login here</p>
            </form>

            
        </div>
        
    )
}

export default RegisterPage

function AccountNotCreated() {
    return (
        <>
            <p class='login-register-failed'>Accout Has Not Been Created!!</p>
        </>
    )
}
