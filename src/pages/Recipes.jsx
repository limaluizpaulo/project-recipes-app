import React, { useEffect, useState } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { fetchMealsByName } from '../services/mealsApi';
import { fetchDrinkByName } from '../services/drinksApi';
import { useMealsContext } from '../context/mealsContext';
import { useDrinksContext } from '../context/drinksContext';
import CardRecipe from '../components/CardRecipe';

export default function Recipes() {
  const { pathname } = useHistory().location;
  const { mealsFiltered, setMealsFiltered } = useMealsContext();
  const { drinksFiltered, setDrinksFiltered } = useDrinksContext();
  const [title, setTitle] = useState('');
  const TWELVE = 12;
 
  useEffect(() => {
    if (pathname.includes('comidas')) {
      setTitle('Comidas');
      fetchMealsByName().then((data) => setMealsFiltered(data.slice(0, TWELVE)));
    }
    if (pathname.includes('bebidas')) {
      setTitle('Bebidas');
      fetchDrinkByName().then((data) => setDrinksFiltered(data.slice(0, TWELVE)));
    }
  }, [pathname]);

  if (mealsFiltered.length === 1) {
    return <Redirect to={ `/comidas/${mealsFiltered[0].idMeal}` } />;
  } if (drinksFiltered.length === 1) {
    return <Redirect to={ `/bebidas/${drinksFiltered[0].idDrink}` } />;
  }

  return (
    <div>
      <Header title={ title } search />
      {(title === 'Comidas' ? mealsFiltered : drinksFiltered).map((
        data, index,
      ) => <CardRecipe key={ index } data={ data } index={ index } />)}
      <Footer />
      <h1>receita</h1>
    </div>
  );
}
