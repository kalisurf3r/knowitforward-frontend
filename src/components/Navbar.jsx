import { Link, useNavigate } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import './Navbar.css'


export default function Navbar(props) {

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
    <nav className="navbar navbar-expand-lg navbar-style">
      <div className="container-fluid">
        <div className="navbar-brand">
          <a href="/">
            <img src="https://res.cloudinary.com/dwfvmcziw/image/upload/v1725905878/logo_mm1ppl.jpg" alt="logo" className="logo-style" />
          </a>
        </div>
        {props.isLoggedIn ? (
          <>
            <span className="username-style">
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
          <ul className="navbar-nav ">

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
