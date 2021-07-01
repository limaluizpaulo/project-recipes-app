import React, { useContext } from 'react';
import MainCards from '../components/MainCards';
import MealsContext from '../contexts/MealsContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Comidas() {
  const { mealsRecipes, isFetching } = useContext(MealsContext);
  return isFetching ? <p>Loading...</p> : (
    <>
      <Header context={ MealsContext } title="Comidas" searchBar />
      <MainCards
        data={ mealsRecipes }
        thumbnail="strMealThumb"
        title="strMeal"
        searchBar
      />
      <Footer />
    </>
  );
}
