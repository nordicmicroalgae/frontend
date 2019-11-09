import React from 'react';
import PropTypes from 'prop-types';

import asArray from '../../utils/asArray';
import getKey from '../../utils/getKey';


const propTypes = {
  list: PropTypes.array.isRequired
};

const Attributes = ({ list }) => (
  <dl className="attributes">
  {list.map(({ name, value }) => (
    <React.Fragment key={getKey('attribute', name)}>
      <dt className="attribute-name">
        {name}
      </dt>
    {asArray(value).map((value) => (
      <dd className="attribute-value" key={getKey('attribute', name, value)}>
        {value}
      </dd>
    ))}
    </React.Fragment>
  ))}
  </dl>
);

Attributes.propTypes = propTypes;

export default Attributes;
