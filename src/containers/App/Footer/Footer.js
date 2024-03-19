import React from 'react';
import { NavLink } from 'react-router-dom';


import SBDILogo from '../../../assets/sbdi.png';
import SMHILogo from '../../../assets/smhi.png';


const Footer = () => (
  <footer className="footer" role="contentinfo">
    <div className="funding">
      <p className="funding-info">
        This service is a part of the <a href="https://biodiversitydata.se/">Swedish Biodiversity Data Infrastructure</a>,
        funded by <a href="https://smhi.se/">SMHI</a> and the Swedish Research Council through Grant No 2019-00242.
      </p>
      <div className="funding-logo">
        <a href="https://smhi.se/">
          <img src={SMHILogo} alt="SMHI" />
        </a>
      </div>
      <div className="funding-logo">
        <a href="https://biodiversitydata.se/">
          <img src={SBDILogo} alt="SBDI" />
        </a>
      </div>
    </div>
    <nav role="navigation">
      <ul>
        <li>
          <NavLink to={'/terms-of-use/'}>
            Terms of use
          </NavLink>
        </li>
        <li>
          <NavLink to={'/disclaimer/'}>
            Disclaimer
          </NavLink>
        </li>
        <li>
          <NavLink to={'/privacy-policy/'}>
            Privacy policy
          </NavLink>
        </li>
        <li>
          <NavLink to={'/contact/'}>
            Contact
          </NavLink>
        </li>
        <li>
          <NavLink to={'/for-developers/'}>
            For developers
          </NavLink>
        </li>
      </ul>
    </nav>
  </footer>
);


export default Footer;
