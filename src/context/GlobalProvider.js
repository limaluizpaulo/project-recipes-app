import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

function GlobalProvider({ children }) {
  const [requestParams, setRequestParams] = useState({
    searchText: '',
    chosenFilter: '',
  });

  const FoodsEndPoint = 'https://www.themealdb.com/api/json/v1/1/';
  const DrinksEndPoint = 'https://www.thecocktaildb.com/api/json/v1/1/';

  const handleChange = ({ target: { name, value } }) => {
    setRequestParams({ ...requestParams, [name]: value });
  };

  const contextValue = {
    FoodsEndPoint,
    DrinksEndPoint,
    requestParams,
    setRequestParams,
    handleChange,
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
