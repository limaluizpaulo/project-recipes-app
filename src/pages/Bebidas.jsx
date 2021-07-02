import React, { useContext } from 'react';
import CardsDeReceitas from '../components/CardsDeReceitas';
import Footer from '../components/Footer';
import Header from '../components/Header';
import AppReceitasContext from '../context/AppReceitasContext';

const MAX = 12;

export default function Bebidas() {
  const { fetchAPI } = useContext(AppReceitasContext);
  const { drinks } = fetchAPI;
  const notFoundRecipeAlert = (functionAlert) => {
    functionAlert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
  };
  return (
    <section>
      <Header />
      {drinks !== undefined && ((drinks === null) ? notFoundRecipeAlert(alert)
        : <CardsDeReceitas receitas={ drinks.slice(0, MAX) } />)}
      <Footer />
    </section>
  );
}
