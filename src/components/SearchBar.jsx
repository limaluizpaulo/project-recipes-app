import React, { useContext, useState } from 'react';
import { Form, Button, FormGroup } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import RecipeContext from '../context';

export default function SearchBar() {
  const { pathname } = useLocation();
  const {
    setCheckedRadio,
    setInputValue,
    setRedirectSearchBar,
    setRouteFromSearch,
  } = useContext(RecipeContext);
  const [radioValue, setRadioValue] = useState('');
  const [searchInputValue, setSearchInputValue] = useState('');

  // source https://surajsharma.net/blog/current-url-in-react

  function handleClick() {
    if (radioValue === 'Primeira letra' && searchInputValue.length > 1) {
      return global.alert('Sua busca deve conter somente 1 (um) caracter');
    }
    setInputValue(searchInputValue);
    setCheckedRadio(radioValue);
    setRouteFromSearch(pathname);
    setRedirectSearchBar(true);
  }

  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control
          type="text"
          data-testid="search-input"
          onChange={ (e) => setSearchInputValue(e.target.value) }
          placeholder="Pesquisar..."
        />
      </Form.Group>
      <FormGroup>
        <Form.Check
          label="Ingredients"
          name="search"
          type="radio"
          value="Ingredientes"
          data-testid="ingredient-search-radio"
          onChange={ (e) => setRadioValue(e.target.value) }
        />
        <Form.Check
          label="Nome"
          type="radio"
          name="search"
          data-testid="name-search-radio"
          value="Nome"
          onChange={ (e) => setRadioValue(e.target.value) }
        />
        <Form.Check
          label="Primeira letra"
          type="radio"
          name="search"
          data-testid="first-letter-search-radio"
          value="Primeira letra"
          onChange={ (e) => setRadioValue(e.target.value) }
        />
      </FormGroup>
      <Button
        type="button"
        data-testid="exec-search-btn"
        onClick={ (() => handleClick()) }
      >
        Buscar
      </Button>
    </Form>
  );
}
