import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';
import FavoriteButton from '../components/FavoriteButton';
import { setDoneRecipes } from '../components/RecipeDetailsFunc';

import '../css/RecipeDetails.css'; import '../css/Page.css'; import '../css/Buttons.css';

class RecipeInProgress extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipeDetails: {},
      checked: [],
      copied: false,
      finaliza: false,
      redireciona: false,
    };
    this.getIngredients = this.getIngredients.bind(this);
    this.changeState = this.changeState.bind(this);
    this.copyLink = this.copyLink.bind(this);
    this.redireciona = this.redireciona.bind(this);
    this.salvaLocal = this.salvaLocal.bind(this);
    this.recuperaItens = this.recuperaItens.bind(this);
  }

  componentDidMount() {
    const { meals } = this.props;
    const { match: { params: { comidaId } } } = this.props;
    const { match: { params: { bebidaId } } } = this.props;
    const db = meals ? 'themealdb' : 'thecocktaildb';
    const id = meals ? comidaId : bebidaId;
    const URL = `https://www.${db}.com/api/json/v1/1/lookup.php?i=${id}`;
    fetch(URL)
      .then((response) => response.json())
      .then((retorno) => {
        const { meals: comida, drinks } = retorno;
        const recipeDetails = comida || drinks;
        this.setState({ recipeDetails });
      });
    this.recuperaItens();
  }

  getIngredients() {
    const { recipeDetails, checked } = this.state;
    if (recipeDetails[0]) {
      const chaves = Object.entries(recipeDetails[0]);
      const ingredientes = chaves.filter((key) => (
        key[0].includes('strIngredient') && (key[1] !== null && key[1] !== '')));
      const medidas = chaves.filter((key) => (
        key[0].includes('strMeasure') && (key[1] !== null && key[1] !== ' ')));
      const apenasMedidas = medidas.map((medida) => medida[1]);
      return ingredientes.map((ingrediente, index) => {
        if (ingrediente && apenasMedidas[index]) {
          const findChecked = checked.find(
            (e) => e === index || 0,
          ) === index || 0 ? true : null;
          return (
            <li
              key={ index }
              data-testid={ `${index}-ingredient-step` }
            >
              <label
                htmlFor="key"
                className={ findChecked && 'checked' }
              >
                <input
                  type="checkbox"
                  id="key"
                  data-testid={ `${index}-ingredient-name-and-measure` }
                  checked={ findChecked }
                  onClick={ () => this.changeState(index) }
                />
                {`${ingrediente[1]}-${apenasMedidas[index]}`}
              </label>
            </li>);
        }
        return null;
      });
    }
  }

  recuperaItens() {
    const { meals } = this.props;
    const { match: { params: { comidaId } } } = this.props;
    const { match: { params: { bebidaId } } } = this.props;
    const id = meals ? comidaId : bebidaId;
    const recipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (recipes && (recipes.meals[id] || recipes.cocktails[id])) {
      if (meals && recipes.meals[id]) {
        this.setState({
          checked: recipes.meals[id],
        });
      } else if (!meals && recipes.cocktails[id]) {
        this.setState({
          checked: recipes.cocktails[id],
        });
      }
    }
  }

  copyLink() {
    this.setState({ copied: true });
    const { location: { pathname } } = this.props;
    const link = pathname.split('/in-progress');
    copy(`http://localhost:3000${link[0]}`);
  }

  changeState(param) {
    localStorage.inProgressRecipes = JSON.stringify({ cocktails: {}, meals: {} });
    const { checked, recipeDetails } = this.state;
    const verificaChecked = checked.find(
      (e) => e === param || 0,
    ) === param || 0 ? true : null;
    if (verificaChecked) {
      this.setState({
        checked: checked.filter((e) => e !== param || 0),
      });
      this.salvaLocal(checked.filter((e) => e !== param || 0));
    } else {
      this.setState((prev) => ({
        checked: [...prev.checked, param],
      }));
      this.salvaLocal(param);
    }
    const chaves = Object.entries(recipeDetails[0]);
    const ingredientes = chaves.filter((key) => (
      key[0].includes('strIngredient') && (key[1] !== null && key[1] !== '')));
    if (ingredientes.length === checked.length + 1) {
      this.setState({
        finaliza: true,
      });
    }
  }

  salvaLocal(param) {
    const { checked } = this.state;
    const { meals } = this.props;
    const { match: { params: { comidaId } } } = this.props;
    const { match: { params: { bebidaId } } } = this.props;
    const id = meals ? comidaId : bebidaId;
    const remove = typeof param === 'object';
    if (meals) {
      const mealsLocal = JSON.parse(localStorage.getItem('inProgressRecipes'));
      if (mealsLocal) {
        localStorage.inProgressRecipes = JSON.stringify({
          ...mealsLocal,
          meals: {
            ...mealsLocal.meals,
            [id]: remove ? param : [...checked, param],
          },
        });
      }
    } else {
      const drinksLocal = JSON.parse(localStorage.getItem('inProgressRecipes'));
      if (drinksLocal) {
        localStorage.inProgressRecipes = JSON.stringify({
          ...drinksLocal,
          cocktails: {
            ...drinksLocal.cocktails,
            [id]: remove ? param : [...checked, param],
          },
        });
      }
    }
  }

  redireciona(recipe, pathname) {
    this.setState({ redireciona: true });
    setDoneRecipes(recipe, pathname);
  }

  render() {
    const { recipeDetails, copied, finaliza, redireciona } = this.state;
    const { meals } = this.props;
    const { match: { params: { comidaId } } } = this.props;
    const { match: { params: { bebidaId } } } = this.props;
    const { location: { pathname } } = this.props;
    const id = meals ? comidaId : bebidaId;
    if (redireciona) return <Redirect to="/receitas-feitas" />;
    return (
      recipeDetails[0] ? (
        <div className="page">
          <div className="perfil-container">
            <div className="recipe-container">
              <img
                className="recipe-img"
                data-testid="recipe-photo"
                src={ recipeDetails[0].strMealThumb || recipeDetails[0].strDrinkThumb }
                alt={ recipeDetails[0].strMeal || recipeDetails[0].strDrink }
                width="250px"
              />
              <h1 data-testid="recipe-title">
                { recipeDetails[0].strMeal || recipeDetails[0].strDrink }
              </h1>
              <span data-testid="recipe-category">
                { recipeDetails[0].strAlcoholic }
              </span>
              <button
                className="like-and-share"
                data-testid="share-btn"
                type="button"
                onClick={ this.copyLink }
              >
                {copied ? 'Link copiado!'
                  : <img src={ shareIcon } alt="shareIcon" />}
              </button>
              <FavoriteButton
                className="like-and-share"
                recipeDetails={ recipeDetails[0] }
                id={ id }
                pathname={ pathname }
              />
              {copied ? <span>Link copiado!</span> : null}

              <span data-testid="recipe-category">
                { recipeDetails[0].strCategory }
              </span>
              <div className="recipe-details-ingredients">
                <h4>Ingredientes</h4>
                <ul>{this.getIngredients()}</ul>
              </div>
              <h4>Instruções</h4>
              <p data-testid="instructions">{ recipeDetails[0].strInstructions }</p>
              <button
                type="button"
                className="button-end-recipe"
                data-testid="finish-recipe-btn"
                disabled={ !finaliza }
                onClick={ () => this.redireciona(recipeDetails[0], pathname) }
              >
                Finalizar Receita
              </button>
            </div>
          </div>
        </div>
      ) : null
    );
  }
}

RecipeInProgress.propTypes = {
  recipeDetails: PropTypes.arrayOf(Object),
  id: PropTypes.string,
}.isRequired;

export default RecipeInProgress;
