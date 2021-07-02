import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Context from '../context/Context';

function HeaderSearchBar({ baseEndPoint }) {
  const {
    requestParams: { chosenFilter, searchText },
    handleChange,
    setRequestResult,
    asyncSetState,
  } = useContext(Context);

  const [blockRequest, setBlockRequest] = useState(false);

  useEffect(() => {
    if (searchText.length > 1 && chosenFilter === 'search.php?f=') {
      setBlockRequest(true);
    } else {
      setBlockRequest(false);
    }
  }, [searchText, chosenFilter]);

  return (
    <form>
      <fieldset>
        <label htmlFor="search">
          <input
            value={ searchText }
            onChange={ handleChange }
            name="searchText"
            id="search"
            type="search"
            data-testid="search-input"
          />
        </label>
        <label htmlFor="ingredient">
          Ingrediente
          <input
            value="filter.php?i="
            onChange={ handleChange }
            name="chosenFilter"
            required
            id="ingredient"
            type="radio"
            data-testid="ingredient-search-radio"
          />
        </label>
        <label htmlFor="name">
          Nome
          <input
            value="search.php?s="
            onChange={ handleChange }
            name="chosenFilter"
            required
            id="name"
            type="radio"
            data-testid="name-search-radio"
          />
        </label>
        <label htmlFor="first-letter">
          Primeira letra
          <input
            value="search.php?f="
            onChange={ handleChange }
            name="chosenFilter"
            id="first-letter"
            required
            type="radio"
            data-testid="first-letter-search-radio"
          />
        </label>
        <button
          onClick={ blockRequest
            ? () => global.alert('Sua busca deve conter somente 1 (um) caracter')
            : () => asyncSetState(setRequestResult, baseEndPoint, chosenFilter,
              searchText) }
          type="button"
          data-testid="exec-search-btn"
        >
          Pesquisar
        </button>
      </fieldset>
    </form>
  );
}

export default HeaderSearchBar;

HeaderSearchBar.propTypes = {
  baseEndPoint: PropTypes.string.isRequired,
};
