import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import fetchFood,
{ FOOD_BY_INGREDIENT, FOOD_BY_LETTER, FOOD_BY_NAME } from '../services/FoodAPI';
import fetchDrink,
{ DRINK_BY_INGREDIENT, DRINK_BY_LETTER, DRINK_BY_NAME } from '../services/DrinkAPI';
import RecipeCard from './RecipeCard';
import '../styles/header.css';

function SearchBar() {
  const [searchInput, setSearchInput] = useState('');
  const [endpoint, setEndpoint] = useState();
  const [type] = useState(useHistory().location.pathname);
  const [history] = useState(useHistory());
  const [results, setResults] = useState(<div> </div>);

  const foodOrDrink = {
    letter: type === '/comidas' ? FOOD_BY_LETTER : DRINK_BY_LETTER,
    ingredient: type === '/comidas' ? FOOD_BY_INGREDIENT : DRINK_BY_INGREDIENT,
    name: type === '/comidas' ? FOOD_BY_NAME : DRINK_BY_NAME,
    fetchRecipe: type === '/comidas' ? fetchFood : fetchDrink,
    idType: type === '/comidas' ? 'meals' : 'drinks',
    idRecipe: type === '/comidas' ? 'Meal' : 'Drink',
  };

  function handleSingleReturn() {
    const recipe = data[foodOrDrink.idType][0];
    const link = `${type}/${recipe[foodOrDrink[`id${foodOrDrink.idRecipe}`]]}`;
    history.push(link);
  }

  return (
    <div className="search-container">
      <input
        placeholder="Buscar Receita"
        className="search-bar"
        data-testid="search-input"
        onChange={ ({ target: { value } }) => {
          setSearchInput(value);
          if (endpoint === foodOrDrink.letter && value.length > 1) {
            alert('Sua busca deve conter somente 1 (um) caracter');
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
            onClick={ () => { setEndpoint(foodOrDrink.ingredient); } }
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
            onClick={ () => { setEndpoint(foodOrDrink.name); } }
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
            onClick={ () => { setEndpoint(foodOrDrink.letter); } }
          />
          Primeira letra
        </label>
      </div>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ () => {
          foodOrDrink.fetchRecipe(endpoint, searchInput).then((data) => {
            if (data[foodOrDrink.idType].length === 1) {
              handleSingleReturn();
            } else {
              setResults(data[foodOrDrink.idType].map((recipe) => (
                <RecipeCard
                  imagePath={ recipe[`str${foodOrDrink.idRecipe}Thumb`] }
                  name={ recipe[`str${foodOrDrink.idRecipe}`] }
                  key={ recipe[`id${foodOrDrink.idRecipe}`] }
                />
              )));
            }
          });
        } }
      >
        Buscar
      </button>
      <div className="card-container">
        { results }
      </div>
    </div>
  );
}

export default SearchBar;
