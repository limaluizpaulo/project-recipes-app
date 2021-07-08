import React, { useContext } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { GlobalContext } from '../context/Provider';
import IngredientsCard from '../components/IngredientCard';

const SearchDrinksIng = () => {
  const magic = 12;
  const { ingDrinks } = useContext(GlobalContext);
  const ingredients = ingDrinks.slice(0, magic);
  return (
    <div>
      <Header title="Explorar Ingredientes" />
      <IngredientsCard ingredients={ ingredients } />
      <Footer />
    </div>
  );
};

export default SearchDrinksIng;
