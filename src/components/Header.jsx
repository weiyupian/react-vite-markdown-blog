import { Link, NavLink } from "react-router";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdOutlineClose } from "react-icons/md";
import { useState } from "react";
import logo from "../assets/logo4.png";
import "./Header.css";

export function Header({ links }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(prev => !prev);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };



  return (
    <div className='header'>
      {/* logo */}
      <div className="header-logo-wrapper">
        <Link to="/">
          <img src={logo} className="header-logo" />
        </Link>
      </div>

      {/* 导航 + 操作 */}
      <div className="header-nav">
        {links.map((l) => (
          <NavLink key={l.to} to={l.to} className="header-nav-link">
            {l.label}
          </NavLink>
        ))}
      </div>
      {/* 汉堡按钮（仅移动端可见） */}
      <button
        className="hamburger"
        onClick={toggleMenu}
      >
        {isOpen ? <MdOutlineClose size={24} /> :
          <GiHamburgerMenu size={24} />}
      </button>
      {/* 移动端菜单 */}
      {isOpen && (
        <div className="mobile-menu">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className="mobile-menu-link"
              onClick={closeMenu}
            >
              {l.label}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
}

export default Header;