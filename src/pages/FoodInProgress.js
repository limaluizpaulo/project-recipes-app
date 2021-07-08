import React from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import fetchAPI from '../services/fetchApi';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

class FoodInProgress extends React.Component {
  constructor() {
    super();
    this.state = {
      detailsRecipe: [],
      copyLink: false,
      checkedIngredients: [],
    };
    this.renderIngredients = this.renderIngredients.bind(this);
    this.handleChecked = this.handleChecked.bind(this);
    this.fetchDetails = this.fetchDetails.bind(this);
    this.onClickShare = this.onClickShare.bind(this);
  }

  componentDidMount() {
    this.fetchDetails();
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

  onClickShare() {
    copy(window.location.href);
    this.setState({
      copyLink: true,
    });
  }

  setInitialLocal() {
    const { detailsRecipe } = this.state;
    const { idMeal } = detailsRecipe[0];
    if (localStorage.getItem('inProgressRecipes') === null) {
      const obj = {
        cocktails: {},
        meals: {
          [idMeal]: [],
        },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(obj));
    } else {
      const prevStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
      if (idMeal in prevStorage.meals === false) {
        prevStorage.meals[idMeal] = [];
        localStorage.setItem('inProgressRecipes', JSON.stringify(prevStorage));
      }
      this.setState({
        checkedIngredients: prevStorage.meals[idMeal],
      });
    }
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
    this.setState(
      {
        detailsRecipe: meals,
      },
      () => this.setInitialLocal(),
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
          data-testid="share-btn"
          type="button"
          onClick={ this.onClickShare }
        >
          <img src={ shareIcon } alt="Compartilhar" />
        </button>
        <button
          data-testid="favorite-btn"
          type="button"
          onClick={ this.onClickFavoriteIcon }
        >
          <img src={ blackHeartIcon } alt="Favoritar" />
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
