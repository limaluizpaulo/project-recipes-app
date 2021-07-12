import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import copy from 'clipboard-copy';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import white from '../images/whiteHeartIcon.svg';
import black from '../images/blackHeartIcon.svg';
import RecomendedCard from './RecomendedCard';
import {
  setFavoriteRecipes,
  getFavoriteRecipes,
  removeFavoriteRecipe } from './RecipeDetailsFunc';

import '../css/Buttons.css';

class RecipeDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      redirectInProgress: false,
      copied: false,
      favorite: false,
    };

    this.getIngredients = this.getIngredients.bind(this);
    this.copyLink = this.copyLink.bind(this);
    this.verifyFavorite = this.verifyFavorite.bind(this);
    this.renderRecommendedCard = this.renderRecommendedCard.bind(this);
    this.renderPage = this.renderPage.bind(this);
    this.stateSet = this.stateSet.bind(this);
  }

  componentDidMount() {
    const { id } = this.props;
    this.stateSet(getFavoriteRecipes(id));
  }

  getIngredients() {
    const { recipeDetails } = this.props;
    if (recipeDetails[0]) {
      const chaves = Object.entries(recipeDetails[0]);
      const ingredientes = chaves.filter((key) => (
        key[0].includes('strIngredient') && (key[1] !== null && key[1] !== '')));
      const medidas = chaves.filter((key) => (
        key[0].includes('strMeasure') && (key[1] !== null && key[1] !== ' ')));
      const apenasMedidas = medidas.map((medida) => medida[1]);
      return ingredientes.map((ingrediente, index) => {
        if (ingrediente && apenasMedidas[index]) {
          return (
            <li
              key={ index }
              className=""
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              {`${ingrediente[1]} - ${apenasMedidas[index]}`}
            </li>);
        }
        return null;
      });
    }
  }

  stateSet(status) {
    this.setState({ favorite: status });
  }

  copyLink() {
    this.setState({ copied: true });

    const { link } = this.props;
    copy(`http://localhost:3000${link}`);
  }

  verifyFavorite(recipe) {
    const { id, title } = this.props;
    const isFav = getFavoriteRecipes(id);

    if (isFav) {
      this.setState({ favorite: false });
      return removeFavoriteRecipe(id);
    }
    setFavoriteRecipes(recipe, title);
    this.setState({ favorite: true });
  }

  renderButton(btnMessage) {
    return (
      <div>
        <button
          className="button-start-recipe"
          type="button"
          data-testid="start-recipe-btn"
          onClick={ () => this.setState({ redirectInProgress: true }) }
        >
          { btnMessage }
        </button>
      </div>
    );
  }

  renderRecommendedCard(recipes) {
    return (
      <div className="recipe-details-recommended">
        <h4>Recomendadas</h4>
        <div className="card-list">
          <RecomendedCard recipes={ recipes } />
        </div>
      </div>
    );
  }

  renderPage(recipeDetails) {
    const { title, recipes, btnVisible, btnMessage } = this.props;
    const { copied, favorite } = this.state;
    return (

      <div className="recipe-details">
        <img
          className="recipe-img"
          data-testid="recipe-photo"
          src={ recipeDetails[0].strMealThumb || recipeDetails[0].strDrinkThumb }
          alt={ recipeDetails[0].strMeal || recipeDetails[0].strDrink }
          width="250px"
        />

        <div className="recipe-details-titles">
          <h2 data-testid="recipe-title">
            { recipeDetails[0].strMeal || recipeDetails[0].strDrink }
          </h2>
          <div className="recipe-details-links">
            <button
              className="like-and-share"
              data-testid="share-btn"
              type="button"
              onClick={ this.copyLink }
            >
              <img src={ shareIcon } alt="shareIcon" />
            </button>

            <button
              className="like-and-share"
              type="button"
              onClick={ () => this.verifyFavorite(recipeDetails[0]) }
            >
              <img
                data-testid="favorite-btn"
                src={ favorite ? black : white }
                alt="favoriteIcon"
              />
            </button>
            {copied ? <span>Link copiado!</span> : null}

          </div>
        </div>
        <div className="recipe-details-subtitles">
          <span data-testid="recipe-category">
            { recipeDetails[0].strAlcoholic }
          </span>
        </div>
        <div className="recipe-details-subtitles">
          <span data-testid="recipe-category">{ recipeDetails[0].strCategory }</span>
        </div>
        <div className="recipe-details-ingredients">
          <h4>Ingredientes</h4>
          <ul>
            {this.getIngredients()}
          </ul>
        </div>
        <div className="recipe-details-instructions">
          <h4>Instruções</h4>
          <p data-testid="instructions">{ recipeDetails[0].strInstructions }</p>
        </div>
        {title === 'Bebidas' ? null
          : (
            <div className="recipe-details-video">
              <h4>Vídeo</h4>
              <iframe
                data-testid="video"
                title={ recipeDetails[0].strMeal || recipeDetails[0].strDrink }
                // Source https://developers.google.com/youtube/player_parameters?hl=pt-br
                src={ recipeDetails[0].strYoutube.replace('watch?v=', 'embed/') }
              />
            </div>)}
        {this.renderRecommendedCard(recipes)}
        {btnVisible ? this.renderButton(btnMessage) : null }
      </div>
    );
  }

  render() {
    const { recipeDetails } = this.props;
    const { redirectInProgress } = this.state;

    if (redirectInProgress) {
      const { foodById, drinksById } = this.props;

      if (foodById.length !== 0 && drinksById.length === 0) {
        return <Redirect to={ `/comidas/${foodById[0].idMeal}/in-progress` } />;
      }
      return <Redirect to={ `/bebidas/${drinksById[0].idDrink}/in-progress` } />;
    }

    return (
      recipeDetails[0] ? this.renderPage(recipeDetails)
        : null
    );
  }
}

const mapStateToProps = (state) => ({
  foodById: state.food.foodById,
  drinksById: state.drink.drinkById,
});

RecipeDetails.propTypes = {
  recipeDetails: PropTypes.arrayOf(Object),
  id: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(RecipeDetails);
