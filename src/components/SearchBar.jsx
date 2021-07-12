import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import '../css/SearchBar.css';
import { fetchIngrentAction, fetchDrinksAction } from '../actions';

class SearchBar extends Component {
  constructor() {
    super();

    this.state = {
      searchInput: '',
      searchFilter: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.buscaReceita = this.buscaReceita.bind(this);
    this.invokeAlert = this.invokeAlert.bind(this);
  }

  handleChange({ target }) {
    this.setState({ [target.name]: target.value });
  }

  buscaReceita() {
    const { searchInput, searchFilter } = this.state;
    const { requestFoodRecipes, title, requestDrinkRecipes } = this.props;
    if (searchFilter === 'primeira-letra' && searchInput.length > 1) {
      this.invokeAlert(alert, 'Sua busca deve conter somente 1 (um) caracter');
    } else if (title === 'Comidas') requestFoodRecipes(searchInput, searchFilter);
    else {
      requestDrinkRecipes(searchInput, searchFilter);
    }
  }

  // Source https://trybecourse.slack.com/archives/C01LCSLCZ8D/p1625054932179900
  invokeAlert(fn, message) {
    fn(message);
  }

  render() {
    const { resultFood, resultDrink, title } = this.props;
    if (resultFood && title === 'Comidas' && resultFood.length === 1) {
      return <Redirect to={ `/comidas/${resultFood[0].idMeal}` } />;
    }
    if (resultDrink && title === 'Bebidas' && resultDrink.length === 1) {
      return <Redirect to={ `/bebidas/${resultDrink[0].idDrink}` } />;
    }
    if (!resultFood || !resultDrink) {
      this.invokeAlert(alert,
        'Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }

    return (
      <div className="search">
        <div className="search-container">
          <input
            className="search-input"
            data-testid="search-input"
            type="text"
            placeholder="Buscar Receita"
            name="searchInput"
            onChange={ (event) => this.handleChange(event) }
          />

          <form action="">
            <label htmlFor="radio-ingredient">
              <input
                type="radio"
                id="radio-ingredient"
                value="ingrediente"
                name="searchFilter"
                data-testid="ingredient-search-radio"
                onChange={ (event) => this.handleChange(event) }
              />
              Ingrediente
            </label>

            <label htmlFor="radio-name">
              <input
                type="radio"
                id="radio-name"
                value="nome"
                name="searchFilter"
                data-testid="name-search-radio"
                onChange={ (event) => this.handleChange(event) }
              />
              Nome
            </label>

            <label htmlFor="radio-first-letter">
              <input
                type="radio"
                value="primeira-letra"
                name="searchFilter"
                id="radio-first-letter"
                data-testid="first-letter-search-radio"
                onChange={ (event) => this.handleChange(event) }
              />
              Primeira Letra
            </label>
          </form>

          <button
            data-testid="exec-search-btn"
            className="btt-search"
            type="button"
            onClick={ () => this.buscaReceita() }
          >
            Buscar
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  resultFood: state.food.recipes,
  resultDrink: state.drink.recipes,
});

const mapDispatchToProps = (dispatch) => ({
  requestFoodRecipes: (searchInput, searchFilter) => (
    dispatch(fetchIngrentAction(searchInput, searchFilter))),
  requestDrinkRecipes: (searchInput, searchFilter) => (
    dispatch(fetchDrinksAction(searchInput, searchFilter))
  ),
});

SearchBar.propTypes = {
  requestFoodRecipes: PropTypes.func.isRequired,
  requestDrinkRecipes: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  resultFood: PropTypes.arrayOf(Object).isRequired,
  resultDrink: PropTypes.arrayOf(Object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
