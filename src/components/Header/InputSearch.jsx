import React, { useContext, useState } from 'react';
import RecipeContext from '../../context/Context';
// import apiRequest from '../../services/helpers/apiServises';
import messageAlert from '../../services/helpers/alertMessage';

function InputSearch() {
  const [valueRadioButton, setValueRadioButton] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const { setValueRadio, setInputRadio } = useContext(RecipeContext);

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

  async function handleOnClick() {
    if (valueRadioButton === 'Primeira letra' && searchInput.length > 1) {
      messageAlert(alert, 'Sua busca deve conter somente 1 (um) caracter');
    }
    setValueRadio(valueRadioButton);
    setInputRadio(searchInput);
  }

  // Inputs de busca que ficará abaixo do header
  return (
    <form>
      <div>
        <input
          value={ searchInput }
          type="text"
          data-testid="search-input"
          onChange={ handleSearchInput }
        />
      </div>

      <label htmlFor="search-radio">
        Ingrediente
        <input
          name="search-radio"
          value="Ingrediente"
          type="radio"
          checked={ valueRadioButton === 'Ingrediente' }
          data-testid="ingredient-search-radio"
          onChange={ handleChange }
        />
      </label>

      <label htmlFor="search-radio">
        Nome
        <input
          name="search-radio"
          value="Nome"
          type="radio"
          checked={ valueRadioButton === 'Nome' }
          data-testid="name-search-radio"
          onChange={ handleChange }
        />
      </label>

      <label htmlFor="search-radio">
        Primeira letra
        <input
          name="search-radio"
          value="Primeira letra"
          type="radio"
          checked={ valueRadioButton === 'Primeira letra' }
          data-testid="first-letter-search-radio"
          onChange={ handleChange }
        />
      </label>

      <div>
        <button
          type="button"
          data-testid="exec-search-btn"
          onClick={ handleOnClick }
        >
          Buscar
        </button>
      </div>
    </form>
  );
}

export default InputSearch;
