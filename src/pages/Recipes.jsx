import React, { useEffect, useState } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { useMealsContext } from '../context/mealsContext';
import { useDrinksContext } from '../context/drinksContext';

export default function Recipes() {
  const { pathname } = useHistory().location;
  const [title, setTitle] = useState('');
  const { drinksFiltered } = useDrinksContext();
  const { mealsFiltered } = useMealsContext();

  useEffect(() => {
    if (pathname.includes('comidas')) setTitle('Comidas');
    if (pathname.includes('bebidas')) setTitle('Bebidas');
  }, [pathname]);

  if (mealsFiltered.length === 1) {
    return <Redirect to={ `/comidas/${mealsFiltered[0].idMeal}` } />;
  } if (drinksFiltered.length === 1) {
    return <Redirect to={ `/bebidas/${drinksFiltered[0].idDrink}` } />;
  }

  return (
    <div>
      <Header title={ title } search />
      <Footer />
      <h1>receita</h1>
    </div>
  );
}
