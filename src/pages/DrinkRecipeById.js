import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import fetchAPI from '../services/apiRequest';

function DrinkRecipeById() {
  const { drinkId } = useParams();
  const [singleContent, setSingleContent] = useState({});

  useEffect(() => {
    async function getRecipeDetails() {
      const URL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}`;
      const resolved = await fetchAPI(URL);
      setSingleContent(...resolved.drinks);
    }
    getRecipeDetails();
  }, [drinkId]);
  return (
    <>
      {/* <p>{singleContent.strDrink}</p>
      <p>{singleContent.strCategory}</p>
      <p>{singleContent.strArea}</p>
      <p>{singleContent.strDrink}</p>
      <p>{singleContent.strInstructions}</p> */}
      {/* {Object.values(singleContent).map((info, i) => info !== null && (
        <p key={ i }>
          {' '}
          {info}
          {' '}
        </p>))} */}
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

export default DrinkRecipeById;
