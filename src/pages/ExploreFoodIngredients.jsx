import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { fetchIngredientsRecipes } from '../services/RecipesServices';
import RecipesContext from '../context/RecipesContext';
import IngredientCard from '../components/IngredientCard';

import '../styles/ExploreRecipesIngredients.css';

function ExploreFoodIngredients() {
  const { setIngredients, ingredients } = useContext(RecipesContext);

  useEffect(() => {
    async function getIngredients() {
      const ingredientsItens = await fetchIngredientsRecipes();
      const NUMBER_INGREDIENTS = 12;
      const twelveIngredients = ingredientsItens.meals.slice(0, NUMBER_INGREDIENTS);

      const filterIngredients = twelveIngredients
        .map((ingredient) => ingredient.strIngredient);
      setIngredients(filterIngredients);
    }

    getIngredients();
  }, [setIngredients]);

  return (
    <section className="explore-section-ingredients">
      <Header profile name="Explorar Ingredientes" />
      <section className="cards-field-ingredients">
        {
          ingredients.map((ingredient, index) => (<IngredientCard
            key={ index }
            index={ index }
            ingredient={ ingredient }
          />))
        }
      </section>
      <Footer />
    </section>
  );
}

export default ExploreFoodIngredients;
