import React, { useState } from 'react';

import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';

const TWELVE = 12;
export default function RecipesProvider({ children }) {
  const [searchResult, setSearchResult] = useState([]);
  const [userInfo, setInfo] = useState({ email: '' });
  const [recomendations, setRecomentation] = useState([]);
  const [limit, setLimit] = useState(TWELVE);
  const context = {
    setInfo,
    userInfo,
    searchResult,
    setSearchResult,
    limit,
    setLimit,
    recomendations,
    setRecomentation };

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
