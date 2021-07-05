import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { DrinksContext } from '../context/DrinksProvider';
import { MealsContext } from '../context/MealsProvider';
import ingredientsAPI from '../services/helpers/ingredientsAPI';

const SearchBar = ({ db }) => {
  const { setMeals } = useContext(MealsContext);
  const { setDrinks } = useContext(DrinksContext);

  const [type, setType] = useState('');
  const [text, setText] = useState('');

  const handleSearch = async (typeOfSearch, textChosen) => {
    const request = await ingredientsAPI(typeOfSearch, textChosen, db);

    if (request && db === 'meals') setMeals(request);
    if (request && db === 'drinks') setDrinks(request);

    return request;
  };

  return (
    <section>
      <label htmlFor="search">
        <input
          id="search"
          type="text"
          data-testid="search-input"
          onChange={ ({ target: { value } }) => setText(value) }
        />
      </label>
      <div onChange={ ({ target: { value } }) => setType(value) }>
        <label htmlFor="ingredient">
          <input
            name="typeOfSearch"
            id="ingredient"
            type="radio"
            data-testid="ingredient-search-radio"
            value="i"
          />
          Ingrediente
        </label>
        <label htmlFor="name-search">
          <input
            name="typeOfSearch"
            id="name-search"
            type="radio"
            data-testid="name-search-radio"
            value="s"
          />
          Nome
        </label>
        <label htmlFor="first-letter">
          <input
            name="typeOfSearch"
            id="first-letter"
            type="radio"
            data-testid="first-letter-search-radio"
            value="f"
          />
          Primeira letra
        </label>
      </div>
      <button
        id="search-btn"
        type="button"
        data-testid="exec-search-btn"
        onClick={ () => handleSearch(type, text) }
      >
        Search
      </button>
    </section>
  );
};

SearchBar.propTypes = {
  db: PropTypes.string.isRequired,
};

export default SearchBar;
