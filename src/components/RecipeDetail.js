import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import copy from 'clipboard-copy';
import progress, { copyLink, favoriteClick, help } from '../helper/functions';
import useRecipeDetail from '../helper/useRecipeDetail';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { fetchRecipeAllDrink,
  fetchRecipeAllFood,
  fetchRecipeIDFood, fetchRecipeIDrinks } from '../services/recipeAPI';

function RecipeDetail({ idRecipe, typeRecipe }) {
  const location = useLocation();
  const [list, setList] = useState([]);
  const [leng, setLeng] = useState([]);
  const [reco, setReco] = useState([]);
  const [show, setShow] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [objectStart] = useState(help(JSON.parse(
    localStorage.getItem('inProgressRecipes'),
  ), { cocktails: {}, meals: {} }));
  const [arrayFavorite] = useState(help(JSON.parse(
    localStorage.getItem('favoriteRecipes'),
  ), []));
  const [button, setButton] = useState('Iniciar Receita');
  const history = useHistory();
  useRecipeDetail({
    idRecipe,
    typeRecipe,
    fetchRecipeIDFood,
    fetchRecipeIDrinks,
    fetchRecipeAllFood,
    fetchRecipeAllDrink,
    setLeng,
    setList,
    setReco,
    setButton,
    objectStart,
    arrayFavorite,
    setFavorite,
  });

  return (
    <div>

      <img
        width="140"
        alt={ typeRecipe === 'food' ? list.strMeal : list.strDrink }
        src={ typeRecipe === 'food' ? list.strMealThumb : list.strDrinkThumb }
        data-testid="recipe-photo"
      />

      <p
        data-testid="recipe-title"
      >
        { typeRecipe === 'food' ? list.strMeal : list.strDrink }

      </p>
      <img
        style={ { padding: '20px' } }
        role="presentation"
        onClick={ () => copyLink(copy, setShow, location) }
        type="button"
        data-testid="share-btn"
        src={ shareIcon }
        alt="Share Icon"
      />
      <p>{show && 'Link copiado!'}</p>
      <img
        src={ favorite ? blackHeartIcon : whiteHeartIcon }
        alt="No Favorite"
        onClick={ () => favoriteClick({
          arrayFavorite, list, favorite, typeRecipe, idRecipe, setFavorite }) }
        type="button"
        role="presentation"
        data-testid="favorite-btn"
      />
      <p data-testid="recipe-category">
        { typeRecipe === 'food' ? list.strCategory : list.strAlcoholic }
      </p>
      <p className="instruction" data-testid="instructions">{list.strInstructions}</p>
      <ul>
        {leng.map((ing, index) => (
          <li
            className="instruction"
            key={ index }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            {list[ing]}
            -
            {list[`strMeasure${index + 1}`]}
          </li>))}
      </ul>
      { typeRecipe === 'food'
      && <iframe
        data-testid="video"
        width="260"
        height="200"
        src={ list.length === 0 ? `https://www.youtube.com/embed/${list.strYoutube}` : `https://www.youtube.com/embed/${list.strYoutube.split('v=')[1]}` }
        title="YouTube video player"
        frameBorder="0"
        allow="
        accelerometer;
        autoplay;
        clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />}
      <div className="recipe-list">
        { reco.map((item, index) => (
          <div
            data-testid={ `${index}-recomendation-card` }
            className="recipe-card"
            key={ index }
            role="presentation"
          >
            <img
              className="filhinho"
              src={ typeRecipe !== 'food'
                ? item.strMealThumb : item.strDrinkThumb }
              data-testid={ `${index}-recomendation-img` }
              alt={ typeRecipe !== 'food' ? item.strMeal : item.strDrink }
              width="20%"
            />
            <p data-testid={ `${index}-recomendation-title` }>
              { typeRecipe !== 'food' ? item.strMeal : item.strDrink }
            </p>
          </div>))}
      </div>
      <button
        onClick={ () => progress({
          objectStart,
          leng,
          typeRecipe,
          idRecipe,
          history,
          list }) }
        className="start-recipe"
        type="button"
        value={ button }
        data-testid="start-recipe-btn"
      >
        {button}
      </button>

    </div>

  );
}

RecipeDetail.propTypes = {
  idRecipe: PropTypes.string,
  typeRecipe: PropTypes.string,
}.isRequired;

export default RecipeDetail;
