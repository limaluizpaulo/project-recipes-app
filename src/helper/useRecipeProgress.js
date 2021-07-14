import { useEffect } from 'react';
import progress from './functions';

function useRecipeProgress({
  idRecipe, typeRecipe,
  fetchRecipeIDFood,
  fetchRecipeIDrinks, setLeng,
  setList, arrayFavorite, setFavorite, setDetail, objectStart }) {
  useEffect(() => {
    const func = async (api) => {
      const fun = await api(idRecipe);
      // console.log(fun);
      const type = Object.keys(fun)[0];
      const lista = fun[type];
      //   const ingretFinal = Object.entries(
      //     lista[0],
      //   ).filter((element) => element[0].includes('strIngredient') && !element[1]);
      //   console.log(ingretFinal);
      const ingret = Object.keys(
        lista[0],
      ).filter((element) => element.includes('strIngredient'));
      const ingretF = ingret.filter((element) => lista[0][element] !== null);
      const ingretFinal = ingretF.filter((element) => lista[0][element] !== '');
      const leng = ingretFinal;
      progress({ objectStart, leng, typeRecipe, idRecipe });
      const mapObject = {};
      // console.log(objectStart);
      if (typeRecipe === 'food' && objectStart.meals[idRecipe]) {
        const array = objectStart.meals[idRecipe];
        ingretFinal.forEach((item) => {
          mapObject[item] = array.includes(item) ? 'noDetailClass' : 'detailClass';
        });
      } else if (objectStart.cocktails[idRecipe]) {
        const array = objectStart.cocktails[idRecipe];
        ingretFinal.forEach((item) => {
          mapObject[item] = array.includes(item) ? 'noDetailClass' : 'detailClass';
        });
      } else {
        // console.log(ingretFinal);
        ingretFinal.forEach((item) => {
          mapObject[item] = 'noDetailClass';
        });
      }
      // console.log(mapObject);
      setDetail(mapObject);
      // console.log(ingretFinal);
      setLeng(ingretFinal);
      setList(lista[0]);
    };

    if (typeRecipe === 'food') {
      func(fetchRecipeIDFood);
    } else {
      func(fetchRecipeIDrinks);
    }
  }, [fetchRecipeIDFood,
    fetchRecipeIDrinks, setDetail, idRecipe, setLeng, setList, typeRecipe, objectStart]);

  useEffect(() => {
    if (arrayFavorite.length > 0) {
      arrayFavorite.map((element) => element.id === idRecipe
          && setFavorite(true));
    }
  }, [arrayFavorite, idRecipe, setFavorite]);
}

export default useRecipeProgress;
