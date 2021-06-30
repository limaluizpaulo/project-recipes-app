import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import MealsContext from './MealsContext';
import {
  getMealsRecipes,
  getMealsCategories,
  getMealsIngredients,
} from '../helpers/MealsAPI';

function MealsProvider({ children }) {
  const [mealsCategories, setMealsCategories] = useState([]);
  const [mealsIngredients, setMealsIngredients] = useState([]);
  const [mealsRecipes, setMealsRecipes] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  const maxCards = 12;

  useEffect(() => {
    const recipes = async () => {
      setIsFetching(true);
      const results = await getMealsRecipes();
      setMealsRecipes(results.filter((item, index) => index < maxCards));
      setIsFetching(false);
    };

    const categories = async () => {
      setIsFetching(true);
      const results = await getMealsCategories();
      setMealsCategories(results);
      setIsFetching(false);
    };

    const ingredients = async () => {
      setIsFetching(true);
      const results = await getMealsIngredients();
      setMealsIngredients(results.filter((item, index) => index < maxCards));
      setIsFetching(false);
    };

    recipes();
    categories();
    ingredients();
  }, []);

  const context = {
    mealsCategories,
    isFetching,
    mealsIngredients,
    mealsRecipes,
  };
  return (
    <MealsContext.Provider value={ context }>
      {children}
    </MealsContext.Provider>
  );
}

MealsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MealsProvider;
