import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import { fetchRecipe, fetchRelated } from '../services/RecipeDetailsFetch';
import whiteHeart from '../images/whiteHeartIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import checkFavorite from '../services/CheckFavorites';
import checkInProgress from '../services/CheckInProgress';
import saveWithFavorites from '../services/SaveWithFavorites';
import CardsCarousel from '../components/CardsCarousel';
import DetailsImage from '../components/DetailsImage';
import EmbedVideo from '../components/EmbedVideo';
import Ingredients from '../components/Ingredients';
import Instructions from '../components/Instructions';
import Title from '../components/Title';
import DetailsButton from './DetailsButton';
import '../styles/ReceitaDetalhes.css';

function ReceitaDetalhes({ match }) {
  const { url } = match;
  const food = /comida/gi;
  const { id } = useParams();
  const [recipe, setRecipe] = useState();
  const [favorite, setFavorite] = useState(false);
  const [related, setRelated] = useState([]);
  const [copied, setCopied] = useState(false);
  const [inProgress, setInProgress] = useState(false);

  useEffect(() => {
    fetchRelated(url, food)
      .then((response) => setRelated(response));
    fetchRecipe(url, food, id)
      .then((response) => setRecipe(response));
  }, []);

  function saveToFavorites() {
    const favorites = localStorage.getItem('favoriteRecipes');
    if (favorites) {
      saveWithFavorites(url, food, recipe, setFavorite);
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

  function copyUrl() {
    copy(`http://localhost:3000${url}`);
    setCopied(true);
  }

  const titleParams = {
    url,
    food,
    recipe,
    blackHeart,
    whiteHeart,
    shareIcon,
    copied,
    saveToFavorites,
    removeFromFavorites,
    copyUrl,
    favorite,
    setFavorite,
  };

  const params = {
    url,
    related,
  };

  const checkFavoriteParams = {
    url,
    food,
    recipe,
    favorite,
    setFavorite,
  };
  checkFavorite(checkFavoriteParams);

  const checkInProgressParams = {
    url,
    food,
    recipe,
    inProgress,
    setInProgress,
  };
  checkInProgress(checkInProgressParams);

  const buttonParams = {
    url,
    food,
    recipe,
    inProgress,
    setInProgress,
  };

  if (!recipe) {
    return (<h4 className="loading">Carregando...</h4>);
  }

  return (
    <main>
      <DetailsImage value={ { recipe, url } } />
      <Title value={ titleParams } />
      <Ingredients value={ recipe } />
      <Instructions value={ recipe } />
      <EmbedVideo value={ recipe.strVideo } />
      <CardsCarousel value={ params } />
      <DetailsButton value={ buttonParams } />
      {/* <button
        className="start"
        data-testid="start-recipe-btn"
        type="button"
      >
        <a href={ `${url}/in-progress` }>Iniciar Receita</a>
      </button> */}
    </main>
  );
}

ReceitaDetalhes.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default ReceitaDetalhes;
