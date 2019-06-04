import React from 'react';

import logo from '../../assets/img/doc_logo.svg';
import './Header.css';

const Header = props => {
  return (
    <header>
      <div className="doc-stripe" />
      <nav className="navbar navbar-expand-md navbar-dark bg-dark">
        <div className="container">
          <a href="/" className="navbar-brand">
            <img src={logo} alt="Kea Survey Tool" />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbar"
            aria-controls="navbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a href="/" className="nav-link">
                Home
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
