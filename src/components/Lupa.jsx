import React from 'react';

function Lupa() {
  return (
    <form>
      <label htmlFor="idSearch">
        <input
          id="idSearch"
          name="search"
          data-testid="search-input"
          placeholder="Buscar receitas"
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
        />
      </label>
      <button type="button" data-testid="exec-search-btn">Buscar</button>
    </form>
  );
}
export default Lupa;
