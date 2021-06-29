import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import RecipeContext from '.';
import {
  searchByFirstLetterApi,
  searchByIngredientsApi,
  searchByNameApi,
} from '../service/api';

export default function RecipeProvider({ children }) {
  const [showSearch, setShowSearch] = useState(false);
  const [checkedRadio, setCheckedRadio] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [redirectSearchBar, setRedirectSearchBar] = useState(false);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const requestByIngredients = async () => {
      await searchByIngredientsApi(inputValue);
    };
    const requestByName = async () => {
      await searchByNameApi(inputValue);
    };
    const requestByLetter = async () => {
      await searchByFirstLetterApi(inputValue);
    };

    if (checkedRadio === 'Ingredientes') {
      setRecipes(requestByIngredients());
    } else if (checkedRadio === 'Nome') {
      setRecipes(requestByName());
    } else if (checkedRadio === 'Primeira letra') {
      setRecipes(requestByLetter());
    }
  });

  return (
    <RecipeContext.Provider
      value={ {
        showSearch,
        setShowSearch,
        setCheckedRadio,
        setInputValue,
        setRedirectSearchBar,
      } }
    >
      console.log(recipes);
      { children }
    </RecipeContext.Provider>
  );
}

RecipeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
