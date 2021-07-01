import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import DrinksContext from '../context/DrinksContext';
import FilteredList from '../components/FilteredList';

function Drinks() {
  const { drinksFilter: { filteredDrinks } } = useContext(DrinksContext);
  const history = useHistory();

  useEffect(() => {
    if (filteredDrinks && filteredDrinks.length === 1) {
      history.push(`/bebidas/${filteredDrinks[0].idDrink}`);
    }
  }, [filteredDrinks, history]);

  return (
    <>
      <h1>Bebidas</h1>
      <SearchBar />
      <FilteredList filteredDrinks={ filteredDrinks } />
    </>
  );
}

export default Drinks;
