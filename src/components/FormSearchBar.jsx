import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';

function FormSearchBar({ textFilter,
  handleSubmit, setTextFilter, setTypeOfFilter, typeOfFilter }) {
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

FormSearchBar.propTypes = {
  textFilter: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  setTextFilter: PropTypes.func.isRequired,
  setTypeOfFilter: PropTypes.func.isRequired,
  typeOfFilter: PropTypes.string.isRequired,

};

export default FormSearchBar;
