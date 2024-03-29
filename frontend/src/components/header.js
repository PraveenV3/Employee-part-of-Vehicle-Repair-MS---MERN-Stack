import React from 'react';
import profileImage from '../images/profile.jpg';
import logoImage from '../images/p.jpg';

const Header = ({ isDarkMode }) => {
    const headerStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 20px', 
        backgroundColor: isDarkMode ? '#242526' : '#FFF',
       
        transition: 'background-color 0.3s',
        fontFamily: "'Poppins', sans-serif",
        position: 'fixed', 
        top: 0, 
        left: '5.8%', 
        right: 0, 
        zIndex: 999,
        height: '60px', 
        width: '94.5%', 
    };

    const userAccountStyle = {
        display: 'flex',
        alignItems: 'center',
    };

    const usernameStyle = {
        marginLeft: '10px',
        color: isDarkMode ? '#E4E6EB' : '#1C1E21',
        fontWeight: '500',
    };

    const profileImageStyle = {
        width: '40px', 
        height: '40px', 
        borderRadius: '50%',
        objectFit: 'cover',
    };

    return (
        <header style={headerStyle}>
           
            <div>
                 
                <h2 style={{ color: isDarkMode ? '#E4E6EB' : '#1C1E21', margin: 0 }}>P&D Auto Engineers</h2>
                
            </div>
      
            <div style={userAccountStyle}>
                <img src={profileImage} alt="Profile" style={profileImageStyle} />
                <span style={usernameStyle}>Anna White</span>
                
            </div>
        </header>
    );
};

export default Header;
