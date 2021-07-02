import React, { useContext } from 'react';
import Context from '../context/Context';
import Footer from '../components/Footer';
import Header from '../components/Header';
import HeaderSearchButton from '../components/HeaderSearchButton';

function Drinks() {
  const { manageRenderDrink } = useContext(Context);
  return (
    <>
      <div>Tela de Bebidas</div>
      <Header title="Bebidas" />
      <HeaderSearchButton baseEndPoint="https://www.thecocktaildb.com/api/json/v1/1/" />
      {manageRenderDrink()}
      <Footer />
    </>
  );
}

export default Drinks;
