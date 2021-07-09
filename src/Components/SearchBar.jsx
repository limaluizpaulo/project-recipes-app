import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchComidasOnComponentDidMount } from '../redux/actions';

class SearchBar extends React.Component {
  constructor() {
    super();

    this.state = {
      searchBar: '',
      searchType: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
  }

  handleChange({ target: { id } }) {
    this.setState({
      searchType: id,
    });
  }

  handleTextChange({ target: { value } }) {
    this.setState({
      searchBar: value,
    });
  }

  render() {
    const { searchBar, searchType } = this.state;
    const { recipeType, dispatchRecipes } = this.props;

    return (
      <fieldset>
        <label htmlFor="FirstLetter">
          <input
            onChange={ (event) => this.handleChange(event) }
            type="radio"
            data-testid="first-letter-search-radio"
            name="filterOptions"
            id="FirstLetter"
          />
          Primeira letra
        </label>
        <label htmlFor="Name">
          <input
            onChange={ (event) => this.handleChange(event) }
            type="radio"
            data-testid="name-search-radio"
            name="filterOptions"
            id="Name"
          />
          Nome
        </label>
        <label htmlFor="Ingredient">
          <input
            onChange={ (event) => this.handleChange(event) }
            type="radio"
            data-testid="ingredient-search-radio"
            name="filterOptions"
            id="Ingredient"
          />
          Ingrediente
        </label>
        <br />
        <label htmlFor="input-busca">
          <input
            onChange={ (e) => this.handleTextChange(e) }
            type="text"
            data-testid="search-input"
            id="input-busca"
          />
        </label>
        <label htmlFor="submit-search">
          <input
            onClick={
              () => dispatchRecipes(recipeType, `searchBar${searchType}`, searchBar)
            }
            type="button"
            data-testid="exec-search-btn"
            id="submit-search"
            value="Buscar"
          />
        </label>
      </fieldset>
    );
  }
}

const mapStateToProps = (state) => ({
  recipeType: state.recipes.recipeType || null,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchRecipes: (recipeType, fetchType, ingredient) => dispatch(
    fetchComidasOnComponentDidMount(recipeType, fetchType, ingredient),
  ),
});

SearchBar.propTypes = {
  recipeType: PropTypes.string.isRequired,
  dispatchRecipes: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
