import { useEffect, useState } from 'react';

const MAX_RECIPES = 5;

const limitarResultados = (arr) => arr.slice(0, MAX_RECIPES);

function UseListaCategorias(apelidoAPI) {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    const requestAPI = async () => {
      const apiDomain = {
        comidas: 'themealdb',
        bebidas: 'thecocktaildb',
      };
      const END_POINT = `https://www.${apiDomain[apelidoAPI]}.com/api/json/v1/1/list.php?c=list`;
      const request = await fetch(END_POINT);
      const response = await request.json();
      setCategorias(limitarResultados((apelidoAPI === 'comidas')
        ? response.meals : response.drinks));
    };
    requestAPI();
  }, [apelidoAPI]);

  return categorias;
}

export default UseListaCategorias;
