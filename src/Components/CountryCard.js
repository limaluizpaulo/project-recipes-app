import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchComidasOnComponentDidMount } from '../redux/actions';

class CountryCard extends Component {
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

  async handleChange({ target }) {
    if (target.value === 'All') {
      const { dispatchRecipes } = this.props;
      await dispatchRecipes('comidas', 'recipes', '');
      const { recipes } = this.props;
      this.setState({
        area: target.value,
        areaRecipes: recipes,
      });
    } else {
      this.setState({
        area: target.value,
      }, () => {
        this.fetchAreaRecipes()
          .then((recipes) => this.setAreaRecipesToState(recipes));
      });
    }
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
    const numeroMaximoDeReceitas = 12;
    const cardRecipe = areaRecipes.map((recipe, index) => {
      if (index < numeroMaximoDeReceitas) {
        return (
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
        );
      }
      return null;
    });
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
          <option
            data-testid="All-option"
            value="All"
          >
            All
          </option>
        </select>
        { areaRecipes.length > 0 && this.renderRecipes() }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  recipes: state.recipes.recipes ? Object.values(state.recipes.recipes)[0] : [],
});

const mapDispatchToProps = (dispatch) => ({
  dispatchRecipes:
  (recipeType,fetchType,
    ingredient) => dispatch(fetchComidasOnComponentDidMount(recipeType, fetchType,
      ingredient)),
});

CountryCard.propTypes = {
  countries: PropTypes.arrayOf(PropTypes.object).isRequired,
  recipes: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  dispatchRecipes: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(CountryCard);
