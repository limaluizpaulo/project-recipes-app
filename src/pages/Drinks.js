import React, { useContext } from 'react';
import Header from '../components/Header';
import { GlobalContext } from '../context/Provider';
import Footer from '../components/Footer';
import Categories from '../components/Categories';
import { renderCard } from '../utils';

const Drinks = () => {
  const { drinks: defaultDrinks, recipes: { drinks = [] } } = useContext(GlobalContext);

  return (
    <div>
      <Header title="Bebidas" search />
      <Categories />
      <div className="grade">
        {renderCard(drinks, defaultDrinks)}
      </div>
      <Footer />
    </div>
  );
};

export default Drinks;
