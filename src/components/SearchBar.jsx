import React, { useContext, useState } from 'react';
import Input from '../helpers/Input';
import Button from '../helpers/Button';
import RecipesContext from '../contexts/RecipesContext';

function SearchBar() {
  const { setFilterHeader } = useContext(RecipesContext);
  const [searchInput, setSearchInput] = useState('');
  const [radioInput, setRadioInput] = useState('');

  const isDisabled = () => {
    if (searchInput === '' || radioInput === '') {
      return true;
    }
    return false;
  };

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
          } else setFilterHeader({ searchInput, radioInput });
        } }
        disabled={ isDisabled() }
        testid="exec-search-btn"
        label="Buscar"
      />
    </form>
  );
}

export default SearchBar;
