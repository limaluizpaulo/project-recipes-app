import React, { useState, useEffect } from 'react';
import { useParams, useHistory, useRouteMatch } from 'react-router-dom';
import copy from 'clipboard-copy';
import fetchRecipeByDetails from '../RequisiçõesAPI/food/RequestByDetails';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import DrinksRecomendation from '../components/DrinksRecomendation';
import FoodPreparation from '../components/FoodPreparation';
// https://dev.to/marcelomatosdev/react-adding-a-video-player-to-play-youtube-videos-in-your-project-30p

export default function FoodDetais() {
  const { url } = useRouteMatch();
  const bottomFixed = {
    position: 'fixed',
    bottom: '0px',
  };
  const [recipeDetails, setRecipeDetails] = useState({});
  const [isFavorite, setIsFavorite] = useState(false);
  const [isCopy, setIsCopy] = useState(false);
  const history = useHistory();
  const { id } = useParams();
  // const { pathname } = history.location;
  // const recipeId = pathname.split('/')[2];
  const youtube = 'https://www.youtube.com/embed/watch?v=';

  useEffect(() => {
    const handleSelectedFood = async () => {
      const response = await fetchRecipeByDetails(id);
      const result = await response.meals;
      setRecipeDetails(result[0]);
    };
    handleSelectedFood();
  }, []);

  useEffect(() => {
    const storage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (storage !== null && storage.find((favoriteId) => favoriteId.id === id)) {
      setIsFavorite(true);
    }
  }, []);

  const handleYoutubeVideo = (youtubeId) => {
    if (youtubeId !== undefined) {
      const idYoutube = youtubeId.split('=')[1];
      console.log(youtubeId);
      return idYoutube;
    }
  };

  const handleCopyLink = () => {
    copy(window.location.href);
    setIsCopy(true);
  };

  const handleFavorite = ({ idMeal, strArea, strCategory, strMeal, strMealThumb }) => {
    if (!isFavorite && localStorage.getItem('favoriteRecipes')) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([
        ...JSON.parse(localStorage.getItem('favoriteRecipes')),
        {
          id: idMeal,
          type: 'comida',
          area: strArea,
          category: strCategory,
          alcoholicOrNot: '',
          name: strMeal,
          image: strMealThumb,
        },
      ]));
      setIsFavorite(true);
    } else if (!isFavorite) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([
        {
          id: idMeal,
          type: 'comida',
          area: strArea,
          category: strCategory,
          alcoholicOrNot: '',
          name: strMeal,
          image: strMealThumb,
        },
      ]));
      setIsFavorite(true);
    }
    if (isFavorite) {
      const favorite = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const newFavorite = favorite.filter((favoriteId) => favoriteId.id !== id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorite));
      setIsFavorite(false);
    }
  };

  return (
    <div>
      {console.log(recipeDetails)}
      <img
        data-testid="recipe-photo"
        src={ recipeDetails.strMealThumb }
        alt={ recipeDetails.strMeal }
      />
      <p data-testid="recipe-title">{ recipeDetails.strMeal }</p>
      <button
        type="button"
        data-testid="share-btn"
        onClick={ () => handleCopyLink() }
      >
        <img
          src={ shareIcon }
          alt="share button"
        />
      </button>
      <span>
        { isCopy && (<p>Link copiado!</p>)}
      </span>
      <button
        type="button"
        data-testid="favorite-btn"
        src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
        onClick={ () => (handleFavorite(recipeDetails)) }
      >
        <img
          src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
          alt="favorite-btn"
        />
      </button>
      <p data-testid="recipe-category">{ recipeDetails.strCategory }</p>
      <ul>
        <FoodPreparation recipeId={ id } />
      </ul>
      <p data-testid="instructions">{recipeDetails.strInstructions}</p>
      <embed
        data-testid="video"
        title="Video"
        width="420"
        height="315"
        src={ `${youtube}${handleYoutubeVideo(recipeDetails.strYoutube)}` }
      />
      <DrinksRecomendation />
      <button
        style={ bottomFixed }
        type="button"
        data-testid="start-recipe-btn"
        onClick={ () => history.push(`${url}/in-progress`) }
      >
        Iniciar Receita
      </button>
    </div>
  );
}
