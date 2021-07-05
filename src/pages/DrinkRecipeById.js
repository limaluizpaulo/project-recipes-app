import React, { useEffect, useState } from 'react';
import { useParams, useRouteMatch } from 'react-router-dom';
import fetchAPI from '../services/apiRequest';

export default function DrinkRecipeById() {
  const { path } = useRouteMatch();
  // const searchId = path === '/comidas' ? 'idMeal' : 'idDrink';
  const firstKey = path.includes('/bebidas') ? 'drinks' : 'meals';
  const domain = path.includes('/bebidas') ? 'thecocktaildb' : 'themealdb';
  const { drinkId } = useParams();
  const [singleContent, setSingleContent] = useState({});

  useEffect(() => {
    async function getRecipeDetails() {
      const URL = `https://www.${domain}.com/api/json/v1/1/lookup.php?i=${drinkId}`;
      const resolved = await fetchAPI(URL);
      setSingleContent(...resolved[firstKey]);
    }
    getRecipeDetails();
  }, [drinkId, firstKey, domain]);
  return (
    <>
      {/* <p>{singleContent.strMeal}</p>
      <p>{singleContent.strCategory}</p>
      <p>{singleContent.strArea}</p>
      <p>{singleContent.strMeal}</p> */}
      <img src={ singleContent.strDrinkThumb } alt={ singleContent.strDrink } />
      {Object.entries(singleContent).map((info, i) => (info[1] !== '' && info[1] !== null)
      && (
        <p key={ i }>
          {' '}
          {`${info[0]} => ${info[1]}`}
          {' '}
        </p>))}
    </>
  );
}
