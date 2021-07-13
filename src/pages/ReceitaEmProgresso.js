import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import { fetchRecipe } from '../services/RecipeDetailsFetch';
import whiteHeart from '../images/whiteHeartIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import checkFavorite from '../services/CheckFavorites';
import checkInProgress from '../services/CheckInProgress';
import saveWithFavorites from '../services/SaveWithFavorites';
import loadDoneItems from '../services/LoadInProgress';
import saveInProgress from '../services/SaveInProgress';
import DetailsImage from '../components/DetailsImage';
import IngredientsStep from '../components/IngredientsStep';
import Instructions from '../components/Instructions';
import Title from '../components/Title';
import InProgressButton from '../components/InProgressButton';
import '../styles/ReceitaDetalhes.css';
import checkboxesChecked from '../services/CheckboxesChecked';

function ReceitaEmProgresso({ match }) {
  const { url } = match;
  const food = /comidas/gi;
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [favorite, setFavorite] = useState(false);
  const [copied, setCopied] = useState(false);
  const [inProgress, setInProgress] = useState(false);
  const [checked, setChecked] = useState(null);
  let recipeIngredientsList = [];

  useEffect(() => {
    fetchRecipe(url, food, id)
      .then((result) => setRecipe(result));
  }, []);

  function saveToFavorites() {
    const favorites = localStorage.getItem('favoriteRecipes');
    if (favorites) {
      saveWithFavorites({ url, food, recipe, setFavorite });
    } else if (url.match(food)) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([{
        id: recipe.idMeal,
        type: 'comidas',
        area: recipe.strArea,
        category: recipe.strCategory,
        alcoholicOrNot: '',
        name: recipe.strMeal,
        image: recipe.strMealThumb,
      }]));
      setFavorite(true);
    } else {
      localStorage.setItem('favoriteRecipes', JSON.stringify([{
        id: recipe.idDrink,
        type: 'bebidas',
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
    const array = url.split('/');
    copy(`http://localhost:3000/${array[1]}/${array[2]}`);
    setCopied(true);
  }

  function ingredientsStep() {
    const object = Object.entries(recipe);
    const recipeIngredients = object.filter((entry) => (
      entry[0].match(/strIngredient/) && entry[1] !== '' && entry[1] !== null));
    const recipeQuantities = object.filter((entry) => (
      entry[0].match(/strMeasure/) && entry[1] !== ' ' && entry[1] !== null));
    recipeIngredientsList = recipeIngredients.map((entry, index) => (
      ` ${recipeIngredients[index][1]} - ${recipeQuantities[index][1]}`
    ));
    // for (let i = 0; i < recipeIngredients.length; i += 1) {
    //   recipeIngredientsList.push(
    //     ` ${recipeIngredients[i][1]} - ${recipeQuantities[i][1]}`,
    //   );
    // }
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

  const checkFavoriteParams = {
    url,
    food,
    recipe,
    favorite,
    setFavorite,
  };

  const checkInProgressParams = {
    url,
    food,
    recipe,
    inProgress,
    setInProgress,
  };

  if (!recipe) {
    return (<h4 className="loading">Carregando...</h4>);
  }

  console.log(recipe);

  ingredientsStep();
  checkFavorite(checkFavoriteParams);
  checkInProgress(checkInProgressParams);
  const missingIngredients = loadDoneItems({ url, id });

  checkboxesChecked({ missingIngredients, checked, setChecked });

  const inProgressLocalStorage = localStorage.getItem('inProgressRecipes');
  const ingredientsStepProps = {
    url,
    id,
    recipeIngredientsList,
    missingIngredients,
    checked,
    setChecked,
  };

  const saveInProgressParams = {
    recipe,
    url,
    food,
    setInProgress,
    inProgress,
    inProgressLocalStorage,
  };

  if (!inProgress) {
    saveInProgress(saveInProgressParams);
  }

  const ingredientsQuantity = recipeIngredientsList.length;

  return (
    <main>
      <DetailsImage value={ { recipe, url } } />
      <Title value={ titleParams } />
      <IngredientsStep value={ ingredientsStepProps } />
      <Instructions value={ recipe } />
      <InProgressButton value={ { ingredientsQuantity, checked } } />
    </main>
  );
}

ReceitaEmProgresso.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default ReceitaEmProgresso;
