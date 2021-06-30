import React, { useContext } from 'react';
import MainCards from '../components/MainCards';
import MealsContext from '../contexts/MealsContext';

export default function Comidas() {
  const { mealsRecipes, isFetching } = useContext(MealsContext);
  return isFetching ? <p>Loading...</p> : (
    <MainCards title="Comidas" data={ mealsRecipes } searchBar />
  );
}
