import React from 'react';
import Header from '../components/Header';
import HeaderSearchButton from '../components/HeaderSearchButton';
import Footer from '../components/Footer';
import { drinks } from '../mocks/drinks';
import drinkCategories from '../mocks/drinkCategories';
import RecipeCard from '../components/RecipeCard';
import CategoryBtn from '../components/CategoryBtn';

function Drinks() {
  const maxRecipe = 12;
  const maxCategory = 5;
  const drinkList = () => drinks.slice(0, maxRecipe).map((drink, index) => (
    RecipeCard(drink, index)));
  const categoryList = () => drinkCategories.drinks.slice(0, maxCategory)
    .map(({ strCategory }) => (
      CategoryBtn(strCategory)));
  return (
    <>
      <div>Tela de Bebidas</div>
      <Header title="Bebidas" />
      <HeaderSearchButton />
      <div>
        {categoryList()}
      </div>
      <div className="recipe-list">
        {drinkList()}
      </div>
      <Footer />
    </>
  );
}

export default Drinks;
