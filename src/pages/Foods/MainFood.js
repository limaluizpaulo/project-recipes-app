import React from 'react';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import RecipeList from '../../components/RecipeList';

export default function MainFood() {
  return (
    <div
      className="main-food-class"
    >
      <Header title="Comidas" display="true" />
      <RecipeList />
      <Footer />
    </div>
  );
}
