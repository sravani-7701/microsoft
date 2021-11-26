import React from 'react'
import {useHistory} from 'react-router-dom'
import kid from '../assets/kid.png'
import victory_image from '../assets/slider-icon.png'
import './Header.css'
function Header() {
    let history = useHistory();
    return (
            <div className="header-banner">
            <header className="header-main">
                <div id="company">
                    <img src={kid} className="homepage-logo" alt="kid" style={{background:"transparent",height:"150px",width:"auto"}}/>
                </div>
                <nav className="header-nav">

                    <div className="login-btn">Home</div>
                    <a href="#container2" className="aboutusheader">About Us</a>
                    <div onClick={() => history.push('/login')} className="login-btn">Login</div>
                    <div onClick={() => history.push('/signup')}  className="login-btn">Signup</div>
                    <a href="#homepage-footer" className="aboutusheader">Contact Us</a>

                </nav>
            </header>
            <div id="welcome">
                <h1 style={{color:"white"},{fontSize:"40px"}}><strong>Welcome to Microsoft Classrooms </strong></h1>
                <p>Stay connected and organized. Accomplish more together across  school,</p>
                <p> college and life with Microsoft classrooms.</p>
                <p> One stop solution for online written examinations</p>
                <a href="#homepage-card-container" className="welcome-btn">Find Out More</a>
            </div>
            <img src={victory_image} className="victory-image" alt="First Vector Graphic" />
        </div>
    )
}

export default Header
