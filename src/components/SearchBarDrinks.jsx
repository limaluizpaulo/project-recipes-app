import React, { useContext, useState } from 'react';
import DrinksContext from '../context/DrinksContext';
import FormSearchBar from './FormSearchBar';

function SearchBar() {
  const [textFilter, setTextFilter] = useState('');
  const [typeOfFilter, setTypeOfFilter] = useState('null');
  const { filterDrinksByIngredient,
    filterDrinksByName, filterDrinksByFirstLetter } = useContext(DrinksContext);

  function invokeAlert(fn, message) {
    fn(message);
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (textFilter && typeOfFilter === 'ingredient') {
      filterDrinksByIngredient(textFilter);
    }

    if (textFilter && typeOfFilter === 'name') {
      filterDrinksByName(textFilter);
    }

    if (textFilter.length === 1 && typeOfFilter === 'first-letter') {
      filterDrinksByFirstLetter(textFilter);
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
