import React from 'react';
import { NavLink } from 'react-router-dom';

import './Footer.css';

const Footer = props => {
  return (
    <footer className="d-print-none">
      <div className="container py-3">
        <div className="row align-items-center">
          <div className="col-md-8">
            <nav>
              <ul className="footer-links my-4">
                <li>
                  <NavLink exact to="/">
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/instructions">How To Survey</NavLink>
                </li>
                <li>
                  <NavLink to="/legal">Legal</NavLink>
                </li>
                <li>
                  <NavLink to="/about">About</NavLink>
                </li>
              </ul>
            </nav>
          </div>
          <div className="col-md-4 text-white">
            <p>
              <small>
                <em>Map data from Land Information New Zealand (CC BY 4.0)</em>
              </small>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
