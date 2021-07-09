import { useState, useEffect } from 'react';

const useIsFavorite = (id) => {
  const [isFavorite, setIsFavorite] = useState(false);
  // const { setRecipes } = useContext(RecipeContext);

  useEffect(() => {
    const favRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favRecipes) setIsFavorite(favRecipes.some((favId) => favId.id === id));
  }, [isFavorite]);

  return [isFavorite, setIsFavorite];
};

export default useIsFavorite;
