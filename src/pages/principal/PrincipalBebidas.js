import React from 'react';
import Header from '../../components/Header';
import DrinksList from '../../components/DrinksList';
import Footer from '../../components/Footer';
import Categories from '../../components/CategoryButtons';

function PrincipalBebidas() {
  return (
    <div>
      <Header title="Bebidas" />
      <Categories />
      <DrinksList />
      <Footer />
    </div>
  );
}

export default PrincipalBebidas;
