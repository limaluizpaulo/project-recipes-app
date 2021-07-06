import React from 'react';
import MealsByIngredient from '../components/MealsByIngredients';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function ComidasArea() {
  return (
    <main>
      <Header />
      <MealsByIngredient />
      <Footer />
    </main>
  );
}
