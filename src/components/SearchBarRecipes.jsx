import React, { useContext, useState } from 'react';
import RecipesContext from '../context/RecipesContext';
import FormSearchBar from './FormSearchBar';

function SearchBar() {
  const [textFilter, setTextFilter] = useState('');
  const [typeOfFilter, setTypeOfFilter] = useState('null');
  const { filterRecipesByIngredient,
    filterRecipesByName, filterRecipesByFirstLetter } = useContext(RecipesContext);

  function invokeAlert(fn, message) {
    fn(message);
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (textFilter && typeOfFilter === 'ingredient') {
      filterRecipesByIngredient(textFilter);
    }

    if (textFilter && typeOfFilter === 'name') {
      filterRecipesByName(textFilter);
    }

    if (textFilter.length === 1 && typeOfFilter === 'first-letter') {
      filterRecipesByFirstLetter(textFilter);
    } else if (textFilter.length > 1 && typeOfFilter === 'first-letter') {
      invokeAlert(alert, 'Digite apenas uma letra');
    }
  }

  return (
    <FormSearchBar
      textFilter={ textFilter }
      handleSubmit={ handleSubmit }
      setTextFilter={ setTextFilter }
      setTypeOfFilter={ setTypeOfFilter }
      typeOfFilter={ typeOfFilter }
    />
  );
}

export default SearchBar;
