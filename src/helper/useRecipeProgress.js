import { useEffect } from 'react';

function useRecipeProgress({
  idRecipe, typeRecipe,
  fetchRecipeIDFood,
  fetchRecipeIDrinks, setLeng,
  setList, arrayFavorite, setFavorite }) {
  useEffect(() => {
    const func = async (api) => {
      const fun = await api(idRecipe);
      const type = Object.keys(fun)[0];
      const lista = fun[type];
      const ingret = Object.keys(
        lista[0],
      ).filter((element) => element.includes('strIngredient'));
      const ingretF = ingret.filter((element) => lista[0][element] !== null);
      const ingretFinal = ingretF.filter((element) => lista[0][element] !== '');
      console.log(ingretFinal);
      setLeng(ingretFinal);
      setList(lista[0]);
    };

    if (typeRecipe === 'food') {
      func(fetchRecipeIDFood);
    } else {
      func(fetchRecipeIDrinks);
    }
  }, [
    fetchRecipeIDFood,
    fetchRecipeIDrinks,
    idRecipe, setLeng, setList, typeRecipe]);

  useEffect(() => {
    if (arrayFavorite.length > 0) {
      arrayFavorite.map((element) => element.id === idRecipe
          && setFavorite(true));
    }
  }, [arrayFavorite, idRecipe, setFavorite]);
}

export default useRecipeProgress;
