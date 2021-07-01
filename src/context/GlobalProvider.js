import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

function GlobalProvider({ children }) {
  const [requestParams, setRequestParams] = useState({
    searchText: '',
    chosenFilter: '',
  });

  const contextValue = {
    requestParams,
    setRequestParams,
  };

  return (
    <Context.Provider value={ contextValue }>
      { children }
    </Context.Provider>
  );
}

export default GlobalProvider;

GlobalProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
