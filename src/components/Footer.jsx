import { Link, NavLink } from "react-router";
import './Footer.css';
import logo from "../assets/logo4.png";

export function Footer({ links }) {
  return (
    <div className="footer">
      <div className="footer-logo-wrapper">
        <Link to="/">
          <img src={logo} className="footer-logo" />
        </Link>
      </div>
      <div className="footer-nav">
        {links.map((l) => (
          <NavLink key={l.to} to={l.to} className="footer-nav-link">
            {l.label}
          </NavLink>
        ))}
      </div>
      <div className="footer-mark">© 2026 blog for react</div>
    </div>
  );
}