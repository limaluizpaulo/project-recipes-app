import React, { Component } from 'react';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      filter: '',
    };
  }

  render() {
    const { search } = this.state;
    return (
      <div className="search">
        <div className="optionsSearch">
          <label htmlFor="search">
            <input
              type="text"
              name="search"
              value={ search }
              data-testid="search-input"
              onChange={ ({ target: { value } }) => {
                this.setState({ search: value });
              } }
            />
          </label>
          <div>
            <label htmlFor="ingredients">
              <input
                type="radio"
                name="filter"
                id="ingredients"
                value="ingredients"
                data-testid="ingredient-search-radio"
                onClick={ ({ target: { value } }) => {
                  this.setState({ filter: value });
                } }
              />
              Ingredientes
            </label>

            <label htmlFor="name">
              <input
                type="radio"
                name="filter"
                id="name"
                value="name"
                data-testid="name-search-radio"
                onClick={ ({ target: { value } }) => {
                  this.setState({ filter: value });
                } }
              />
              Nome
            </label>

            <label htmlFor="firstLetter">
              <input
                type="radio"
                name="filter"
                id="firstLetter"
                value="firstLetter"
                data-testid="first-letter-search-radio"
                onClick={ ({ target: { value } }) => {
                  this.setState({ filter: value });
                } }
              />
              Primeira letra
            </label>
          </div>
        </div>
        <button
          type="button"
          data-testid="exec-search-btn"
          onClick={ () => {
            console.log(this.state);
          } }
        >
          Buscar
        </button>
      </div>
    );
  }
}

export default Search;
