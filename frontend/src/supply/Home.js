import React, { Component } from 'react';
import Sidebar from '../components/sidebar';
import Header from '../components/header';
import Employee from './EmployeeLists';

import '../styles/style.css';
import '@fortawesome/fontawesome-free/css/all.css';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDarkMode: false,
            isSidebarOpen: false,
        };
    }

    toggleDarkMode = () => {
        const { isDarkMode } = this.state;
        this.setState(prevState => ({
            isDarkMode: !prevState.isDarkMode,
        }));
        document.body.classList.toggle("dark", !isDarkMode);
    }

    toggleSidebar = () => {
        this.setState(prevState => ({
            isSidebarOpen: !prevState.isSidebarOpen,
        }));
    }

    render() {
        const { isDarkMode, isSidebarOpen } = this.state;
        return (
            <div className={`container ${isDarkMode ? "dark" : ""}`}>
                
                <Sidebar
                    isSidebarOpen={isSidebarOpen}
                    toggleSidebar={this.toggleSidebar}
                    isDarkMode={isDarkMode}
                    toggleDarkMode={this.toggleDarkMode}
                    
                />
                <Header isDarkMode={isDarkMode} />
                <div className="home" style={{ marginTop: '3%' }}>
                     <Employee isDarkMode={isDarkMode} /> 
                </div>
            </div>
        );
    }
}

export default Home;
