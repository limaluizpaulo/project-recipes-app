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
  const { setData, type } = useContext(RecipesContext);
  const [searchInput, setSearchInput] = useState('');
  const [radioInput, setRadioInput] = useState('');

  const isDisabled = () => {
    if (searchInput === '' || radioInput === '') {
      return true;
    }
    return false;
  };

  // useEffect(() => {
  const filterApi = async () => { //  tentar refatorar: jogar alerts dentro do getApi
    const alertMessage = (fn, message) => {
      fn(message);
    };
    if (radioInput === 'firstLetter' && searchInput.length > 1) {
      alertMessage(alert, 'Sua busca deve conter somente 1 (um) caracter');
    }
    const result = await selectedFilter[radioInput](searchInput, type);
    if (result === null) {
      alertMessage(alert,
        'Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
    if (result.length) { //  tentei refatorar, a aplicação funcionou normal mas cypress QUEBROU
      setData(result);
    }
  };

  // }, [filterHeader]);

  /*
    Material consultado sobre search role
    https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/Search_role#prefer_html
  */
  return (
    <form role="search" htmlFor="searchBar">
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
        func={ () => filterApi() }
        disabled={ isDisabled() }
        testid="exec-search-btn"
        label="Buscar"
      />
    </form>
  );
}

export default SearchBar;
