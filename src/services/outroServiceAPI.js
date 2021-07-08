export default async function pegarComidasOuBebidas(tipo, parametro, valor) {
  const parametrosObj = {
    todos: 'search.php?s=',
    porCategoria: 'list.php?c=list',
    porId: `lookup.php?i=${valor}`,

    filtrarCategoria: `filter.php?c=${valor}`,

    ingrediente: 'list.php?i=list',
    origem: 'list.php?a=list', // Apenas para comidas
    aleatorio: 'random.php', // redireciona para a receita escolhida pelo ramdom

    ingredientePorValor: `filter.php?i=${valor}`,
    nomePorValor: `search.php?s=${valor}`,
    primeiraLetraPorValor: `search.php?f=${valor}`,
    filtrarPorArea: `filter.php?a=${valor}`,
  };

  const endPoint = `https://www.${tipo === 'meals' ? 'themealdb' : 'thecocktaildb'}.com/api/json/v1/1/${parametrosObj[parametro]}`;

  const fetchEndPoint = await fetch(endPoint);
  const data = await fetchEndPoint.json();

  return tipo === 'meals' ? data.meals : data.drinks;
}
