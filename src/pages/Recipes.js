import React, { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';
import Header from '../components/Header/Header';
import FoodCard from '../components/FoodCard';

function Recipes() {
  const { recipes } = useContext(RecipesContext);
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
    </div>
  );
}
export default Recipes;
