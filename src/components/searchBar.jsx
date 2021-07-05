import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import invokeAlert from '../helper/alertMsg';

import { fetchFoodRecipes, fetchFoodRecipesByIngredients,
  fetchFoodRecipesByfirstLetter, fetchDrinksRecipesByIngredient,
  fetchDrinksRecipes,
  fetchDrinksRecipesByFirstLetter } from '../action';

class SearchBar extends Component {
  constructor() {
    super();
    this.state = {
      inputSearch: '',
      radioValue: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target: { id, type, value } }) {
    if (type === 'radio') {
      return this.setState({ radioValue: id });
    }
    this.setState({ inputSearch: value });
  }

  handleClick() {
    const { fetchApi, fetchApiByIngredient, fetchApiByFirstLetter,
      fetchApiDrinks, fetchApiDrinksByingredient,
      fetchApiDrinksByFirstLetter } = this.props;
    const { location } = this.props;
    // console.log(fetchApiDrinksByFirstLetter);

    if (location === '/comidas') {
      return this.handleFoodAndDrink(fetchApi,
        fetchApiByIngredient, fetchApiByFirstLetter);
    }
    if (location === '/bebidas') {
      return this.handleFoodAndDrink(
        fetchApiDrinks, fetchApiDrinksByingredient, fetchApiDrinksByFirstLetter,
      );
    }
  }

  handleFoodAndDrink(fetchByName, fetchByingrdient, fetchByFirstLetter) {
    const { inputSearch, radioValue } = this.state;

    if (!radioValue || radioValue === 'nome') {
      return fetchByName(inputSearch);
    }

    if (radioValue === 'ingrediente') {
      console.log('ingredient');
      return fetchByingrdient(inputSearch);
    }

    if (radioValue === 'primeira-letra') {
      if (!inputSearch || inputSearch.length > 1) {
        return invokeAlert(alert, 'Sua busca deve conter somente 1 (um) caracter');
      }
      // console.log(fetchByFirstLetter);
      return fetchByFirstLetter(inputSearch);
    }
  }

  render() {
    return (
      <section>
        <label htmlFor="search">
          Buscar:
          <input
            id="search"
            type="text"
            data-testid="search-input"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="ingrediente">
          <input
            id="ingrediente"
            type="radio"
            onChange={ this.handleChange }
            name="radio-button"
            data-testid="ingredient-search-radio"
          />
          Ingrediente
        </label>
        <label htmlFor="nome">
          <input
            id="nome"
            type="radio"
            onChange={ this.handleChange }
            name="radio-button"
            data-testid="name-search-radio"
          />
          Nome
        </label>
        <label htmlFor="primeira-letra">
          <input
            id="primeira-letra"
            type="radio"
            onChange={ this.handleChange }
            data-testid="first-letter-search-radio"
            name="radio-button"
          />
          Primeira-letra
        </label>
        <button
          data-testid="exec-search-btn"
          type="button"
          onClick={ this.handleClick }
        >
          Buscar
        </button>
      </section>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchApi: (e) => dispatch(fetchFoodRecipes(e)), // apagar
  fetchApiByIngredient: (e) => dispatch(fetchFoodRecipesByIngredients(e)),
  fetchApiByFirstLetter: (e) => dispatch(fetchFoodRecipesByfirstLetter(e)),
  fetchApiDrinks: (e) => dispatch(fetchDrinksRecipes(e)),
  fetchApiDrinksByFirstLetter: (e) => dispatch(fetchDrinksRecipesByFirstLetter(e)),
  fetchApiDrinksByingredient: (e) => dispatch(fetchDrinksRecipesByIngredient(e)),

});

SearchBar.propTypes = {
  fetchApi: PropTypes.func.isRequired,
  fetchApiByIngredient: PropTypes.func.isRequired,
  fetchApiByFirstLetter: PropTypes.func.isRequired,
}.isRequired;

export default connect(null, mapDispatchToProps)(SearchBar);
