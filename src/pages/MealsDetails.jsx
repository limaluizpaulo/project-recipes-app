import React, { useEffect, useState } from 'react';
import HeaderRecipes from '../components/HeaderRecipes';
import { DetailsRecipes } from '../components/index';
import Ingredients from '../components/Ingredients';
import Instructions from '../components/Instructions';
import RecipesApi from '../services/api/RecipesApi';

const MealsDetails = (id) => {
  const [mealsDetails, setMealsDetail] = useState([]);

  const { strMeal,
    strCategory,
    strYoutube,
    strInstructions,
    strMealThumb } = mealsDetails;
  const newObj = {
    id,
    title: strMeal,
    category: strCategory,
    imageHeader: strMealThumb,
    urlVideo: strYoutube,
    instructions: strInstructions,
    type: 'meals',
    ingredients: mealsDetails.filter((key, i) => (Object.keys(key) === `strIngredient${i + 1}`
    && Object.values(key) !== '')),
  };

  useEffect(() => {
    const getApi = async () => {
      const recipe = await RecipesApi('meals', id);
      setMealsDetail(recipe);
    };
    getApi();
  }, [id]);

  return (
    <div>
      <DetailsRecipes obj={ newObj } />
      <HeaderRecipes obj={ newObj } />
      <Ingredients obj={ newObj } />
      <Instructions obj={ newObj } />
    </div>
  );
};

export default MealsDetails;
