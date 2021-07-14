import React, { useContext, useEffect, useState } from 'react';
import { Form, Button, InputGroup, FormControl } from 'react-bootstrap';
import Context from '../context/Context';

function HeaderSearchBar() {
  const {
    requestParams: { chosenFilter, searchText },
    handleChange,
    asyncSetState,
  } = useContext(Context);

  const [blockRequest, setBlockRequest] = useState(false);

  useEffect(() => {
    if (searchText.length > 1 && chosenFilter === 'search.php?f=') {
      setBlockRequest(true);
    } else {
      setBlockRequest(false);
    }
  }, [searchText, chosenFilter]);

  return (
    <Form>
      <InputGroup htmlFor="search">
        <FormControl
          aria-label="Pesquisar"
          size="sm"
          value={ searchText }
          onChange={ handleChange }
          name="searchText"
          id="search"
          type="search"
          data-testid="search-input"
        />
      </InputGroup>

      <Form.Check
        label="Ingrediente"
        value="filter.php?i="
        onChange={ handleChange }
        name="chosenFilter"
        required
        id="ingredient"
        type="radio"
        data-testid="ingredient-search-radio"
      />

      <Form.Check
        label="Nome"
        value="search.php?s="
        onChange={ handleChange }
        name="chosenFilter"
        required
        id="name"
        type="radio"
        data-testid="name-search-radio"
      />

      <Form.Check
        label="Primeira Letra"
        value="search.php?f="
        onChange={ handleChange }
        name="chosenFilter"
        id="first-letter"
        required
        type="radio"
        data-testid="first-letter-search-radio"
      />

      <Button
        onClick={ blockRequest
          ? () => global.alert('Sua busca deve conter somente 1 (um) caracter')
          : () => asyncSetState() }
        type="button"
        data-testid="exec-search-btn"
      >
        Pesquisar
      </Button>
    </Form>
  );
}

export default HeaderSearchBar;
