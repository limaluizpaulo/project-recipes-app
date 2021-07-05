import React, { useEffect, useState } from 'react';
import { useParams, useRouteMatch } from 'react-router-dom';
import fetchAPI from '../services/apiRequest';

export default function FoodAndDrinkById() {
  const { path } = useRouteMatch();
  // const searchId = path === '/comidas' ? 'idMeal' : 'idDrink';
  const firstKey = path.includes('/comidas') ? 'meals' : 'drinks';
  const domain = path.includes('/comidas') ? 'themealdb' : 'thecocktaildb';
  const { Id } = useParams();
  const [singleContent, setSingleContent] = useState({});

  useEffect(() => {
    async function getRecipeDetails() {
      const URL = `https://www.${domain}.com/api/json/v1/1/lookup.php?i=${Id}`;
      const resolved = await fetchAPI(URL);
      setSingleContent(...resolved[firstKey]);
    }
    getRecipeDetails();
  }, [Id, firstKey, domain]);

  const imgSrc = path.includes('/comidas') ? 'strMealThumb' : 'strDrinkThumb';
  const title = path.includes('/comidas') ? 'strMeal' : 'strDrink';

  return (
    <>
      {/* <p>{singleContent.strMeal}</p>
      <p>{singleContent.strCategory}</p>
      <p>{singleContent.strArea}</p>
      <p>{singleContent.strMeal}</p> */}
      <img src={ singleContent[imgSrc] } alt={ singleContent[title] } />
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
