import React, { useEffect, useRef, useContext} from "react";
import { API_URL } from "../constants/constants";
import AuthContext from "../context/AuthContext";

const ProfileAddPost = () => {

    const { authToken } = useContext(AuthContext)

    const inputRef = useRef(null);
    const modalRef = useRef(null);
    const buttonRef = useRef(null);
    const handleShowForm = (event ) => {
        event.preventDefault();
        modalRef.current.style.display = "block";
        // modalRef.current.style.zIndex = 100;
        inputRef.current.focus();
        
    }
    const handleClickOutside = (event ) => {
        if (event.target !== buttonRef.current && 
                modalRef.current && 
                !modalRef.current.contains(event.target)) {
            event.preventDefault();
            event.stopPropagation();
            handleHideForm();
        }
    }
    const handleHideForm = () => {
        modalRef.current.style.display = "none";
    }

    const handleSendData = async (event ) => {
        event.preventDefault()
        const URL = API_URL + '/posts/'
        const body = {
            'body': event.target.body.value
        }

        try {
            const response = await fetch(URL, {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + authToken.access,
                    'content-type': 'application/json'
                },
                body: JSON.stringify(body)
            });
            
            if (response.status === 201) {
                event.target.body.value = ""
                handleHideForm()
            }

        } catch {
            console.log("SOmething went wrong")
            // TODO - dodać powiadomienie że się nie udało dodać
        }
    }

    useEffect(() => {
        inputRef.current.focus();
        document.addEventListener('click', handleClickOutside);

        return () => document.removeEventListener('click', handleClickOutside)
    }, []);

    return (
        <>
        
        <div className='new-post'>
            <h3>zdjęcie</h3>
            <button ref={buttonRef} onClick={handleShowForm}>What's up? </button>   
            <form ref={modalRef} onSubmit={handleSendData} tabIndex={0}>
                <h1>Add new Post</h1>
                <input ref={inputRef} type="text"  name="body" placeholder="What's up?"  />
                <br/>
                <input type="submit" value='Post' />
            </form>
        </div>
        </>
    )
}


export default ProfileAddPost
