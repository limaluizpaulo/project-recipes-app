import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';

const GlobalContext = createContext();

const Provider = ({ children }) => {
  const [searchOp, setSearchOp] = useState();

  const value = {
    setSearchOp,
    searchOp,
  };

  return (
    <GlobalContext value={ value }>
      { children }
    </GlobalContext>
  );
};

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
