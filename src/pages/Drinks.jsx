import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import HeaderSearchButton from '../components/HeaderSearchButton';

function Drinks() {
  return (
    <>
      <div>Tela de Bebidas</div>
      <Header title="Bebidas" />
      <HeaderSearchButton baseEndPoint="https://www.thecocktaildb.com/api/json/v1/1/" />
      <Footer />
    </>
  );
}

export default Drinks;
