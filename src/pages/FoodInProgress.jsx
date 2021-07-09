import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';
import fetchRecipeByDetails from '../RequisiçõesAPI/food/RequestByDetails';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

export default function FoodInProgress() {
  const [isFavorite, setIsFavorite] = useState(false);
  const { id } = useParams();
  const [recipeDetails, setRecipeDetails] = useState({});
  const [isCopy, setIsCopy] = useState(false);
  const history = useHistory();
  const bottomFixed = {
    position: 'fixed',
    bottom: '0px',
  };

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

  const handleCopyLink = () => {
    copy(window.location.href);
    setIsCopy(true);
  };

  const handleFavorite = ({ idMeal, strArea, strCategory, strMeal, strMealThumb }) => {
    if (!isFavorite) {
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
      <p data-testid="instructions">{recipeDetails.strInstructions}</p>
      <button
        style={ bottomFixed }
        type="button"
        data-testid="start-recipe-btn"
        onClick={ () => history.push('/receitas-feitas') }
      >
        Finalizar receita
      </button>
    </div>
  );
}
