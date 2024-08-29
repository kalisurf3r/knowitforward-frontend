import {Link, useLocation} from 'react-router-dom';

export default function Footer() {
    const footerStyle = {
        backgroundColor: "#F0F0F0",
        color: "black",
        padding: "1rem",
        position: "fixed",
        bottom: "0",
        width: "100%",
        textAlign: "center"
    }

    const linkStyle = {
        color: "black",
        textDecoration: "none",
    }
    
    return (
        <footer style={footerStyle}>
        <p style={linkStyle}>© KnowItForward
            /
        All Rights Reserved
            / 
            <Link to="https://github.com/kalisurf3r/knowitforward-frontend" style={linkStyle}> About Us </Link>
            / 
            <Link to="https://developer.mozilla.org/en-US/" style={linkStyle}> Support</Link>
        </p>
        </footer>
    )
}