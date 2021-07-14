import React from 'react';
import CardMealsIgredients from '../components/CardMealsIgredients';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function MealsIngredient() {
  return (
    <div>
      <Header pageName="Explorar meals To Ingredients " />
      <CardMealsIgredients />
      <Footer />
    </div>
  );
}
