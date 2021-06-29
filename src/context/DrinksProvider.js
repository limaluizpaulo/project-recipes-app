import React from 'react';
import PropTypes from 'prop-types';

import DrinksContext from './DrinksContext';

function DrinksProvider({ children }) {
  return (
    <DrinksContext.Provider>
      { children }
    </DrinksContext.Provider>
  );
}

DrinksProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DrinksProvider;
