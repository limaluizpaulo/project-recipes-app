import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class CountryCard extends Component {
  constructor() {
    super();

    this.state = {
      area: 'American',
      areaRecipes: [],
    };

    this.renderOptions = this.renderOptions.bind(this);
    this.setAreaRecipesToState = this.setAreaRecipesToState.bind(this);
    this.fetchAreaRecipes = this.fetchAreaRecipes.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.renderRecipes = this.renderRecipes.bind(this);
  }

  componentDidMount() {
    this.fetchAreaRecipes()
      .then((recipes) => this.setAreaRecipesToState(recipes));
  }

  componentDidUpdate() {
    this.fetchAreaRecipes()
      .then((recipes) => this.setAreaRecipesToState(recipes));
  }

  handleChange({ target }) {
    this.setState({
      area: target.value,
    });
  }

  setAreaRecipesToState(recipes) {
    const arrayOfRecipes = Object.values(recipes)[0];
    this.setState({
      areaRecipes: arrayOfRecipes,
    });
  }

  fetchInfo(url) {
    return fetch(url)
      .then((response) => (
        response
          .json()
          .then((json) => (response.ok
            ? Promise.resolve((json)) : Promise.reject(json)))
      ));
  }

  fetchAreaRecipes() {
    const { area } = this.state;
    return this
      .fetchInfo(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
  }

  renderOptions() {
    const { countries } = this.props;
    const countriesOptions = countries.map(({ strArea }, index) => (
      <option
        key={ index }
        value={ strArea }
        data-testid={ `${strArea}-option` }
      >
        { strArea }
      </option>
    ));
    return countriesOptions;
  }

  renderRecipes() {
    const { areaRecipes } = this.state;
    const cardRecipe = areaRecipes.map((recipe, index) => (
      <Link key={ index } to={ `/comidas/${recipe.idMeal}` }>
        <section data-testid={ `${index}-recipe-card` }>
          <img
            width="40px"
            data-testid={ `${index}-card-img` }
            src={ recipe.strMealThumb }
            alt="thumb"
          />
          <p data-testid={ `${index}-card-name` }>
            { recipe.strMeal }
          </p>
        </section>
      </Link>
    ));
    return cardRecipe;
  }

  render() {
    const { areaRecipes } = this.state;
    return (
      <div>
        <select
          onChange={ (e) => this.handleChange(e) }
          data-testid="explore-by-area-dropdown"
        >
          { this.renderOptions() }
        </select>
        { areaRecipes.length > 0 && this.renderRecipes() }
      </div>
    );
  }
}

CountryCard.propTypes = {
  countries: PropTypes.arrayOf(PropTypes.object).isRequired,
};
