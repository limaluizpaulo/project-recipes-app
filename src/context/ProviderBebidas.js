import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ContextBebidas from './ContextBebidas';
import { fetchCocktailsApi, fetchCocktailRecomendation } from '../apis/CocktailsApis';

export default function ProviderBebidas({ children }) {
  const [openSearchBarCocktail, setOpenSearchBar] = useState(false);
  const [cocktailsRecipes, setCocktailsRecipes] = useState([]);

  const handleSearchBarCocktail = () => {
    setOpenSearchBar(!openSearchBarCocktail);
  };

  const findByFilterCocktails = async (filter) => {
    const apiCocktails = await fetchCocktailsApi(filter);
    setCocktailsRecipes(apiCocktails);
  };

  const resquestApi = async () => {
    const apiCocktails = await fetchCocktailRecomendation();
    setCocktailsRecipes(apiCocktails);
  };

  useEffect(() => {
    resquestApi();
  }, []);

  const context = {
    openSearchBarCocktail,
    handleSearchBarCocktail,
    cocktailsRecipes,
    findByFilterCocktails,
  };
  return (
    <ContextBebidas.Provider value={ context }>
      {children}
    </ContextBebidas.Provider>
  );
}

ProviderBebidas.propTypes = {
  children: PropTypes.node.isRequired,
};
