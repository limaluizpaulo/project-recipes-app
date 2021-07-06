import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { DetailsRecipes, Ingredients, Instructions, HeaderRecipes } from '../components';
import RecipesApi from '../services/api/RecipesApi';
import { MealsContext } from '../context/MealsProvider';

const DrinksDetails = ({ match: { params: { id } } }) => {
  const [drinksDetails, setDrinksDetails] = useState([]);

  const { meals } = useContext(MealsContext);

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
    // ingredients,
    recomendations: meals,
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
