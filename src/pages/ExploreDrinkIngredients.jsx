import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { fetchIngredientsDrinks } from '../services/DrinksServices';
import DrinksContext from '../context/DrinksContext';
import IngredientCard from '../components/IngredientCard';

import '../styles/ExploreRecipesIngredients.css';

function ExploreDrinkIngredients() {
  const { setIngredients, ingredients } = useContext(DrinksContext);

  useEffect(() => {
    async function getIngredients() {
      const ingredientsItens = await fetchIngredientsDrinks();
      const NUMBER_INGREDIENTS = 12;
      const twelveIngredients = ingredientsItens.drinks.slice(0, NUMBER_INGREDIENTS);
      const filterIngredients = twelveIngredients
        .map((ingredient) => ingredient.strIngredient1);
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

export default ExploreDrinkIngredients;
