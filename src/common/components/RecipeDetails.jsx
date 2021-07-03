import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import store from '../../context/store';

export default function RecipeDetails() {
  const { recipes: { foods, recipeDetail } } = useContext(store);

  return (
    <Link
      to={ (foods) ? (
        `/comidas/${recipeDetail.idMeal}/in-progress`) : (
        `/bebidas/${recipeDetail.idDrink}/in-progress`) }
    >
      <button
        type="button"
      >
        Iniciar Receita
      </button>
    </Link>
  );
}
