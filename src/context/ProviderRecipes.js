import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ContextRecipes from './contextRecipes';

function ProviderRecipes({ children }) {
  const [goSearch, setGoSearch] = useState(false);
  const [goProfile, setGoProfile] = useState(false);
  const [title, setTitle] = useState('');
  const obj = {
    goSearch,
    goProfile,
    setGoProfile,
    setGoSearch,
    title,
    setTitle,
  };
  return (
    <ContextRecipes.Provider value={ { ...obj } }>
      { children }
    </ContextRecipes.Provider>
  );
}

ProviderRecipes.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProviderRecipes;
