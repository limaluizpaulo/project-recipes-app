import React, { useState } from 'react';
import Header from '../components/Header';
import CategoryButton from '../components/CategoryButton';
import { getStorage, setStorage, handleClickType } from '../../functions';
import FavoriteRecipeCard from '../components/FavoriteRecipeCard';

const FAVORITE_RECIPES = 'favoriteRecipes';

export default function FavoriteRecipes() {
  const [favoriteRecipes, setFavoriteRecipes] = useState(
    () => getStorage('favoriteRecipes'),
  );

  const handleClickAll = () => setFavoriteRecipes(getStorage(FAVORITE_RECIPES));

  const handleLikeClick = (id) => {
    const newFavorites = favoriteRecipes.filter((fav) => fav.id !== id);
    setStorage('favoriteRecipes', newFavorites);
    setFavoriteRecipes(newFavorites);
  };

  return (
    <div>
      <Header pageName="Receitas Favoritas" />
      <CategoryButton
        foodOrDrink={ handleClickType }
        setState={ setFavoriteRecipes }
        clickAll={ handleClickAll }
        path={ FAVORITE_RECIPES }
      />
      { favoriteRecipes.map((recipe, i) => (
        <FavoriteRecipeCard
          recipe={ recipe }
          index={ i }
          handleLikeClick={ handleLikeClick }
          key={ i }
        />
      )) }
    </div>
  );
}
