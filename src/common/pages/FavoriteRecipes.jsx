import React, { useState } from 'react';
import Header from '../components/Header/Header';
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

<<<<<<< HEAD
=======
        <h1 data-testid={ `${index}-horizontal-name` }>{ favorited.name }</h1>
        <ShareButton id={ favorited.id } type={ favorited.type } index={ index } path />
        <LikeButton
          recipe
          captureFavorited={ setFavorited }
          favPage
          index={ index }
        />
      </div>
    ))
  );

  useEffect(() => {
    setFavoriteStorage(getStorage('favoriteRecipes'));
  }, [state]);

>>>>>>> b572c74047e3a0503e0e97e2aec4f9a9874aae19
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
