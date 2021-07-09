import React from 'react';
import PropTypes from 'prop-types';
import fetchAPI from '../services/fetchApi';
import favoriteIcon from '../images/blackHeartIcon.svg';
import sharedIcon from '../images/shareIcon.svg';

import '../App.css';

class BeveragesInProgress extends React.Component {
  constructor() {
    super();
    this.state = {
      detailsRecipe: [],
    };
    this.renderIngredients = this.renderIngredients.bind(this);
    this.fetchDetails = this.fetchDetails.bind(this);
  }

  handleChecked({ target }) {
    const li = target.parentNode;
    if (target.checked === true) li.className = 'checked';
    if (target.checked === false) li.className = null;
  }

  async fetchDetails() {
    const { match: { params: { id } } } = this.props;
    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    const responseAPI = await fetchAPI(url);
    const { drinks } = responseAPI;
    this.setState({
      detailsRecipe: drinks,
    });
  }

  renderIngredients() {
    const { detailsRecipe } = this.state;
    const NUMBER_OF_INGREDIENTS = 20;
    const arrayIngredients = [];
    for (let index = 1; index < NUMBER_OF_INGREDIENTS; index += 1) {
      arrayIngredients.push(index);
    }
    return arrayIngredients.map((position) => {
      const ingredients = detailsRecipe[0][`strIngredient${position}`];
      const measure = detailsRecipe[0][`strMeasure${position}`];
      if (ingredients === '' || ingredients === null) {
        return null;
      }
      return (
        <li
          key={ position }
          data-testid={ `${position - 1}-ingredient-step` }
        >
          <input type="checkbox" onChange={ this.handleChecked } />
          { `${measure} ${ingredients}` }
        </li>
      );
    });
  }

  render() {
    const { detailsRecipe } = this.state;
    return (
      <section>
        <img
          src={ detailsRecipe[0].strMealThumb }
          alt="Imagem da Bebida"
          data-testid="recipe-photo"
          width="350"
        />
        <h1 data-testid="recipe-title">{detailsRecipe[0].strMeal}</h1>
        <img src={ favoriteIcon } alt="Favoritar Bebida" data-testid="favorite-btn" />
        <img src={ sharedIcon } alt="Favoritar Bebida" data-testid="favorite-btn" />
        <p data-testid="recipe-category">
          {`Categoria: ${detailsRecipe[0].strAlcoholic}`}
        </p>
        <p
          data-testid="instructions"
        >
          {`Instrução: ${detailsRecipe[0].strInstructions}`}
        </p>
        <h3>Ingredientes</h3>
        <ul>
          {this.renderIngredients()}
        </ul>

        <button data-testid="finish-recipe-btn" type="button">Finalizar receita</button>
      </section>
    );
  }
}

BeveragesInProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default BeveragesInProgress;
