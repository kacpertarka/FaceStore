import React, {useEffect, useState} from "react";
import AuthContext from "../../context/AuthContext";
import { API_URL } from "../../constants/constants";
import { useNavigate } from "react-router-dom";


const ActivateAccountPage = () =>{
    const navigate = useNavigate()
    const activateUrl = localStorage.getItem('activateCode')
    const email = localStorage.getItem('email')
    const [readOnly2, setReadOnly2] = useState(false)
    const [readOnly3, setReadOnly3] = useState(false)
    const [readOnly4, setReadOnly4] = useState(false)
    const [readOnly5, setReadOnly5] = useState(false)
    const [readOnly6, setReadOnly6] = useState(false)
    console.log('AKTYWACJA: ', activateUrl)
    const handleSubmit = async(e ) => {
        e.preventDefault()
        let code = ''
        for (let i = 1; i < 7; i++) {
            const field = `code_${i}`
            code = code + e.target[field].value
        }
        const URL = API_URL + '/auth/user/activate/' + activateUrl + '/'
        const body = {
            "email": email,
            "activate_code": code
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
                localStorage.removeItem('activateCode')
                navigate('/login')
            } else {
                alert('Incorrect activate code')
            }
        } catch {
            alert('Server Error')
        }
    }

    useEffect( () => {
        // removing activate_code from local storage after 5 minutes
        const timeToSleep = 1000 * 60 * 5
        setTimeout( () => {
            localStorage.removeItem('activateCode')
        }, timeToSleep)
    }, [])


    return (
        <>
        <h1> Thank for creating an account, activate it with received code</h1>
    
        <form className='activate-form' onSubmit={handleSubmit}>
            <input type='number' id='input-1' name='code_1' pattern="[0-9]" maxLength='1' />
            <input type='number' id='input-2' name='code_2' pattern="[0-9]" maxLength='1' readOnly={readOnly2} />
            <input type='number' id='input-3' name='code_3' pattern="[0-9]" maxLength='1' readOnly={readOnly3} />
            <input type='number' id='input-4' name='code_4' pattern="[0-9]" maxLength='1' readOnly={readOnly4} />
            <input type='number' id='input-5' name='code_5' pattern="[0-9]" maxLength='1' readOnly={readOnly5} />
            <input type='number' id='input-6' name='code_6' pattern="[0-9]" maxLength='1' readOnly={readOnly6} /> <br />
            <input type='submit' value='Activate'/>
        </form>
        
        </>
    )
}

export default ActivateAccountPage
