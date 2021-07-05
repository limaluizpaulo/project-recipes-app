import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import HeaderRecipes from '../components/HeaderRecipes';
import { DetailsRecipes } from '../components/index';
import Ingredients from '../components/Ingredients';
import Instructions from '../components/Instructions';
import RecipesApi from '../services/api/RecipesApi';

const DrinksDetails = ({ match: { params: { id } } }) => {
  const [drinksDetails, setDrinksDetails] = useState([]);

  const { strDrink,
    strCategory,
    strInstructions,
    strDrinkThumb } = drinksDetails;
  const newObj = {
    id,
    title: strDrink,
    type: 'cocktail',
    category: strCategory,
    instructions: strInstructions,
    imageHeader: strDrinkThumb,
    ingredients: drinksDetails.filter((key, i) => (
      Object.keys(key) === `strIngredient${i + 1}`
    && Object.values(key) !== ''
    )),
  };

  useEffect(() => {
    const getApi = async () => {
      const recipe = await RecipesApi('cocktail', id);
      await setDrinksDetails(recipe);
    };
    getApi();
  }, [id]);

  return (
    <div>
      <HeaderRecipes obj={ newObj } />
      <Ingredients obj={ newObj } />
      <Instructions obj={ newObj } />
      <DetailsRecipes obj={ newObj } />
    </div>
  );
};

DrinksDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default DrinksDetails;
