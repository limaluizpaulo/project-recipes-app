<<<<<<< HEAD
import React from 'react';

export default function DrinkInProgress() {
  return (
    <div>
      Food In Progress
=======
import React, { useState, useEffect } from 'react';
import copy from 'clipboard-copy';
import { useParams, useHistory } from 'react-router-dom';
import fetchRecipeByDetails from '../RequisiçõesAPI/drink/RequestByDetails';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import DrinkPrepProgress from '../components/DrinkPrepProgress';

export default function DrinkInProgress() {
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
    const handleSelectedDrink = async () => {
      const response = await fetchRecipeByDetails(id);
      const result = await response.drinks;
      setRecipeDetails(result[0]);
    };
    handleSelectedDrink();
  }, []);

  useEffect(() => {
    const storage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (storage !== null && storage.find((favoriteId) => favoriteId.id === id)) {
      setIsFavorite(true);
    }
  }, []);

  const handleCopyLink = () => {
    const pathName = window.location.href
      .split('/')
      .filter((url) => url !== 'in-progress')
      .join('/');
    copy(pathName);
    setIsCopy(true);
  };

  const handleFavorite = (
    { idDrink, strAlcoholic, strCategory, strDrink, strDrinkThumb },
  ) => {
    if (!isFavorite) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([
        {
          id: idDrink,
          type: 'bebida',
          area: '',
          category: strCategory,
          alcoholicOrNot: strAlcoholic,
          name: strDrink,
          image: strDrinkThumb,
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
        src={ recipeDetails.strDrinkThumb }
        alt={ recipeDetails.strDrink }
      />
      <p data-testid="recipe-title">{ recipeDetails.strDrink }</p>
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
      <p data-testid="recipe-category">{ recipeDetails.strAlcoholic }</p>
      <DrinkPrepProgress />
      <p data-testid="instructions">{recipeDetails.strInstructions}</p>
      <button
        style={ bottomFixed }
        type="button"
        data-testid="finish-recipe-btn"
        onClick={ () => history.push('/receitas-feitas') }
      >
        Finalizar receita
      </button>
>>>>>>> 04f30f4ace55c317dfe7256fc952a042fa2126b3
    </div>
  );
}
