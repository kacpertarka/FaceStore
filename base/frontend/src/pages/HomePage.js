import React from "react";
import NavBar from "../components/NavBar";
import ProfilePosts from "../components/ProfilePosts";


const HomePage = () => {

    return (
        <>
        <div className='home-navbar'>
            <NavBar />
        </div>
        <div className='profile'>
            <div className='profile-side'>
                <h2>Left side - here will be ... somethig amazing ;)</h2>
            </div>
            <div className='posts'>
                <ProfilePosts  />
            </div>   
        </div>
        </>
    )
}

export default HomePage
