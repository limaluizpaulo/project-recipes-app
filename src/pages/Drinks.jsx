import React from 'react';
import Header from '../components/Header';
import HeaderSearchButton from '../components/HeaderSearchButton';
import Footer from '../components/Footer';
import { drinks } from '../mocks/drinks';
import RecipeCard from '../components/RecipeCard';

function Drinks() {
  const maxLength = 12;
  const drinkList = () => drinks.slice(0, maxLength).map((drink, index) => (
    RecipeCard(drink, index)));
  return (
    <>
      <div>Tela de Bebidas</div>
      <Header title="Bebidas" />
      <HeaderSearchButton />
      <div className="recipe-list">
        {drinkList()}
      </div>
      <Footer />
    </>
  );
}

export default Drinks;
