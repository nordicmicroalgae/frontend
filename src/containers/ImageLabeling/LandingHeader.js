import React from 'react';
import { Link } from 'react-router-dom';

const LandingHeader = () => (
  <header>
    <p>
      Welcome to the Image Labeling Guide of Nordic Microalgae. Select a taxon from the sidebar to explore example images and recommended identification and labeling practices for automated imaging instruments used in Nordic waters.
    </p>
    <p>
      By sharing and comparing labeling approaches across laboratories and monitoring programs, we aim to harmonize image annotation in the Nordic region and strengthen the quality, consistency, and transferability of image classifiers used for marine monitoring.
    </p>
    <p>
      Found a mislabeled image? Contact the contributor or email{' '}
      <a href="mailto:nordicmicroalgae@smhi.se" className="landing-header-contact">
        nordicmicroalgae@smhi.se
      </a>
      . To contribute images, see our{' '}
      <Link to="/how-to-contribute/" className="landing-header-contact">
        contribution guidelines
      </Link>
      .
    </p>
  </header>
);

export default LandingHeader;
