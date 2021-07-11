import React from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import Recommendations from '../components/Recommendations';
import fetchAPI from '../services/fetchApi';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

class BeverageRecipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      detailsRecipe: [],
      copyLink: false,
      isFavorite: false,
    };

    this.fetchDetails = this.fetchDetails.bind(this);
    this.renderVideo = this.renderVideo.bind(this);
    this.onClickShare = this.onClickShare.bind(this);
    this.onClickFavoriteIcon = this.onClickFavoriteIcon.bind(this);
    this.renderHeartIcon = this.renderHeartIcon.bind(this);
    this.renderFavorite = this.renderFavorite.bind(this);
  }

  componentDidMount() {
    this.fetchDetails();
    return this.renderHeartIcon();
  }

  onClickShare() {
    copy(window.location.href);
    this.setState({
      copyLink: true,
    });
  }

  onClickFavoriteIcon() {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const { match: { params: { id } } } = this.props;
    const { detailsRecipe } = this.state;
    const newFavorite = {
      id,
      type: 'bebida',
      area: '',
      category: detailsRecipe[0].strCategory,
      alcoholicOrNot: detailsRecipe[0].strAlcoholic,
      name: detailsRecipe[0].strDrink,
      image: detailsRecipe[0].strDrinkThumb,
    };
    if (favoriteRecipes) {
      const isFavorite = favoriteRecipes.find((recipe) => recipe.id === id);
      if (isFavorite) {
        this.setState({
          isFavorite: false,
        });
        const newArray = favoriteRecipes.filter((recipe) => recipe.id !== id);
        return localStorage.setItem('favoriteRecipes', JSON.stringify(newArray));
      }
      this.setState({
        isFavorite: true,
      });
      const addFavorite = [...favoriteRecipes, newFavorite];
      return localStorage.setItem('favoriteRecipes', JSON.stringify(addFavorite));
    }
    this.setState({
      isFavorite: true,
    });
    return localStorage.setItem('favoriteRecipes', JSON.stringify([newFavorite]));
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

  renderVideo() {
    const { detailsRecipe } = this.state;
    const url = detailsRecipe[0].strYoutube;
    const split = url.split('watch');
    return `${split[0]}embed${split[1]}`;
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
      if (ingredients === undefined || ingredients === null || ingredients === '') {
        return null;
      }
      return (
        <li
          key={ position }
          data-testid={ `${position - 1}-ingredient-name-and-measure` }
        >
          {`${measure} of ${ingredients}`}
        </li>
      );
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
          onClick={ () => history.push(`/bebidas/${id}/in-progress`) }
        >
          Iniciar Receita
        </button>
      );
    }
    const recipesInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (recipesInProgress && recipesInProgress.cocktails[id]) {
      return (
        <button
          data-testid="start-recipe-btn"
          className="start-recipe-btn"
          type="button"
          onClick={ () => history.push(`/bebidas/${id}/in-progress`) }
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
        onClick={ () => history.push(`/bebidas/${id}/in-progress`) }
      >
        Iniciar Receita
      </button>
    );
  }

  renderHeartIcon() {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const { match: { params: { id } } } = this.props;
    if (favoriteRecipes) {
      const isFavorite = favoriteRecipes.find((recipe) => recipe.id === id);
      if (isFavorite) {
        return this.setState({
          isFavorite: true,
        });
      }
      return this.setState({
        isFavorite: false,
      });
    }
    return this.setState({
      isFavorite: false,
    });
  }

  renderFavorite() {
    const { isFavorite } = this.state;
    if (isFavorite) {
      return (
        <img src={ blackHeartIcon } alt="favorito" data-testid="favorite-btn" />
      );
    }
    return (
      <img src={ whiteHeartIcon } alt="favorito" data-testid="favorite-btn" />
    );
  }

  render() {
    const { detailsRecipe, copyLink } = this.state;
    if (detailsRecipe.length === 0) {
      return <div>Carregando</div>;
    }
    return (
      <section>
        <h1 data-testid="recipe-title">
          {detailsRecipe[0].strDrink}
        </h1>
        <img
          src={ detailsRecipe[0].strDrinkThumb }
          alt={ detailsRecipe[0].strDrink }
          data-testid="recipe-photo"
          width="150px"
        />
        <p>{copyLink ? 'Link copiado!' : null}</p>
        <button
          data-testid="share-btn"
          type="button"
          onClick={ this.onClickShare }
        >
          <img src={ shareIcon } alt="Compartilhar" />
        </button>
        <button type="button" onClick={ this.onClickFavoriteIcon }>
          {this.renderFavorite()}
        </button>
        <p data-testid="recipe-category">
          {`${detailsRecipe[0].strCategory} ${detailsRecipe[0].strAlcoholic}`}
        </p>
        <ul>{this.renderIngredients()}</ul>
        <p data-testid="instructions">{detailsRecipe[0].strInstructions}</p>
        <Recommendations api="meal" />
        {this.renderRecipeBtn()}
      </section>
    );
  }
}

BeverageRecipe.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default BeverageRecipe;
