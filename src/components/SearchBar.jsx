import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../css/SearchBar.css';

import { connect } from 'react-redux';
import { fetchIngrentAction } from '../actions';

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
    const { requestRecipes } = this.props;
    if (searchFilter === 'primeira-letra' && searchInput.length > 1) {
      this.invokeAlert(alert, 'Sua busca deve conter somente 1 (um) caracter');
      requestRecipes(searchInput, searchFilter);
    } else {
      requestRecipes(searchInput, searchFilter);
    }
  }

  // Source https://trybecourse.slack.com/archives/C01LCSLCZ8D/p1625054932179900
  invokeAlert(fn, message) {
    fn(message);
  }

  render() {
    return (
      <div className="search">
        <div className="search-container">
          <input
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

const mapDispatchToProps = (dispatch) => ({
  requestRecipes: (searchInput, searchFilter) => (
    dispatch(fetchIngrentAction(searchInput, searchFilter))),
});

SearchBar.propTypes = {
  requestRecipes: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(SearchBar);
