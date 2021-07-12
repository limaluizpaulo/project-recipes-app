import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function ExploreFoods() {
  const exploreObj = {
    "by-ingredient": "Por Ingredientes",
    "by-area": "Por Local de Origem",
    surprise: "Me Surpreenda!",
  };
  const exploreBtn = (term, word) => (
    <button type="button" data-testid={`explore-${term}`}>{word}</button>
  )
  return (
    <>
      <div>Tela de explorar comidas</div>
      <Header title="Explorar Comidas" />
      {Object.entries(exploreObj).map((key) => (
        exploreBtn(key[0], key[0])
      ))}
      <Footer />
    </>
  );
}

export default ExploreFoods;
