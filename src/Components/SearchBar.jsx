import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getFoods } from '../redux/actions/index';
import MealsAPI from '../services/MealRecipesAPI';

function SearchBar(props) {
  const inputText = React.useRef();
  const ingredientRadio = React.useRef();
  const letterRadio = React.useRef();
  const nameRadio = React.useRef();
  const { getFoodsApi } = props;

  const handleClick = (e) => {
    e.preventDefault();
    const radioInputRefs = [ingredientRadio, letterRadio, nameRadio];
    const radioRef = radioInputRefs.find((radio) => radio.current.checked);
    getFoodsApi(inputText.current.value, MealsAPI[radioRef.current.id]);
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
  getFoodsApi: (value, callback) => dispatch(getFoods(value, callback)),
}));

SearchBar.propTypes = PropTypes.func.isRequired;
export default connect(null, mapDispatchToProps)(SearchBar);
