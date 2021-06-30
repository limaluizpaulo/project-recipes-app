import React, { Component } from 'react';

import '../css/SearchBar.css';

import { fetchIngrentAction } from '../actions';
import { connect } from 'react-redux';

class SearchBar extends Component {
  constructor() {
    super();

    this.state = {
      searchInput: '',
      searchFilter: '',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    this.setState({ [target.name]: target.value });
  }

  render() {
    const { requestRecipes } = this.props;
    const { searchInput, searchFilter } = this.state;
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
            onClick={ () => requestRecipes(searchInput, searchFilter) }
          >
            Buscar
          </button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  requestRecipes: (searchInput, searchFilter) => dispatch(fetchIngrentAction(searchInput, searchFilter)),
});

export default connect(null, mapDispatchToProps)(SearchBar);
