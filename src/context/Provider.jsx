import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';
import requestApi from '../services/helpers/apiServises';

const RecipeProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [radioValue, setValueRadio] = useState('');
  const [inputValue, setInputRadio] = useState('');

  useEffect(() => {
    async function setDataIngredient() {
      const response = await requestApi(radioValue, inputValue);
      setData(response);
    }
    setDataIngredient();
  }, [radioValue, inputValue]);

  return (
    <Context.Provider value={ { data, setData, setValueRadio, setInputRadio } }>
      {children}
    </Context.Provider>
  );
};

RecipeProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default RecipeProvider;
