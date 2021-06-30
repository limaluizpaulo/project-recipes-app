import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

function SearchBar() {
  const [textFilter, setTextFilter] = useState('');
  const [typeOfFilter, setTypeOfFilter] = useState('null');

  return (
    <Form>
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
          <Form.Check
            value={ typeOfFilter }
            data-testid="ingredient-search-radio"
            onChange={ (event) => setTypeOfFilter(event.target.id) }
            inline
            id="ingrediente"
            label="Ingrediente"
            name="checkbox"
            type={ type }
          />
          <Form.Check
            value={ typeOfFilter }
            data-testid="name-search-radio"
            inline
            id="nome"
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
        </div>
      ))}
      <Button
        data-testid="exec-search-btn"
        type="button"
      >
        Buscar
      </Button>
    </Form>
  );
}

export default SearchBar;
