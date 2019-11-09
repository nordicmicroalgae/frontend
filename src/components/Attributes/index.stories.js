import React from 'react';
import Attributes from './';

export default { title: 'Attributes' };

export const withItems = () => (
  <Attributes
    list={[
      {
        name: "Life form",
        value: "Solitary"
      },
      {
        name: "Tropic type",
        value: "A"
      },
      {
        name: "Size",
        value: "Length 14-27 µm, width 18-21 µm"
      },
      {
        name: "Morphology",
        value: "With many small papillae on surface and with a cone-shaped pore in each valve."
      },
      {
        name: "Literature",
        value: "Dodge, J. D. 1982. Marine Dinoflagellates of the British Isles. Her Majesty's Stationary Office, London. 303 pp."
      },
      {
        name: "Other remarks",
        value: "Distribution: Widely"
      }
    ]}
  />
);
