import React, { useState, useEffect } from 'react';

import { useRouteMatch, useHistory } from 'react-router-dom';

import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';

export default function RecipesProvider({ children }) {
  const [globalState, setGlobalState] = useState([]);
  const [userInfo, setInfo] = useState({ email: '' });
  const context = { setInfo, userInfo, globalState, setGlobalState };

  const { path } = useRouteMatch();
  const history = useHistory();

  // Requisito chato
  useEffect(() => {
    let targetId = 'idDrink';
    if (path === '/comidas') { targetId = 'idMeal'; }
    function test() {
      history.push(`/${globalState[0][targetId]}`);
      // history.push(`/${globalState[0][targetId]}`);
    }

    if (globalState.length === 1) {
      test();
    }
  }, [path, history, globalState]);
  // Requisito chato

  return (
    <RecipesContext.Provider value={ context }>
      {children}
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.func.isRequired,
};
