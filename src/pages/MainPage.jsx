import React from 'react';
import { useLocation } from 'react-router-dom';

import Footer from '../components/Footer';
import Header from '../components/Header';
import CardMeal from '../components/CardMeal';
import CardDrink from '../components/CardDrink';

function MainPage() {
  const { pathname } = useLocation();
  return (
    <div>
      <Header />
      {(pathname === '/bebidas') ? <CardDrink /> : <CardMeal /> }
      <Footer />
    </div>
  );
}

export default MainPage;
