import React, { useContext } from 'react';
import Footer from '../components/Footer';

import Header from '../components/Header';
import FoodCard from '../components/FoodCard';
import RecipesContext from '../context/RecipesContext';

function FoodList() {
  const { recipes } = useContext(RecipesContext);
  // const recipeMeals = recipes.meals;
  const cardMaximun = 12;
  return (
    <div>
      <Header title="Comidas" search="" />
      {
        recipes
          && recipes.map((recipe, i) => (
            i < cardMaximun
             && <FoodCard key={ i } order={ i } recipes={ recipe } />
          ))
      }
      <Footer />
    </div>
  );
}

export default FoodList;
