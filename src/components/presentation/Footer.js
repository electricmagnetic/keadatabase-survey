import React from 'react';
import { NavLink } from 'react-router-dom';

import './Footer.scss';

/**
  Main footer. Different CSS/functionality behaviour can be toggled by prop `onSubmitPage`.
  */
const Footer = ({ onSubmitPage }) => {
  const footerClassNames = ['d-print-none', onSubmitPage && 'on-submit-page'];

  return (
    <footer className={footerClassNames.join(' ')}>
      <div className="container py-3">
        <div className="row align-items-center">
          <div className="col-md-7">
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
          <div className="col-md-5 footer-attribution">
            <p>Map data from LINZ (CC BY 4.0).</p>
            <p>
              Kea Survey Tool data hosted in New Zealand on{' '}
              <a
                href="https://www.catalyst.net.nz/products/gis-core"
                target="_blank"
                rel="noopener noreferrer"
                className="catalyst"
              >
                Catalyst GIS Core
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

Footer.defaultProps = {
  onSubmitPage: false,
};

/**
  Sets onSubmitPage property to true.
  */
const SubmitPageFooter = ({ onSubmitPage }) => {
  return <Footer onSubmitPage />;
};

export { Footer, SubmitPageFooter };
