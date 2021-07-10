import React, { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';

import '../styles/header.css';

function SearchBar() {
  const {
    endpoint,
    setEndpoint,
    foodOrDrink,
    setResults,
    handleSingleReturn,
  } = useContext(RecipesContext);

  const { letter, ingredient, name, fetchRecipe } = foodOrDrink;

  return (
    <div className="search-container">
      <input
        placeholder="Buscar Receita"
        className="search-bar"
        id="search-bar"
        data-testid="search-input"
        onChange={ ({ target: { value } }) => {
          if (endpoint === letter && value.length > 1) {
            global.alert('Sua busca deve conter somente 1 (um) caracter');
          }
        } }
      />
      <div className="search-options">
        <label htmlFor="ingrediente">
          <input
            type="radio"
            id="ingrediente"
            name="search-type"
            className="radio"
            data-testid="ingredient-search-radio"
            onClick={ () => { setEndpoint(ingredient); } }
          />
          Ingrediente
        </label>
        <label htmlFor="nome">
          <input
            type="radio"
            id="nome"
            name="search-type"
            className="radio"
            data-testid="name-search-radio"
            onClick={ () => { setEndpoint(name); } }
          />
          Nome
        </label>
        <label htmlFor="primeira-letra">
          <input
            type="radio"
            id="primeira-letra"
            name="search-type"
            className="radio"
            data-testid="first-letter-search-radio"
            onClick={ () => { setEndpoint(letter); } }
          />
          Primeira letra
        </label>
      </div>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ () => {
          const searchInput = document.getElementById('search-bar').value;
          fetchRecipe(endpoint, searchInput).then((data) => {
            if (data === null) {
              global.alert(
                'Sinto muito, não encontramos nenhuma receita para esses filtros.',
              );
            } else if (data.length === 1) {
              handleSingleReturn(data);
            } else {
              setResults(data);
            }
          });
        } }
      >
        Buscar
      </button>
    </div>
  );
}

export default SearchBar;
