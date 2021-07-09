export const apiIngredienteFood = async (inputSearchBar) => {
  const apiIngrediente = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${inputSearchBar}`;
  const twelve = 12;
  return fetch(apiIngrediente).then((response) => response.json())
    .then((item) => item.meals.filter((item2, index) => item2 && index < twelve))
    // .map((item, idex) => item.meals && idex <= 12)
    .catch((error) => error);
  // const casa = resultado.meals;
  // const casa2 = casa.slice(0, 12);
  // return casa2;
};

export const apiNomeFood = async (inputSearchBar) => {
  const apiNome = `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputSearchBar}`;
  const twelve = 12;
  return fetch(apiNome).then((response) => response.json())
    .then((item) => item.meals.filter((item2, index) => item2 && index < twelve))
    .catch((error) => error);
};

export const apiPrimeiraLetraFood = async (inputSearchBar) => {
  const apiPrimeiraLetra = `https://www.themealdb.com/api/json/v1/1/search.php?f=${inputSearchBar}`;
  const twelve = 12;
  return fetch(apiPrimeiraLetra).then((response) => response.json())
    .then((item) => item.meals.filter((item2, index) => item2 && index < twelve))
    .catch((error) => error);
};

export const apiIngredienteDrinks = async (inputSearchBar) => {
  const apiIngrediente = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${inputSearchBar}`;
  const twelve = 12;
  return fetch(apiIngrediente).then((response) => response.json())
    .then((item) => item.drinks.filter((item2, index) => item2 && index < twelve))
    .catch((error) => error);
};

export const apiNomeDrinks = async (inputSearchBar) => {
  const apiNome = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputSearchBar}`;
  const twelve = 12;
  return fetch(apiNome).then((response) => response.json())
    .then((item) => item.drinks.filter((item2, index) => item2 && index < twelve))
    .catch((error) => error);
};

export const apiPrimeiraLetraDrinks = async (inputSearchBar) => {
  const apiPrimeiraLetra = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${inputSearchBar}`;
  const twelve = 12;
  return fetch(apiPrimeiraLetra).then((response) => response.json())
    .then((item) => item.drinks.filter((item2, index) => item2 && index < twelve))
    .catch((error) => error);
};
