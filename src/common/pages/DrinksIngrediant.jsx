import React from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import CardDrinksIgredients from '../components/CardDrinksIgredients';

export default function DrinksIngrediant() {
  return (
    <div>
      <Header pageName="Explorar Bebidas To Ingredients " />
      <CardDrinksIgredients />
      <Footer />
    </div>
  );
}
