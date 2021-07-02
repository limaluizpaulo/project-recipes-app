import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipeContext from './Context';
// [{ id, type, area, category, alcoholicOrNot, name, image }]
const RecipeProvider = ({ children }) => {
  const [selectedFood, setSelectedFood] = useState();

  const createObjectFromFood = () => {
    const {
      idMeal,
      idDrink,
      strCategory,
      strAlcoholic,
      strArea,
      strMeal,
      strDrink,
      strDrinkThumb,
      strMealThumb,
    } = selectedFood;

    return ({
      id: idMeal || idDrink,
      type: idMeal ? 'comida' : 'bebida',
      area: strArea || '',
      category: strCategory,
      alcoholicOrNot: strAlcoholic || '',
      name: strMeal || strDrink,
      image: strDrinkThumb || strMealThumb,
    });
  };

  const context = { selectedFood, setSelectedFood, createObjectFromFood };
  return (
    <RecipeContext.Provider value={ context }>
      {children}
    </RecipeContext.Provider>
  );
};

RecipeProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default RecipeProvider;
