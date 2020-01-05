import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import logo from '../../assets/img/logo.svg';
import './Header.css';

const Header = props => {
  return (
    <header>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark">
        <div className="container">
          <Link to="/" className="navbar-brand">
            <img src={logo} alt="Kea Survey Tool" />
          </Link>
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
          <div className="collapse navbar-collapse" id="navbar">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <NavLink exact to="/" className="nav-link">
                  <i className="fa-fw fas fa-home mr-1"></i>Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/surveys" className="nav-link">
                  <i className="fa-fw fas fa-list-alt mr-1"></i>Browse Surveys
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/grid" className="nav-link">
                  <i className="fa-fw fas fa-map mr-1"></i>View Grid
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/submit" className="nav-link">
                  <i className="fa-fw fas fa-clipboard-list mr-1"></i>Submit Survey
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
