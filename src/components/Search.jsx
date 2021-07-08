import React, { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import RecipeContext from '../context/Context';
import messageAlert from '../services/helpers/alertMessage';

function InputSearch() {
  const [valueRadioButton, setValueRadioButton] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const { setValueRadio, setInputValue, setPathname } = useContext(RecipeContext);

  const { pathname } = useLocation();

  // Função que controla o valor dos radios button
  function handleChange({ target }) {
    const newValue = target.value;
    setValueRadioButton(newValue);
  }
  // Função que controla o valor do input de texto
  function handleSearchInput({ target }) {
    const newValue = target.value;
    setSearchInput(newValue);
  }

  function handleOnClick(event) {
    event.preventDefault();
    if (valueRadioButton === 'Primeira letra' && searchInput.length > 1) {
      messageAlert(alert, 'Sua busca deve conter somente 1 (um) caracter');
    }
    setValueRadio(valueRadioButton);
    setInputValue(searchInput);
    setPathname(pathname);
  }

  // Inputs de busca que ficará abaixo do header
  return (
    <form className="header__form" onSubmit={ handleOnClick }>
      <div className="header__radio__container">
        <label htmlFor="search-radio" className="header__radio__label">
          <input
            name="search-radio"
            value="Ingrediente"
            type="radio"
            checked={ valueRadioButton === 'Ingrediente' }
            data-testid="ingredient-search-radio"
            onChange={ handleChange }
          />
          Ingrediente
        </label>

        <label htmlFor="search-radio" className="header__radio__label">
          <input
            name="search-radio"
            value="Nome"
            type="radio"
            checked={ valueRadioButton === 'Nome' }
            data-testid="name-search-radio"
            onChange={ handleChange }
          />
          Nome
        </label>

        <label htmlFor="search-radio" className="header__radio__label">
          <input
            name="search-radio"
            value="Primeira letra"
            type="radio"
            checked={ valueRadioButton === 'Primeira letra' }
            data-testid="first-letter-search-radio"
            onChange={ handleChange }
          />
          Primeira letra
        </label>

      </div>
      <div>
        <input
          value={ searchInput }
          type="text"
          data-testid="search-input"
          onChange={ handleSearchInput }
        />
      </div>
      <div className="form__btn-submit__container">
        <button
          className="form__btn-submit"
          type="submit"
          data-testid="exec-search-btn"
        >
          Buscar
        </button>
      </div>
    </form>
  );
}

export default InputSearch;
