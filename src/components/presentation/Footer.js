import React from 'react';
import { NavLink } from 'react-router-dom';

import './Footer.css';

const Footer = props => {
  return (
    <footer className="d-print-none">
      <nav className="container py-3">
        <ul className="footer-links my-4">
          <li>
            <NavLink exact to="/">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/legal">Legal</NavLink>
          </li>
          <li>
            <NavLink to="/about">About</NavLink>
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;
