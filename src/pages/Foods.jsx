import React from 'react';
import Header from '../components/Header';
import HeaderSearchButton from '../components/HeaderSearchButton';
import Footer from '../components/Footer';
import { meals } from '../mocks/meals';
import mealCategories from '../mocks/mealCategories';
import RecipeCard from '../components/RecipeCard';
import CategoryBtn from '../components/CategoryBtn';

function Foods() {
  const maxRecipe = 12;
  const maxCategory = 5;
  const foodList = () => meals.slice(0, maxRecipe).map((meal, index) => (
    RecipeCard(meal, index)));
  const categoryList = () => mealCategories.meals.slice(0, maxCategory)
    .map(({ strCategory }) => (
      CategoryBtn(strCategory)));

  return (
    <>
      <div>Tela de Comidas</div>
      <Header title="Comidas" />
      <HeaderSearchButton />
      <div>
        {categoryList()}
      </div>
      <div className="recipe-list">
        {foodList()}
      </div>
      <Footer />
    </>
  );
}

export default Foods;
