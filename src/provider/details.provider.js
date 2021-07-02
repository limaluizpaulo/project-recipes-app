import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DetailsContext from '../context/details.context';

function DetailsProvider({ children }) {
  const [details, setDetails] = useState([]);

  const shared = {
    details,
    setDetails,
  };

  return (
    <DetailsContext.Provider value={ { ...shared } }>
      {children}
    </DetailsContext.Provider>
  );
}

DetailsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DetailsProvider;
