import React from 'react';
import PropTypes from 'prop-types';

class RecipeCardByIngredient extends React.Component {
  constructor() {
    super();

    this.state = {
      filteredRecipes: [],
    };

    this.setFilteredRecipesToState = this.setFilteredRecipesToState.bind(this);
    this.fetchFilteredRecipes = this.fetchFilteredRecipes.bind(this);
  }

  componentDidMount() {
    this.fetchFilteredRecipes()
      .then((recipes) => this.setFilteredRecipesToState(recipes));
  }

  setFilteredRecipesToState(recipes) {
    const arrayOfRecipes = Object.values(recipes)[0];
    this.setState({
      filteredRecipes: arrayOfRecipes,
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

  fetchFilteredRecipes() {
    const { recipeType, ingredientName } = this.props;
    switch (recipeType) {
    case 'comidas':
      return this
        .fetchInfo(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredientName}`);
    case 'bebidas':
      return this
        .fetchInfo(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredientName}`);
    default:
      break;
    }
  }

  render() {
    const { recipeType } = this.props;
    const { filteredRecipes } = this.state;
    const numeroMaximoDeReceitas = 12;

    const seletorComidaOuBebidas = {
      comidas: {
        thumb: 'strMealThumb',
        name: 'strMeal',
      },
      bebidas: {
        thumb: 'strDrinkThumb',
        name: 'strDrink',
      },
    };

    return (
      <main>
        { filteredRecipes.length > 0
          ? filteredRecipes.map((item, index) => {
            if (index < numeroMaximoDeReceitas) {
              return (
                <div key={ index } data-testid={ `${index}-recipe-card` }>
                  <img
                    width="40px"
                    data-testid={ `${index}-card-img` }
                    src={ item[seletorComidaOuBebidas[recipeType].thumb] }
                    alt="thumb"
                  />
                  <p data-testid={ `${index}-card-name` }>
                    {item[seletorComidaOuBebidas[recipeType].name]}
                  </p>
                </div>
              );
            }
            return null;
          }) : <h1>Loading...</h1>}
      </main>
    );
  }
}

RecipeCardByIngredient.propTypes = {
  recipeType: PropTypes.string.isRequired,
  ingredientName: PropTypes.string.isRequired,
};

export default RecipeCardByIngredient;
