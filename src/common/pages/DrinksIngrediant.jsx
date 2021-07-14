import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CardDrinksIgredients from '../components/CardDrinksIgredients';

export default function DrinksIngrediant() {
  return (
    <div>
      <Header pageName="Explorar Ingredientes" />
      <CardDrinksIgredients />
      <Footer />
    </div>
  );
}
