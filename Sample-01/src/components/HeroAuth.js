import React from "react";
import logo from "../assets/Pool360-Poolservice.png";

const HeroAuth = () => {
    // Define the styles as objects
    const heroAuthContainerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0056b3', // Example primary color
        color: 'white',
        padding: '20px',
        borderRadius: '8px',
        margin: '20px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
    };

    const heroAuthLogoStyle = {
        width: '100px',
        marginRight: '20px'
    };

    const heroAuthContentStyle = {
        marginBottom: '10px',
        fontSize: '24px'
    };

    const heroAuthParagraphStyle = {
        margin: '0',
        fontSize: '18px'
    };

    return (
        <div style={heroAuthContainerStyle}>
            <img src={logo} alt="Pool360 Logo" style={heroAuthLogoStyle} />
            <div>
                <h1 style={heroAuthContentStyle}>Welcome to Pool360!</h1>
                <p style={heroAuthParagraphStyle}>You are authenticated, and you can browse around.</p>
            </div>
        </div>
    );
};

export default HeroAuth;
