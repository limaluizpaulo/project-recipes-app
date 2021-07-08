import React from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import fetchAPI from '../services/fetchApi';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

class FoodInProgress extends React.Component {
  constructor() {
    super();
    this.state = {
      detailsRecipe: [],
      copyLink: false,
      isFavorite: false,
      checkedIngredients: [],
    };
    this.renderIngredients = this.renderIngredients.bind(this);
    this.handleChecked = this.handleChecked.bind(this);
    this.fetchDetails = this.fetchDetails.bind(this);
    this.onClickShare = this.onClickShare.bind(this);
    this.onClickFavoriteIcon = this.onClickFavoriteIcon.bind(this);
    this.renderFavorite = this.renderFavorite.bind(this);
    this.handleFavoriteLocalStorage = this.handleFavoriteLocalStorage.bind(this);
  }

  componentDidMount() {
    this.fetchDetails();
    this.handleFavoriteLocalStorage();
  }

  handleChecked({ target }) {
    const { detailsRecipe } = this.state;
    const ing = target.name;
    const { idMeal } = detailsRecipe[0];
    const prevStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const notFound = -1;

    if (prevStorage.meals[idMeal].indexOf(ing) === notFound) {
      prevStorage.meals[idMeal].push(ing);
    } else {
      const pos = prevStorage.meals[idMeal].indexOf(ing);
      prevStorage.meals[idMeal].splice(pos, 1);
    }
    this.setState({
      checkedIngredients: prevStorage.meals[idMeal],
    });
    localStorage.setItem('inProgressRecipes', JSON.stringify(prevStorage));
  }

  handleFavoriteLocalStorage() {
    const favoriteLocal = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const { match: { params: { id } } } = this.props;
    if (favoriteLocal) {
      favoriteLocal.map(({ id: idFood, type }) => {
        if (type === 'comida') {
          return (idFood === id)
          && this.setState({ isFavorite: true });
        }
        return null;
      });
    }
  }

  onClickShare() {
    const url = window.location.href.split('/in-progress');
    copy(url[0]);
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

  setInitialLocal() {
    const { match: { params: { id } } } = this.props;
    if (localStorage.getItem('inProgressRecipes') === null) {
      const obj = {
        cocktails: {},
        meals: {
          [id]: [],
        },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(obj));
    } else {
      const prevStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
      if (id in prevStorage.meals === false) {
        prevStorage.meals[id] = [];
        localStorage.setItem('inProgressRecipes', JSON.stringify(prevStorage));
      }
      this.setState({
        checkedIngredients: prevStorage.meals[id],
      });
    }
  }

  async fetchDetails() {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    this.setInitialLocal();
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    const responseAPI = await fetchAPI(url);
    const { meals } = responseAPI;
    this.setState(
      {
        detailsRecipe: meals,
      },
    );
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

  renderIngredients() {
    const { detailsRecipe, checkedIngredients } = this.state;
    const NUMBER_OF_INGREDIENTS = 20;
    const arrayIngredients = [];
    for (let index = 1; index < NUMBER_OF_INGREDIENTS; index += 1) {
      arrayIngredients.push(index);
    }
    return arrayIngredients.map((position) => {
      const ingredients = detailsRecipe[0][`strIngredient${position}`];
      const measure = detailsRecipe[0][`strMeasure${position}`];
      const ing = `${measure} ${ingredients}`;
      if (ingredients === '' || ingredients === null) {
        return null;
      }
      return (
        <li
          key={ position }
          data-testid={ `${position - 1}-ingredient-step` }
          className={
            checkedIngredients.includes(`${measure} ${ingredients}`)
              ? 'checked'
              : null
          }
        >
          <input
            type="checkbox"
            checked={ checkedIngredients.includes(`${measure} ${ingredients}`) }
            onChange={ this.handleChecked }
            name={ ing }
          />
          {ing}
        </li>
      );
    });
  }

  render() {
    const { detailsRecipe, copyLink } = this.state;
    if (detailsRecipe.length === 0) {
      return <div>Carregando</div>;
    }
    return (
      <section>
        <img
          src={ detailsRecipe[0].strMealThumb }
          alt="Imagem da Bebida"
          data-testid="recipe-photo"
          width="350"
        />
        <h1 data-testid="recipe-title">{detailsRecipe[0].strMeal}</h1>
        <p>{copyLink ? 'Link copiado!' : null}</p>
        <button
          type="button"
          onClick={ this.onClickShare }
        >
          <img data-testid="share-btn" src={ shareIcon } alt="Compartilhar" />
        </button>
        <button
          type="button"
          onClick={ this.onClickFavoriteIcon }
        >
          {this.renderFavorite()}
        </button>
        <p data-testid="recipe-category">
          {`Categoria: ${detailsRecipe[0].strCategory}`}
        </p>
        <p data-testid="instructions">
          {`Instrução: ${detailsRecipe[0].strInstructions}`}
        </p>
        <h3>Ingredientes</h3>
        <ul>{this.renderIngredients()}</ul>

        <button data-testid="finish-recipe-btn" type="button">
          Finalizar receita
        </button>
      </section>
    );
  }
}

FoodInProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default FoodInProgress;
