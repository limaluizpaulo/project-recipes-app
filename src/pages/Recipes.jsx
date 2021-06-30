import React, { useEffect, useState } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { fetchMealsByName, fetchCategoryMeals } from '../services/mealsApi';
import { fetchDrinkByName, fetchCategoryDrinks } from '../services/drinksApi';
import { useMealsContext } from '../context/mealsContext';
import { useDrinksContext } from '../context/drinksContext';
import BtnsCategory from '../components/BtnsCategory';
import CardRecipe from '../components/CardRecipe';

export default function Recipes() {
  const { pathname } = useHistory().location;
  const { mealsFiltered, setMealsFiltered,
    filtersBtnsMeals, setFiltersBtnsMeals } = useMealsContext();
  const { drinksFiltered, setDrinksFiltered,
    filtersBtnsDrinks, setFiltersBtnsDrinks } = useDrinksContext();
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
  }, [pathname, setMealsFiltered, setFiltersBtnsMeals, setDrinksFiltered]);

  useEffect(() => {
    const FIVE = 5;
    if (title === 'Comidas') {
      fetchCategoryMeals().then((res) => setFiltersBtnsMeals(res.slice(0, FIVE)));
    }
    if (title === 'Bebidas') {
      fetchCategoryDrinks().then((res) => setFiltersBtnsDrinks(res.slice(0, FIVE)));
    }
  }, [setFiltersBtnsDrinks, setFiltersBtnsMeals, title]);

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
