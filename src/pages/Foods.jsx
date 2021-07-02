import React from 'react';
import Header from '../components/Header';
import HeaderSearchButton from '../components/HeaderSearchButton';
import Footer from '../components/Footer';

function Foods() {
  return (
    <>
      <div>Tela de Comidas</div>
      <Header title="Comidas" />
      <HeaderSearchButton baseEndPoint="https://www.themealdb.com/api/json/v1/1/" />
      <Footer />
    </>
  );
}

export default Foods;
