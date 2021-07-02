import React from 'react';
import Header from '../components/Header';
import HeaderSearchButton from '../components/HeaderSearchButton';
import Footer from '../components/Footer';

function ExploreFoodsArea() {
  return (
    <>
      <div>Tela de explorar comidas area</div>
      <Header title="Explorar Origem" />
      <HeaderSearchButton baseEndPoint="https://www.themealdb.com/api/json/v1/1/" />
      <Footer />
    </>
  );
}

export default ExploreFoodsArea;
