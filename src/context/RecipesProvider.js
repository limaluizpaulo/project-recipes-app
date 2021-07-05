import React, { useState } from 'react';

import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';

export default function RecipesProvider({ children }) {
  const [globalState, setGlobalState] = useState([]);
  const [userInfo, setInfo] = useState({ email: '' });
  const context = { setInfo, userInfo, globalState, setGlobalState };

  return (
    <RecipesContext.Provider value={ context }>
      {children}
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
