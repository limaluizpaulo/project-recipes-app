import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import whiteHeart from '../images/whiteHeartIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import CardsCarousel from '../components/CardsCarousel';
import DetailsImage from '../components/DetailsImage';
import EmbedVideo from '../components/EmbedVideo';
import Ingredients from '../components/Ingredients';
import Instructions from '../components/Instructions';
import './ReceitaDetalhes.css';

function ReceitaDetalhes({ match }) {
  const { url } = match;
  const food = /comida/gi;
  const { id } = useParams();
  const [recipe, setRecipe] = useState();
  const [error, setError] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [related, setRelated] = useState([]);

  const fetchRelated = async () => {
    if (url.match(food)) {
      await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
        .then((response) => response.json())
        .then((response) => setRelated(response.drinks))
        .catch(() => setError(true));
    } else {
      await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
        .then((response) => response.json())
        .then((response) => setRelated(response.meals))
        .catch(() => setError(true));
    }
  };

  const fetchRecipe = async (param) => {
    if (url.match(food)) {
      await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${param}`)
        .then((response) => response.json())
        .then((response) => setRecipe(response.meals[0]))
        .catch(() => setError(true));
    } else {
      await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${param}`)
        .then((response) => response.json())
        .then((response) => setRecipe(response.drinks[0]))
        .catch(() => setError(true));
    }
  };

  function checkFavorite() {
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (url.match(food) && favorites) {
      const { idMeal } = recipe;
      favorites.forEach((favoriteItem) => {
        if (idMeal === favoriteItem.id && favorite === false) {
          setFavorite(true);
        }
      });
    } else if (favorites) {
      const { idDrink } = recipe;
      favorites.forEach((favoriteItem) => {
        if (idDrink === favoriteItem.id && favorite === false) {
          setFavorite(true);
        }
      });
    }
  }

  useEffect(() => {
    fetchRelated();
    fetchRecipe(id);
  }, []);

  function saveWithFavorites() {
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (url.match(food)) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([...favorites, {
        id: recipe.idMeal,
        type: recipe.strCategory,
        area: recipe.strArea,
        category: recipe.strCategory,
        alcoholicOrNot: null,
        name: recipe.strMeal,
        image: recipe.strMealThumb,
        doneDate: null,
        tags: recipe.strTags,
      }]));
      setFavorite(true);
    } else {
      localStorage.setItem('favoriteRecipes', JSON.stringify([...favorites, {
        id: recipe.idDrink,
        type: recipe.strCategory,
        area: null,
        category: recipe.strCategory,
        alcoholicOrNot: recipe.strAlcoholic,
        name: recipe.strDrink,
        image: recipe.strDrinkThumb,
        doneDate: null,
        tags: recipe.strTags,
      }]));
      setFavorite(true);
    }
  }

  function saveToFavorites() {
    const favorites = localStorage.getItem('favoriteRecipes');
    if (favorites) {
      saveWithFavorites();
    } else if (url.match(food) && !favorites) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([{
        id: recipe.idMeal,
        type: 'comida',
        area: recipe.strArea,
        category: recipe.strCategory,
        alcoholicOrNot: '',
        name: recipe.strMeal,
        image: recipe.strMealThumb,
      }]));
      setFavorite(true);
    } else if (!favorites) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([{
        id: recipe.idDrink,
        type: 'bebida',
        area: '',
        category: recipe.strCategory,
        alcoholicOrNot: recipe.strAlcoholic,
        name: recipe.strDrink,
        image: recipe.strDrinkThumb,
      }]));
      setFavorite(true);
    }
  }

  function removeFromFavorites() {
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (url.match(food)) {
      favorites.forEach((element) => {
        favorites.splice(favorites.indexOf(element), 1);
      });
      localStorage.setItem('favoriteRecipes', JSON.stringify([...favorites]));
      setFavorite(false);
    } else {
      favorites.forEach((element) => {
        if (element.id === recipe.idDrink) {
          favorites.splice(favorites.indexOf(element), 1);
        }
      });
      localStorage.setItem('favoriteRecipes', JSON.stringify([...favorites]));
      setFavorite(false);
    }
  }

  function title() {
    const recipeTitle = recipe.strMeal;
    const favoriteIcon = (favorite)
      ? blackHeart : whiteHeart;
    const category = recipe.strCategory;
    if (url.match(food)) {
      return (
        <div className="title">
          <div className="title-left">
            <h4 data-testid="recipe-title">{recipeTitle}</h4>
            <h6 data-testid="recipe-category">{category}</h6>
          </div>
          <div className="title-right">
            <button
              src={ favoriteIcon }
              type="button"
              data-testid="favorite-btn"
              onClick={ (favorite) ? removeFromFavorites : saveToFavorites }
            >
              <img src={ favoriteIcon } alt="adicionar ou remover dos favoritos" />
            </button>
            <button src={ shareIcon } type="button" data-testid="share-btn">
              <img src={ shareIcon } alt="compartilhar receita" />
            </button>
          </div>
        </div>
      );
    }
    return (
      <div className="title">
        <div className="title-left">
          <h4 data-testid="recipe-title">{recipe.strDrink}</h4>
          <h6 data-testid="recipe-category">{recipe.strAlcoholic}</h6>
        </div>
        <div className="title-right">
          <button
            src={ favoriteIcon }
            type="button"
            data-testid="favorite-btn"
            onClick={ (favorite) ? removeFromFavorites : saveToFavorites }
          >
            <img src={ favoriteIcon } alt="adicionar ou remover dos favoritos" />
          </button>
          <button src={ shareIcon } type="button" data-testid="share-btn">
            <img src={ shareIcon } alt="compartilhar receita" />
          </button>
        </div>
      </div>
    );
  }

  if (error) return (<h4>Receita não encontrada!</h4>);
  if (!recipe) {
    return (<h4 className="loading">Carregando...</h4>);
  }

  const params = {
    url,
    related,
  };
  console.log(recipe);
  checkFavorite();
  return (
    <main>
      <DetailsImage value={ { recipe, url } } />
      {title()}
      <Ingredients value={ recipe } />
      <Instructions value={ recipe } />
      <EmbedVideo value={ recipe.strVideo } />
      <CardsCarousel value={ params } />
      <button
        className="start"
        data-testid="start-recipe-btn"
        type="button"
      >
        <a href={ `${url}/in-progress` }>Iniciar Receita</a>
      </button>
    </main>
  );
}

ReceitaDetalhes.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default ReceitaDetalhes;