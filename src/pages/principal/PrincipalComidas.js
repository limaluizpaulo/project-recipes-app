import React from 'react';
import Header from '../../components/Header';
import MealsList from '../../components/MealsList';
import Footer from '../../components/Footer';
import Categories from '../../components/CategoryButtons';

function PrincipalComidas() {
  return (
    <div>
      <Header title="Comidas" />
      <Categories />
      <MealsList />
      <Footer />
    </div>
  );
}

export default PrincipalComidas;
