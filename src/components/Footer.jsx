import { Link, useLocation } from "react-router-dom";
import './Footer.css'

export default function Footer() {
  // const footerStyle = {
  //   backgroundColor: "var(--light_gray)",
  //   color: "var(--dark_gray)",
  //   padding: "1rem",
  //   // position: "absolute",
  //   width: "100%",
  //   textAlign: "center",
  //   fontFamily: 'Montserrat, sans-serif',
  //   // fontOpticalSizing: 'auto',
  //   fontStyle: 'normal',
  //   fontSize: '1vw',
  // };

  const linkStyle = {
    color: "var(--dark_gray)",
    textDecoration: "underline",
  };

  return (
    <footer className="footer-style">
      <p>
        © KnowItForward / All Rights Reserved /
        <a
          href="https://github.com/kalisurf3r/knowitforward-frontend"
          target="_blank"
          style={linkStyle}
        >
          {" "}
          About Us{" "}
        </a>
        /
        <a
          href="https://developer.mozilla.org/en-US/"
          target='_blank'
          style={linkStyle}>
          {" "}
          Support
        </a>
      </p>
    </footer>
  );
}

