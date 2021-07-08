import React, { useState } from 'react';

import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';

const TWELVE = 12;
export default function RecipesProvider({ children }) {
  const [searchResult, setSearchResult] = useState([]);
  const [userInfo, setInfo] = useState({ email: '' });
  const [limit, setLimit] = useState(TWELVE);
  const [inProgress, setInProgress] = useState([]);
  const [ingredientsResults, setIngredientsResults] = useState([]);
  const context = {
    setInfo,
    userInfo,
    searchResult,
    setSearchResult,
    limit,
    setLimit,
    ingredientsResults,
    setIngredientsResults,
    inProgress,
    setInProgress,
  };

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
