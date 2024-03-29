import React, { Component } from 'react';
import logoImage from '../images/p.jpg';
import arrow from '../images/arrow.png';

class Sidebar extends Component {
    render() {
        const { isSidebarOpen, toggleSidebar, isDarkMode, toggleDarkMode,
         } = this.props;

         const toggleIconStyle = {
            cursor: 'pointer',
            width: '50px', 
            height: '70%', 
            marginTop: '15px',
            
        };
        return (
            <nav className={`sidebar ${isSidebarOpen ? "" : "close"}`}>
                <header style={{ marginTop:'2%' }}>
                    <img src={logoImage} alt="Profile" style={{ marginLeft: '3%', width: '50px' , marginRight: '99%'}} /> 
                                <div className="image-text">
                                    <span className="image">
                                    <img src={arrow} alt="Toggle Sidebar" style={toggleIconStyle} onClick={toggleSidebar} />
                        </span>
                        <div className="text logo-text">  
                        </div>
                    </div>
                  
                </header>
                
                <div className="menu-bar">
                    <div className="menu">
                        <ul className="menu-links">
                          
                            <li className="nav-link">
                                <a href="#">
                                    <i className='fas fa-car icon'></i> 
                                    <span className="text nav-text">Supplies</span>
                                </a>
                                </li>

                                <li className="nav-link">
                                 <a href="#">
                                     <i className='fas fa-users icon'></i> 
                                     <span className="text nav-text">Employees</span>
                              </a>
                                </li>
                                 <li className="nav-link">
                                     <a href="#">
                                         <i className='fas fa-shop icon'></i> 
                                         <span className="text nav-text">Online Shop</span>
                                    </a>
                                </li>
                                 <li className="nav-link">
                                     <a href="#">
                                         <i className='fas fa-exclamation-triangle icon'></i> 
                                         <span className="text nav-text">Issues</span>
                                    </a>
                                </li>
                                <li className="nav-link">
                                    <a href="#">
                                         <i className='fas fa-calendar icon'></i> 
                                         <span className="text nav-text">Service & Appointment</span>
                                     </a>
                                 </li>
                                 <li className="nav-link">
                                     <a href="#">
                                         <i className='fas fa-archive icon'></i> 
                                         <span className="text nav-text">Inventories</span>
                                     </a>
                                 </li>
                                 <li className="nav-link">
                                     <a href="#">
                                         <i className='fas fa-handshake icon'></i> 
                                         <span className="text nav-text">Customers</span>
                                     </a>
                                 </li>
                                 <li className="nav-link">
                                     <a href="#">
                                         <i className='fas fa-credit-card icon'></i> 
                                        <span className="text nav-text">Payments</span>
                                    </a>
                                 </li>
                            
                        </ul>
                    </div>
                    {/* <div className="bottom-content">
                        <li className="mode">
                            <div className="sun-moon">
                                <i className='fas fa-moon icon moon'></i> 
                                <i className='fas fa-sun icon sun'></i> 
                            </div>
                            <span className="mode-text text" onClick={toggleDarkMode}>{isDarkMode ? "Light mode" : "Dark mode"}</span>
                            <div className="toggle-switch" onClick={toggleDarkMode}>
                                <span className={`switch ${isDarkMode ? 'dark' : ''}`}></span>
                            </div>
                        </li>
                    </div> */}
                </div>
            </nav>
        );
    }
}

export default Sidebar;






