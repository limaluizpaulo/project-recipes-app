import React, { useContext } from 'react';
import MainCards from '../components/MainCards';
import CocktailsContext from '../contexts/CocktailsContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Comidas() {
  const { cocktailsRecipes, isFetching } = useContext(CocktailsContext);
  return isFetching ? <p>Loading...</p> : (
    <>
      <Header context={ CocktailsContext } title="Bebidas" searchBar />
      <MainCards
        data={ cocktailsRecipes }
        thumbnail="strDrinkThumb"
        title="strDrink"
        searchBar
      />
      <Footer />
    </>
  );
}
