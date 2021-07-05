import React from 'react';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import RecipeList from '../../components/RecipeList';

function MainDrinks() {
  return (
    <div>
      <Header title="Bebidas" display="true" />
      <RecipeList />
      <Footer />
    </div>
  );
}

export default MainDrinks;
