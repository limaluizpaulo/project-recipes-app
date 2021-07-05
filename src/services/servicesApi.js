export default async function receitasApi(parametrosBusca) {
  const { apelidoAPI, flag, input } = parametrosBusca;
  const MAX_RECIPES = 12;
  const limitarResultados = (arr) => ((arr === null) ? null : arr.slice(0, MAX_RECIPES));
  const apiDomain = {
    comidas: 'themealdb',
    bebidas: 'thecocktaildb',
  };
  const metodo = {
    i: 'filter',
    c: 'filter',
    a: 'filter',
    s: 'search',
    f: 'search',
  };
  const END_POINT = `https://www.${apiDomain[apelidoAPI]}.com/api/json/v1/1/${metodo[flag]}.php?${flag}=${input}`;
  const request = await fetch(END_POINT);
  const response = await request.json();
  return (limitarResultados((apelidoAPI === 'comidas')
    ? response.meals : response.drinks));
}
