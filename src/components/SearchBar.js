import React, { useState, useContext, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useRouteMatch, useHistory } from 'react-router-dom';
import fetchAPI from '../services/apiRequest';
import RecipesContext from '../context/RecipesContext';

export default function SearchBar() {
  const { path } = useRouteMatch();
  const history = useHistory();
  const [filter, setFilter] = useState({ content: '', URL: '' });
  // const [show, setShow] = useState(false);
  const { setGlobalState, globalState } = useContext(RecipesContext);

  useEffect(() => {
    function test() {
      const targetId = path === '/comidas' ? 'idMeal' : 'idDrink';
      history.push(`${path}/${globalState[0][targetId]}`);
    }

    if (globalState.length === 1) {
      test();
    }
  }, [path, history, globalState]);

  function handleChange({ target }) {
    const { id, value, type } = target;

    const data = {
      ingredients: (domain, content) => `https://www.${domain}.com/api/json/v1/1/filter.php?i=${content}`,
      name: (domain, content) => `https://www.${domain}.com/api/json/v1/1/search.php?s=${content}`,
      char: (domain, content) => `https://www.${domain}.com/api/json/v1/1/search.php?f=${content}`,
    };

    if (type === 'radio') {
      setFilter({ ...filter,
        URL: {
          name: id,
          link: data[id] },
      });
    }

    if (type === 'text') setFilter({ ...filter, content: value });
  }

  async function handleClick(e) {
    e.preventDefault();
    let domain = 'themealdb';
    if (path === '/bebidas') domain = 'thecocktaildb';

    const { content, URL: { name, link } } = filter;
    if (content.length >= 2 && name === 'char') {
      global.alert('Sua busca deve conter somente 1 (um) caracter');
    }

    const data = await fetchAPI(link(domain, content));
    if (content !== '' && URL !== '') {
      setGlobalState(Object.values(data).shift());
    }
  }

  return (
    <div className="search-container">
      {/* <Alert
        data-testid="alert"
        variant="danger"
        show={ show }
        onClose={ () => setShow(false) }
        dismissible
      >
        Upss, deu ruím!!!
      </Alert> */}
      <input
        type="text"
        data-testid="search-input"
        onChange={ handleChange }
      />
      <label htmlFor="ingredients">
        Ingredientes
        <input
          id="ingredients"
          name="search"
          type="radio"
          data-testid="ingredient-search-radio"
          onChange={ handleChange }
        />
      </label>
      <label htmlFor="name">
        Nome
        <input
          id="name"
          name="search"
          type="radio"
          data-testid="name-search-radio"
          onChange={ handleChange }
        />
      </label>
      <label htmlFor="char">
        Primeira letra
        <input
          id="char"
          name="search"
          type="radio"
          data-testid="first-letter-search-radio"
          onChange={ handleChange }
        />
      </label>
      <Button
        type="button"
        data-testid="exec-search-btn"
        onClick={ (e) => handleClick(e) }
      >
        Search
      </Button>
    </div>
  );
}
