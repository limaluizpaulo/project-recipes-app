import React, { useContext, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import DrinksContext from '../context/DrinksContext';

function SearchBar() {
  const [textFilter, setTextFilter] = useState('');
  const [typeOfFilter, setTypeOfFilter] = useState('null');
  const { filterRecipesByIngredient,
    filterRecipesByName, filterRecipesByFirstLetter } = useContext(DrinksContext);

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
    <Form onSubmit={ handleSubmit }>
      {['radio'].map((type) => (
        <div key={ `inline-${type}` } className="mb-3">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              value={ textFilter }
              data-testid="search-input"
              type="text"
              placeholder="busca"
              name="checkbox"
              onChange={ (event) => setTextFilter(event.target.value) }
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">

            <Form.Check
              value={ typeOfFilter }
              data-testid="ingredient-search-radio"
              onChange={ (event) => setTypeOfFilter(event.target.id) }
              inline
              id="ingredient"
              label="Ingrediente"
              name="checkbox"
              type={ type }
            />
            <Form.Check
              value={ typeOfFilter }
              data-testid="name-search-radio"
              inline
              id="name"
              label="Nome"
              onChange={ (event) => setTypeOfFilter(event.target.id) }
              name="checkbox"
              type={ type }
            />
            <Form.Check
              value={ typeOfFilter }
              data-testid="first-letter-search-radio"
              inline
              id="first-letter"
              label="Primeira letra"
              onChange={ (event) => setTypeOfFilter(event.target.id) }
              name="checkbox"
              type={ type }
            />
          </Form.Group>
        </div>
      ))}
      <Button
        data-testid="exec-search-btn"
        type="submit"
      >
        Buscar
      </Button>
    </Form>
  );
}

export default SearchBar;
