import React from 'react';
import PropTypes from 'prop-types';
import Iframe from 'react-iframe';
import fetchAPI from '../services/fetchApi';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

class FoodRecipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      detailsRecipe: [],
      recommendedRecipe: [],
    };

    this.fetchDetails = this.fetchDetails.bind(this);
    this.fetchRecommended = this.fetchRecommended.bind(this);
    this.renderVideo = this.renderVideo.bind(this);
    this.renderRecommended = this.renderRecommended.bind(this);
    this.renderRecipeBtn = this.renderRecipeBtn.bind(this);
  }

  componentDidMount() {
    this.fetchDetails();
    return this.fetchRecommended();
  }

  async fetchDetails() {
    const { match: { params: { id } } } = this.props;
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    const responseAPI = await fetchAPI(url);
    const { meals } = responseAPI;
    this.setState({
      detailsRecipe: meals,
    });
  }

  async fetchRecommended() {
    const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    const responseAPI = await fetchAPI(url);
    const { drinks } = responseAPI;
    this.setState({
      recommendedRecipe: drinks,
    });
  }

  renderVideo() {
    const { detailsRecipe } = this.state;
    const url = detailsRecipe[0].strYoutube;
    const split = url.split('watch');
    return (`${split[0]}embed${split[1]}`);
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
          data-testid={ `${position - 1}-ingredient-name-and-measure` }
        >
          { `${measure} ${ingredients}` }
        </li>);
    });
  }

  renderRecommended() {
    const { recommendedRecipe } = this.state;
    const RECOMMENDED_CARDS = 6;
    return recommendedRecipe.map((drink, index) => {
      if (index < RECOMMENDED_CARDS) {
        return (
          <div
            data-testid={ `${index}-recomendation-card` }
            key={ index }
            className="visible-card"
          >
            <img src={ drink.strDrinkThumb } alt={ drink.strDrink } width="150px" />
            <h2 data-testid={ `${index}-recomendation-title` }>
              { drink.strDrink }
            </h2>
            <p>
              {' '}
              { drink.strCategory }
            </p>
          </div>
        );
      }
      return null;
    });
  }

  renderRecipeBtn() {
    const { match: { params: { id } }, history } = this.props;
    const recipesDone = JSON.parse(localStorage.getItem('doneRecipes'));
    if (recipesDone) {
      const isDone = recipesDone.find((recipe) => recipe.id === id);
      if (isDone) {
        return null;
      }
      return (
        <button
          data-testid="start-recipe-btn"
          className="start-recipe-btn"
          type="button"
          onClick={ () => history.push(`/comidas/${id}/in-progress`) }
        >
          Iniciar Receita
        </button>
      );
    }
    const recipesInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (recipesInProgress && recipesInProgress.meals[id]) {
      return (
        <button
          data-testid="start-recipe-btn"
          className="start-recipe-btn"
          type="button"
          onClick={ () => history.push(`/comidas/${id}/in-progress`) }
        >
          Continuar Receita
        </button>
      );
    }
    return (
      <button
        data-testid="start-recipe-btn"
        className="start-recipe-btn"
        type="button"
        onClick={ () => history.push(`/comidas/${id}/in-progress`) }
      >
        Iniciar Receita
      </button>
    );
  }

  render() {
    const { detailsRecipe } = this.state;
    if (detailsRecipe.length === 0) {
      return <div>Carregando</div>;
    }
    return (
      <section>
        <h1 data-testid="recipe-title">
          { detailsRecipe[0].strMeal }
        </h1>
        <img
          src={ detailsRecipe[0].strMealThumb }
          alt={ detailsRecipe[0].strMeal }
          data-testid="recipe-photo"
          width="150px"
        />
        <button data-testid="share-btn" type="button">
          <img src={ shareIcon } alt="Compartilhar" />
        </button>
        <button data-testid="favorite-btn" type="button">
          <img src={ whiteHeartIcon } alt="Favoritos" />
        </button>
        <p data-testid="recipe-category">{ detailsRecipe[0].strCategory }</p>
        <ul>
          { this.renderIngredients() }
        </ul>
        <p data-testid="instructions">
          {' '}
          { detailsRecipe[0].strInstructions }
          {' '}
        </p>
        <div data-testid="video">
          <Iframe width="280" height="150" url={ this.renderVideo() } />
        </div>
        <section>
          <h2>Recomendações</h2>
          <div className="recommended-cards-section">
            { this.renderRecommended() }
          </div>
        </section>
        { this.renderRecipeBtn() }
      </section>
    );
  }
}

FoodRecipe.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default FoodRecipe;
