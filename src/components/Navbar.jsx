import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';


export default function Navbar() {
    const logoStyle = {
        height: '40px',
        width: 'auto',
        marginRight: '10px'
    }

    const navbarStyle = {
        backgroundColor: '#F0F0F0',
        fontFamily: 'Rubik, sans-serif'
    }

    const navitemStyle = {
        color: 'black',
        textDecoration: 'none'
    }

    const usernameStyle = {
        color: 'black',
        opacity: 0.7, // Set the desired opacity value here
        marginLeft: '100px'
    };


    const [username, setUsername] = useState('JohnDoe');

    // useEffect(() => {
    //     const fetchUsername = async () => {
    //         const user = await getUserFromAuthService();
    //         if (user) {
    //             setUsername(user.username);
    //         }
    //     };
    //     fetchUsername();
    // }, []);


    return (
        <nav className="navbar navbar-expand-lg" style={navbarStyle}>
            <div className="container-fluid">
                <div className="navbar-brand">
                    <a href="/">
                        <img src="logo.png" alt="logo" style={logoStyle} />
                    </a>
                </div>
                <span className="nav-link" style={usernameStyle}>Hi, {username}</span>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item ms-4">
                            <Link to="/profile" className="nav-link" style={navitemStyle}>Profile</Link>
                        </li>
                        <li className="nav-item ms-4">
                            <Link to="/volunteer" className="nav-link" style={navitemStyle}>Volunteer</Link>
                        </li>
                        <li className="nav-item ms-4">
                            <Link to="/services" className="nav-link" style={navitemStyle}>Services</Link>
                        </li>
                        <li className="nav-item ms-4">
                            <Link to="/charities" className="nav-link" style={navitemStyle}>Charity</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

    )
}