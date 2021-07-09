import React from 'react';
import PropTypes from 'prop-types';
import Iframe from 'react-iframe';
import copy from 'clipboard-copy';
import fetchAPI from '../services/fetchApi';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import Recommendations from '../components/Recommendations';

class FoodRecipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      detailsRecipe: [],
      copyLink: false,
      isFavorite: false,
    };

    this.fetchDetails = this.fetchDetails.bind(this);
    this.renderVideo = this.renderVideo.bind(this);
    this.renderRecipeBtn = this.renderRecipeBtn.bind(this);
    this.onClickShare = this.onClickShare.bind(this);
    this.onClickFavoriteIcon = this.onClickFavoriteIcon.bind(this);
    this.renderHeartIcon = this.renderHeartIcon.bind(this);
    this.renderFavorite = this.renderFavorite.bind(this);
  }

  componentDidMount() {
    this.fetchDetails();
    this.renderHeartIcon();
  }

  onClickShare() {
    copy(window.location.href);
    this.setState({
      copyLink: true,
    });
  }

  onClickFavoriteIcon() {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const {
      match: {
        params: { id },
      },
    } = this.props;
    const { detailsRecipe } = this.state;
    const newFavorite = {
      id,
      type: 'comida',
      area: detailsRecipe[0].strArea,
      category: detailsRecipe[0].strCategory,
      alcoholicOrNot: '',
      name: detailsRecipe[0].strMeal,
      image: detailsRecipe[0].strMealThumb,
    };
    if (favoriteRecipes) {
      const isFavorite = favoriteRecipes.find((recipe) => recipe.id === id);
      if (isFavorite) {
        this.setState({
          isFavorite: false,
        });
        const newArray = favoriteRecipes.filter((recipe) => recipe.id !== id);
        return localStorage.setItem(
          'favoriteRecipes',
          JSON.stringify(newArray),
        );
      }
      this.setState({
        isFavorite: true,
      });
      const addFavorite = [...favoriteRecipes, newFavorite];
      return localStorage.setItem(
        'favoriteRecipes',
        JSON.stringify(addFavorite),
      );
    }
    this.setState({
      isFavorite: true,
    });
    return localStorage.setItem(
      'favoriteRecipes',
      JSON.stringify([newFavorite]),
    );
  }

  async fetchDetails() {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    const responseAPI = await fetchAPI(url);
    const { meals } = responseAPI;
    this.setState({
      detailsRecipe: meals,
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
      if (ingredients === '' || ingredients === null) {
        return null;
      }
      return (
        <li
          key={ position }
          data-testid={ `${position - 1}-ingredient-name-and-measure` }
        >
          {`${measure} ${ingredients}`}
        </li>
      );
    });
  }

  renderRecipeBtn() {
    const {
      match: {
        params: { id },
      },
      history,
    } = this.props;
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
    const recipesInProgress = JSON.parse(
      localStorage.getItem('inProgressRecipes'),
    );
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

  renderHeartIcon() {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const {
      match: {
        params: { id },
      },
    } = this.props;
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
        <h1 data-testid="recipe-title">{detailsRecipe[0].strMeal}</h1>
        <img
          src={ detailsRecipe[0].strMealThumb }
          alt={ detailsRecipe[0].strMeal }
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
        <p data-testid="recipe-category">{detailsRecipe[0].strCategory}</p>
        <ul>{this.renderIngredients()}</ul>
        <p data-testid="instructions">
          {' '}
          {detailsRecipe[0].strInstructions}
          {' '}
        </p>
        <div data-testid="video">
          <Iframe width="280" height="150" url={ this.renderVideo() } />
        </div>
        <section>
          <h2>Recomendações</h2>
          <Recommendations api="drinks" />
          {this.renderRecipeBtn()}
        </section>
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
