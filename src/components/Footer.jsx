import { Link, useLocation } from "react-router-dom";
import './Footer.css'

export default function Footer() {
  const linkStyle = {
    color: "var(--dark_gray)",
    fontWeight: 400,
    textDecoration: "underline",
  };

  return (
    <footer >
      <p className="footer-style">
        © KnowItForward / All Rights Reserved /
        <a
          href="https://github.com/kalisurf3r/knowitforward-frontend"
          style={linkStyle}
          target="_blank"
        >
          {" "}
          About Us{" "}
        </a>
        /
        <a href="https://developer.mozilla.org/en-US/"
          style={linkStyle}
          target="_blank">
          {" "}
          Support
        </a>
      </p>
    </footer>
  );
}
