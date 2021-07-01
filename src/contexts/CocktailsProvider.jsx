import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import CocktailsContext from './CocktailsContext';
import {
  getCocktailsCategories,
  getCocktailsIngredients,
  getCocktailsRecipes,
} from '../helpers/CocktailsAPI';
// import getAPI from '../helpers/api';

function CocktailsProvider({ children }) {
  const [cocktailsCategories, setCocktailsCategories] = useState([]);
  const [cocktailsIngredients, setCocktailsIngredients] = useState([]);
  const [cocktailsRecipes, setCocktailsRecipes] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [filterHeader, setFilterHeader] = useState({});
  console.log(filterHeader);

  const maxCards = 12;

  useEffect(() => {
    const recipes = async () => {
      setIsFetching(true);
      const results = await getCocktailsRecipes();
      setCocktailsRecipes(results.filter((item, index) => index < maxCards));
      setIsFetching(false);
    };

    const categories = async () => {
      setIsFetching(true);
      const results = await getCocktailsCategories();
      setCocktailsCategories(results);
      setIsFetching(false);
    };

    const ingredients = async () => {
      setIsFetching(true);
      const results = await getCocktailsIngredients();
      setCocktailsIngredients(results);
      setIsFetching(false);
    };

    recipes();
    categories();
    ingredients();
  }, []);

  const context = {
    cocktailsCategories,
    cocktailsIngredients,
    cocktailsRecipes,
    isFetching,
    setFilterHeader,
    filterHeader,
  };

  return (
    <CocktailsContext.Provider value={ context }>
      {children}
    </CocktailsContext.Provider>
  );
}

CocktailsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CocktailsProvider;
