import React, { Component } from 'react';
import Header from './../components/Header';
import Sidebar from './../components/Sidebar';
import EmployeeLists from './EmployeeLists';

class Home extends Component {
    render() {
        const containerStyle = {
            position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          overflow: 'hidden', // Prevent scrolling
        };

        const contentStyle = {
            display: 'flex',
            flexGrow: 1, // Content area fills the remaining space
        };

        const globalStyles = `
            html, body {
                overflow: hidden;
                margin: 0;
                padding: 0;
            }

            .homepage-container {
                overflow: hidden;
            }
        `;

        return (
            <div className="homepage-container" style={containerStyle}>
                <style>{globalStyles}</style>
                <Header />
                <div className="content" style={contentStyle}>
                    <Sidebar />
                    <EmployeeLists />
                </div>
            </div>
        );
    }
}

export default Home;
