import React from 'react';
import Header from '../../components/Header';
import MealsList from '../../components/MealsList';
import Footer from '../../components/Footer';

function PrincipalComidas() {
  return (
    <div>
      <Header title="Comidas" />
      <MealsList />
      <Footer />
    </div>
  );
}

export default PrincipalComidas;
