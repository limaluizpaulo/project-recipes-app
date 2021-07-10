import React from 'react';
import FilterDoneRecipes from '../components/FilterDoneRecipes';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function ReceitasFeitas() {
  return (
    <main>
      <Header />
      <FilterDoneRecipes />
      <Footer />
    </main>
  );
}
