import React, { useEffect, useState } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { fetchCategoryMeals } from '../services/mealsApi';
import { fetchCategoryDrinks } from '../services/drinksApi';
import { useMealsContext } from '../context/mealsContext';
import { useDrinksContext } from '../context/drinksContext';
import BtnsCategory from '../components/BtnsCategory';
import CardRecipe from '../components/CardRecipe';

export default function Recipes() {
  const [title, setTitle] = useState('');
  const { pathname } = useHistory().location;

  const { mealsFiltered, filtersBtnsMeals, setFiltersBtnsMeals } = useMealsContext();
  const { drinksFiltered,
    filtersBtnsDrinks, setFiltersBtnsDrinks } = useDrinksContext();

  useEffect(() => {
    const all = { strCategory: 'All' };
    const FIVE = 5;
    if (pathname.includes('comidas')) {
      setTitle('Comidas');
      fetchCategoryMeals()
        .then((res) => setFiltersBtnsMeals([...res.slice(0, FIVE), all]));
    }
    if (pathname.includes('bebidas')) {
      setTitle('Bebidas');
      fetchCategoryDrinks()
        .then((res) => setFiltersBtnsDrinks([...res.slice(0, FIVE), all]));
    }
  }, [setFiltersBtnsDrinks, setFiltersBtnsMeals, pathname, title]);

  if (mealsFiltered.length === 1 && mealsFiltered[0].idMeal !== '52968') {
    return <Redirect to={ `/comidas/${mealsFiltered[0].idMeal}` } />;
  } if (drinksFiltered.length === 1) {
    return <Redirect to={ `/bebidas/${drinksFiltered[0].idDrink}` } />;
  }

  return (
    <div>
      <Header title={ title } search />
      <div className="filters-btns">
        {(title === 'Comidas' ? filtersBtnsMeals : filtersBtnsDrinks)
          .map((label, index) => (<BtnsCategory
            key={ index }
            label={ label }
            title={ title }
          />))}
      </div>
      <div className="recipe-container">
        {(title === 'Comidas' ? mealsFiltered : drinksFiltered).map((
          data, index,
        ) => <CardRecipe key={ index } data={ data } index={ index } />)}
      </div>
      <Footer />
    </div>
  );
}
