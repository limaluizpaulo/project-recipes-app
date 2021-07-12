import { useEffect } from 'react';

function useRecipeDetail({
  idRecipe, typeRecipe,
  fetchRecipeIDFood,
  fetchRecipeIDrinks, fetchRecipeAllFood, fetchRecipeAllDrink, setLeng,
  setList, setReco, arrayFavorite, setFavorite, setButton, objectStart }) {
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
      setLeng(ingretFinal);
      setList(lista[0]);
    };

    const rec = async (api) => {
      const fun = await api();
      const type = Object.keys(fun)[0];
      const lista = fun[type];
      const NUMBER = 6;
      setReco(lista.slice(0, NUMBER));
    };
    if (typeRecipe === 'food') {
      func(fetchRecipeIDFood);
      rec(fetchRecipeAllDrink);
    } else {
      func(fetchRecipeIDrinks);
      rec(fetchRecipeAllFood);
    }
  }, [fetchRecipeAllDrink,
    fetchRecipeAllFood,
    fetchRecipeIDFood,
    fetchRecipeIDrinks,
    idRecipe, setLeng, setList, setReco, typeRecipe]);

  useEffect(() => {
    if (typeRecipe === 'food') {
      Object.keys(objectStart.meals).map((element) => element === idRecipe
              && setButton('Continuar Receita'));
    }
    if (typeRecipe !== 'food') {
      Object.keys(objectStart.cocktails).map((element) => element === idRecipe
                && setButton('Continuar Receita'));
    }

    if (arrayFavorite.length > 0) {
      arrayFavorite.map((element) => element.id === idRecipe
      && setFavorite(true));
    }
  }, [arrayFavorite, idRecipe, objectStart, setButton, setFavorite, typeRecipe]);
}

export default useRecipeDetail;
