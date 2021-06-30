import React from 'react';
import { connect } from 'react-redux';
import { getFoods } from '../redux/actions/index';

function SearchBar(props) {
  const inputText = React.useRef();
  const ingredientRadio = React.useRef();
  const letterRadio = React.useRef();
  const nameRadio = React.useRef();

  const { getFoodsApi } = props;
  const handleClick = (e) => {
    e.preventDefault();
    switch (true) {
    case ingredientRadio.current.checked:
      getFoodsApi(inputText.current.value, ingredientRadio.current.id);
      break;
    case letterRadio.current.checked:
      getFoodsApi(inputText.current.value, letterRadio.current.id);
      break;
    case nameRadio.current.checked:
      getFoodsApi(inputText.current.value, nameRadio.current.id);
      break;
    default: getFoodsApi(inputText.current.value, nameRadio.current.id);
    }
  };
  return (
    <form>
      <label htmlFor="search">
        <input
          id="search"
          type="text"
          ref={ inputText }
          name="search"
          placeholder="Buscar Receita"
          data-testid="search-input"
        />
      </label>
      &nbsp;
      <label htmlFor="ingredient">
        <input
          id="ingredient"
          type="radio"
          ref={ ingredientRadio }
          name="radioFilter"
          data-testid="ingredient-search-radio"
        />
        Ingrediente
      </label>
      &nbsp;
      <label htmlFor="name">
        <input
          id="name"
          checked
          type="radio"
          ref={ nameRadio }

          name="radioFilter"
          data-testid="name-search-radio"
        />
        Nome
      </label>
      &nbsp;
      <label htmlFor="letter">
        <input
          id="letter"
          type="radio"
          ref={ letterRadio }
          name="radioFilter"
          data-testid="first-letter-search-radio"
        />
        Primeira letra
      </label>
      &nbsp;
      <button
        type="submit"
        data-testid="exec-search-btn"
        onClick={ handleClick }
      >
        Busca
      </button>
    </form>
  );
}
const mapDispatchToProps = ((dispatch) => ({
  getFoodsApi: (ingredients) => dispatch(getFoods(ingredients)),
}));

export default connect(null, mapDispatchToProps)(SearchBar);
