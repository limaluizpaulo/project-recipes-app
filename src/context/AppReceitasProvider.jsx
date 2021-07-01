import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AppReceitasContext from './AppReceitasContext';

export default function AppReceitasProvider({ children }) {
  const [login, setLogin] = useState({});
  const [fetchAPI, setfetchAPI] = useState({});

  const contextValue = {
    login,
    setLogin,
    fetchAPI,
    setfetchAPI,
  };

  return (
    <AppReceitasContext.Provider value={ contextValue }>
      { children }
    </AppReceitasContext.Provider>
  );
}

AppReceitasProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
