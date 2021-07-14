import React, { useState, useContext, useEffect } from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';
import { fetchAPI } from '../services/apiRequest';
import RecipesContext from '../context/RecipesContext';
import '../styles/searchBar.css';

const TWELVE = 12;
export default function SearchBar() {
  const { path } = useRouteMatch();
  const history = useHistory();
  const [filter, setFilter] = useState({ content: '', URL: '' });
  const { setSearchResult, searchResult, setLimit } = useContext(RecipesContext);

  useEffect(() => {
    const targetId = path === '/comidas' ? 'idMeal' : 'idDrink';
    function redirectorOneResult() {
      history.push(`${path}/${searchResult[0][targetId]}`);
    }
    if (searchResult && searchResult.length === 1) {
      redirectorOneResult();
    }
  }, [path, history, searchResult]);

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

  async function handleClick() {
    const domain = path === '/bebidas' ? 'thecocktaildb' : 'themealdb';

    const { content, URL: { name, link } } = filter;
    if (content.length > 1 && name === 'char') {
      global.alert('Sua busca deve conter somente 1 (um) caracter');
    }

    const data = await fetchAPI(link(domain, content));
    console.log(data);
    const firstKey = (path === '/bebidas') ? 'drinks' : 'meals';
    if (!data[firstKey]) {
      global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
    if (content !== '' && URL !== '') {
      setSearchResult(data[firstKey]);
    }
    setLimit(TWELVE);
  }

  return (
    <div className="container-search">
      <div className="input-btn-search">
        <input
          className="input-search"
          type="text"
          data-testid="search-input"
          onChange={ handleChange }
        />
        <button
          className="button-search"
          type="button"
          data-testid="exec-search-btn"
          onClick={ handleClick }
        >
          Search
        </button>
      </div>

      <div className="radio-inputs">
        <label className="label-search" htmlFor="ingredients">
          <input
            className="input-search"
            id="ingredients"
            name="search"
            type="radio"
            data-testid="ingredient-search-radio"
            onChange={ handleChange }
          />
          {' '}
          Ingredientes
        </label>
        <label htmlFor="name" className="label-search">
          <input
            className="input-search"
            id="name"
            name="search"
            type="radio"
            data-testid="name-search-radio"
            onChange={ handleChange }
          />
          {' '}
          Nome
        </label>
        <label htmlFor="char" className="label-search">
          <input
            id="char"
            name="search"
            type="radio"
            data-testid="first-letter-search-radio"
            onChange={ handleChange }
          />
          {' '}
          Primeira letra
        </label>
      </div>
    </div>
  );
}
