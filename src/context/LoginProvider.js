import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import LoginContext from './LoginContext';

function LoginProvider({ children }) {
  const [login, setLogin] = useState('');
  const [DoneRecipes, setDoneRecipes] = useState([]);

  function successLogin(email) {
    setLogin(email);
  }

  const getDoneRecipes = useCallback(() => {
    const getLocalStorage = JSON.parse(localStorage.getItem('doneRecipes'));
    if (getLocalStorage !== null) {
      setDoneRecipes(getLocalStorage);
    }
  }, []);

  useEffect(() => {
    getDoneRecipes();
  }, [getDoneRecipes]);

  return (
    <LoginContext.Provider
      value={ {
        successLogin,
        login,
        DoneRecipes,
        getDoneRecipes,

      } }
    >
      { children }
    </LoginContext.Provider>
  );
}

LoginProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LoginProvider;
