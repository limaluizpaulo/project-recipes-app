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
    <Context.GlobalProvider value={ contextValue }>
      { children }
    </Context.GlobalProvider>
  );
}

export default GlobalProvider;

GlobalProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
