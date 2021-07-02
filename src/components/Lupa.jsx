import React, { useState, useEffect, useContext } from 'react';
import { fetchIngredientes, fetchNome, fetchFirstLetter } from '../Service/Api';

import RecipesProvider from '../Context/RecipesProvider';

function Lupa() {
  const { responseApiLupa,
    setResponseApiLupa } = useContext(RecipesProvider);
  const [valuesSearch, setValuesSearch] = useState({});

  const handleChange = ({ target: { value, name, checked, type } }) => {
    const valueFiltered = (type === 'checkbox' ? checked : value);
    setValuesSearch({ ...valuesSearch, [name]: valueFiltered });
  };

  useEffect(() => {
    fetchIngredientes('chicken').then((response) => console.log(response));
  }, []);

  return (
    <form>
      <label htmlFor="idSearch">
        <input
          id="idSearch"
          name="search"
          data-testid="search-input"
          placeholder="Buscar receitas"
          onChange={ handleChange }
        />
      </label>
      <label htmlFor="idRadio1">
        Ingredientes
        <input
          name="searchRadio"
          value="Ingredientes"
          type="radio"
          id="idRadio1"
          data-testid="ingredient-search-radio"
          onChange={ handleChange }
        />
      </label>
      <label htmlFor="idRadio2">
        Nome
        <input
          name="searchRadio"
          value="Nome"
          type="radio"
          id="idRadio2"
          data-testid="name-search-radio"
          onChange={ handleChange }
        />
      </label>
      <label htmlFor="idRadio3">
        Primeira letra
        <input
          name="searchRadio"
          value="Primeira letra"
          type="radio"
          id="idRadio3"
          data-testid="first-letter-search-radio"
          onChange={ handleChange }
        />
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={  }
      >
        Buscar
      </button>
    </form>
  );
}
export default Lupa;
