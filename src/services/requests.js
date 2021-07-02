export default async () => {
  const endPoints = [
    'https://www.themealdb.com/api/json/v1/1/search.php?s=',
    'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=',
    'https://www.themealdb.com/api/json/v1/1/list.php?c=list',
    'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list',
  ];
  const resolves = endPoints.map((URL) => fetch(URL).then((res) => res.json()));
  const [meals, drinks, ctgMeals, ctgDrinks] = await Promise.all(resolves);
  return { meals, drinks, ctgMeals, ctgDrinks };
};
