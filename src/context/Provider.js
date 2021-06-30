import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

export default function Provider({ children }) {
  const [openSearchBar, setOpenSearchBar] = useState(false);

  const handleSearchBar = () => {
    setOpenSearchBar(!openSearchBar);
  };

  const context = {
    openSearchBar,
    handleSearchBar,
  };
  return (
    <Context.Provider value={ context }>
      {children}
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
