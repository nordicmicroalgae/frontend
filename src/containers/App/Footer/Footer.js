import React from 'react';
import { NavLink } from 'react-router-dom';


const Footer = () => (
  <footer className="footer" role="contentinfo">
    <p>
      This service is a part of the Swedish Biodiversity Data Infrastructure,
      funded by SMHI and the Swedish Research Council through Grant No 2019-00242.
    </p>
    <nav role="navigation">
      <ul>
        <li>
          <NavLink to={'/copyright-notice/'}>
            Copyright notice
          </NavLink>
        </li>
        <li>
          <NavLink to={'/disclaimer/'}>
            Disclaimer
          </NavLink>
        </li>
      </ul>
    </nav>
  </footer>
);


export default Footer;
