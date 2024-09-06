import { Link, useLocation, useNavigate } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import { useState, useEffect } from "react";
import './Navbar.css'


export default function Navbar(props) {
  const logoStyle = {
    height: "40px",
    width: "auto",
    marginRight: "10px",
  };

  const navbarStyle = {
    backgroundColor: "#9DBC98",
    fontFamily: "Montserrat, sans-serif",
    fontOpticalSizing: "auto",
    fontWeight: "300",
    fontStyle: "normal",
  };

  const navitemStyle = {
    color: "black",
    textDecoration: "none",
  };

  const usernameStyle = {
    color: "black",
    opacity: 0.7, // Set the desired opacity value here
    marginLeft: "100px",
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const navigate = useNavigate();

  const handleScrollLinkClick = (login) => {
    if (window.location.pathname !== "/") {
      navigate("/", { replace: true });
    }
  
    setTimeout(() => {
      const element = document.getElementById(login);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 1300); 
  };
  
  return (
    <nav className="navbar navbar-expand-lg" style={navbarStyle}>
      <div className="container-fluid">
        <div className="navbar-brand">
          <a href="/">
            <img src="logo.jpg" alt="logo" style={logoStyle} />
          </a>
        </div>
        {props.isLoggedIn ? (
          <>
            <span className="nav-link" style={usernameStyle}>
              Hi, {props.userData.username}
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
                  <Link to="/profile" className="nav-link" style={navitemStyle}>
                    Profile
                  </Link>
                </li>
                <li className="nav-item ms-4">
                  <Link
                    to="/volunteer"
                    className="nav-link"
                    style={navitemStyle}
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
                    className="nav-link"
                    style={navitemStyle}
                    onClick={() => handleScrollLinkClick("login")}
                  >
                    Login
                  </ScrollLink>
                </li>
               
              </>
            )}

             <li className="nav-item ms-4">
                  <Link
                    to="/services"
                    className="nav-link"
                    style={navitemStyle}
                  >
                    Services
                  </Link>
                </li>
                <li className="nav-item ms-4">
                  <Link
                    to="/charities"
                    className="nav-link"
                    style={navitemStyle}
                  >
                    Charities
                  </Link>
                </li>
              
                {props.isLoggedIn ? (
                    <>
                     <li className="nav-item ms-4">
                  <button
                    onClick={handleLogout}
                    className="nav-link"
                    style={navitemStyle}
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
