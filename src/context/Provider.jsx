import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

const RecipeProvider = ({ children }) => {
  const [selectedTypeItem, setSelectedTypeItem] = useState('all');
  const context = {
    selectedTypeItem,
    setSelectedTypeItem };
  return (
    <Context.Provider value={ context }>
      {children}
    </Context.Provider>
  );
};

RecipeProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default RecipeProvider;
