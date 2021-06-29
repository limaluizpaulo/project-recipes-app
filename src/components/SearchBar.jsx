import React, { useState } from 'react';

function SearchBar() {
  const [selectedRadio, setSelectedRadio] = useState('ingrediente');
  const [inputValue, setInputValue] = useState('');

  const handleChange = ({ target }) => {
    if (target.type === 'radio') {
      setSelectedRadio(target.value);
    } else {
      setInputValue(target.value);
    }
  };

  const handleBtnClick = () => {
    if (selectedRadio === 'letra'
    && inputValue.length !== 1) {
      alert('Sua busca deve conter somente 1 (um) caracter');
    } else {
      
    }
  };

  return (
    <section>
      <form>
        <input
          data-testid="search-input"
          type="text"
          onChange={ (e) => handleChange(e) }
        />
        <label htmlFor="ingredient-radio">
          Ingrediente
          <input
            checked={ selectedRadio === 'ingrediente' }
            id="ingredient-radio"
            type="radio"
            name="radio-search"
            data-testid="ingredient-search-radio"
            value="ingrediente"
            onChange={ (e) => handleChange(e) }
          />
        </label>
        <label htmlFor="name-radio">
          Nome
          <input
            checked={ selectedRadio === 'nome' }
            id="name-radio"
            type="radio"
            name="radio-search"
            data-testid="name-search-radio"
            value="nome"
            onChange={ (e) => handleChange(e) }
          />
        </label>
        <label htmlFor="first-letter-radio">
          Primeira letra
          <input
            checked={ selectedRadio === 'letra' }
            id="first-letter-radio"
            type="radio"
            name="radio-search"
            data-testid="first-letter-search-radio"
            value="letra"
            onChange={ (e) => handleChange(e) }
          />
        </label>
        <section>
          <button
            type="button"
            data-testid="exec-search-btn"
            onClick={ () => handleBtnClick() }
          >
            Buscar
          </button>
        </section>
      </form>
    </section>
  );
}

export default SearchBar;
