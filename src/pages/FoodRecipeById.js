import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import fetchAPI from '../services/apiRequest';

export default function FoodRecipeById() {
  const { recipeId } = useParams();
  const [singleContent, setSingleContent] = useState({});

  useEffect(() => {
    async function getRecipeDetails() {
      const URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`;
      const resolved = await fetchAPI(URL);
      setSingleContent(...resolved.meals);
    }
    getRecipeDetails();
  }, [recipeId]);
  return (
    <>
      {/* <p>{singleContent.strMeal}</p>
      <p>{singleContent.strCategory}</p>
      <p>{singleContent.strArea}</p>
      <p>{singleContent.strMeal}</p> */}
      <img src={ singleContent.strMealThumb } alt={ singleContent.strMeal } />
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
