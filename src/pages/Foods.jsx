import React from 'react';
import Header from '../components/Header';
import HeaderSearchButton from '../components/HeaderSearchButton';
import Footer from '../components/Footer';
import { meals } from '../mocks/meals';
import RecipeCard from '../components/RecipeCard';

function Foods() {
  const maxLength = 12;
  const foodList = () => meals.slice(0, maxLength).map((meal, index) => (
    RecipeCard(meal, index)));
  return (
    <>
      <div>Tela de Comidas</div>
      <Header title="Comidas" />
      <HeaderSearchButton />
      <div className="recipe-list">
        {foodList()}
      </div>
      <Footer />
    </>
  );
}

export default Foods;
