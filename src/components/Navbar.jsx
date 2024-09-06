import { Link, useLocation } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import { useState, useEffect } from "react";
import './Navbar.css'


export default function Navbar(props) {

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-style">
      <div className="container-fluid">
        <div className="navbar-brand">
          <a href="/">
            <img src="logo.jpg" alt="logo" className="logo-style"/>
          </a>
        </div>
        {props.isLoggedIn ? (
          <>
            <span className="username-style">
              Welcome, {props.userData.username}
            </span>
          </>
        ) : (
          <></>
        )}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            
            {props.isLoggedIn ? (
              <>
                <li className="nav-item ms-4">
                  <Link to="/profile" className="nav-link nav-item-style">
                    Profile
                  </Link>
                </li>
                <li className="nav-item ms-4">
                  <Link
                    to="/volunteer"
                    className="nav-link nav-item-style"
                  >
                    Volunteer
                  </Link>
                </li>
               
              </>
            ) : (
              <>
                <li className="nav-item ms-4">
                  <ScrollLink
                    to="login-section"
                    smooth={true}
                    duration={500}
                    className="nav-link nav-item-style"
                  >
                    Login
                  </ScrollLink>
                </li>
               
              </>
            )}
             <li className="nav-item ms-4">
                  <Link
                    to="/services"
                    className="nav-link nav-item-style"
                  >
                    Services
                  </Link>
                </li>
                <li className="nav-item ms-4">
                  <Link
                    to="/charities"
                    className="nav-link nav-item-style"
                  >
                    Charities
                  </Link>
                </li>
              
                {props.isLoggedIn ? (
                    <>
                     <li className="nav-item ms-4">
                  <button
                    onClick={handleLogout}
                    className="nav-link nav-item-style"
                  >
                    Logout
                  </button>
                </li>
                </>)
                    : (
                        <></>
                    )}

          </ul>
        </div>
      </div>
    </nav>
  );
}
