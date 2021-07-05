/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState } from 'react';
import Input from '../helpers/Input';
import Button from '../helpers/Button';
import {
  getMealsIngredientsFilter,
  getMealsNameFilter,
  getMealsFirstLetterFilter,
} from '../helpers/MealsAPI';
import RecipesContext from '../contexts/RecipesContext';

const selectedFilter = {
  ingredients: getMealsIngredientsFilter,
  name: getMealsNameFilter,
  firstLetter: getMealsFirstLetterFilter,
};

function SearchBar() {
  const { setData } = useContext(RecipesContext);
  const [searchInput, setSearchInput] = useState('');
  const [radioInput, setRadioInput] = useState('ingredients');
  // const [filterHeader, setFilterHeader] = useState({
  //   search: '',
  //   radio: 'ingredients',
  // });

  const isDisabled = () => {
    if (searchInput === '' || radioInput === '') {
      return true;
    }
    return false;
  };

  // useEffect(() => {
  const filterApi = async () => {
    const result = await selectedFilter[radioInput](searchInput);
    if (result.length) {
      setData(result);
    }
  };

  // }, [filterHeader]);

  /*
    Material consultado sobre search role
    https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/Search_role#prefer_html
  */
  return (
    <form role="search" htmlFor="seachBar">
      <Input
        func={ setSearchInput }
        id="searchBar"
        type="text"
        testid="search-input"
      />
      <Input
        func={ setRadioInput }
        name="search-radios"
        htmlFor="ingredients-radio"
        label="Ingrediente"
        testid="ingredient-search-radio"
        id="ingredients-radio"
        type="radio"
        value="ingredients"
      />
      <Input // refatorar para menos parametros
        func={ setRadioInput }
        htmlFor="name-radio"
        label="Nome"
        name="search-radios"
        type="radio"
        id="name-radio"
        testid="name-search-radio"
        value="name"
      />
      <Input
        func={ setRadioInput }
        htmlFor="firstLetter-radio"
        label="Primeira letra"
        name="search-radios"
        type="radio"
        id="firstLetter-radio"
        testid="first-letter-search-radio"
        value="firstLetter"
      />
      <Button
        func={ () => {
          if (radioInput === 'firstLetter' && searchInput.length > 1) {
            const alertMessage = (fn, message) => {
              fn(message);
            };
            alertMessage(alert, 'Sua busca deve conter somente 1 (um) caracter');
          } else filterApi();
        } }
        disabled={ isDisabled() }
        testid="exec-search-btn"
        label="Buscar"
      />
    </form>
  );
}

export default SearchBar;
