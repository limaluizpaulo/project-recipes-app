import React, { useContext } from 'react';
import CardsDeReceitas from '../components/CardsDeReceitas';
import Footer from '../components/Footer';
import Header from '../components/Header';
import AppReceitasContext from '../context/AppReceitasContext';

const MAX = 12;

export default function Bebidas() {
  const { fetchAPI } = useContext(AppReceitasContext);
  const { drinks } = fetchAPI;

  return (
    <section>
      <Header />
      {drinks && <CardsDeReceitas receitas={ drinks.slice(0, MAX) } />}
      <Footer />
    </section>
  );
}
