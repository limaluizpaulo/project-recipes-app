import React, { useContext, useState } from 'react';
import { Container, Button, Form, Row, Col } from 'react-bootstrap';
import Context from '../context/Context';

export default function SearchBar() {
  const [filter, setFilter] = useState({ searchText: '', filter: '' });
  const { findByFilter } = useContext(Context);

  const handleChange = ({ name, value }) => {
    setFilter({ ...filter, [name]: value });
    }; 

  return (
    <Container>
      <input
      type="text"
      data-testid="search-input"
      name="searchText"
      onChange={ ({ target }) => handleChange(target) } />

      <Form.Group as={ Row }>
        <Form.Label as="legend" column sm={2}>
          Pesquisar por:
        </Form.Label>
        <Col sm={10}>
          <Form.Check
            onChange={ ({ target }) => handleChange(target) } 
            data-testid="ingredient-search-radio"
            type="radio"
            label="Ingredientes"
            value="ingredient"
            name="filter"
          />
          <Form.Check
            onChange={ ({ target }) => handleChange(target) } 
            data-testid="name-search-radio"
            type="radio"
            label="Nome"
            value="name"
            name="filter"
          />
          <Form.Check
            onChange={ ({ target }) => handleChange(target) } 
            data-testid="first-letter-search-radio"
            type="radio"
            label="Primeira Letra"
            name="filter"
            value="firstLetter"
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Col sm={{ span: 10, offset: 2 }}>
          <Button type="button" onClick={ () => findByFilter(filter) }>Pesquisar</Button>
        </Col>
      </Form.Group>
    </Container>
  );
}
