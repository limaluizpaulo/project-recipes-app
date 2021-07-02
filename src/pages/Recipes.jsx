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
import useMealsAndDrinks from '../hooks/useMealsAndDrinks';

// const meals = (filterMeals, setMeals, setTitle) => {
//   const TWELVE = 12;
//   setTitle('Comidas');
//   if (filterMeals) {
//     fetchMealsByIngre(filterMeals).then((data) => setMeals(data.slice(0, TWELVE)));
//   } else {
//     fetchMealsByName().then((data) => setMeals(data.slice(0, TWELVE)));
//   }
// };

// const drinks = (filterDrinks, setDrinks, setTitle) => {
//   const TWELVE = 12;
//   setTitle('Bebidas');
//   if (filterDrinks) {
//     fetchDrinksByIngre(filterDrinks).then((data) => setDrinks(data.slice(0, TWELVE)));
//   } else {
//     fetchDrinkByName().then((data) => setDrinks(data.slice(0, TWELVE)));
//   }
// };

export default function Recipes() {
  const { pathname } = useHistory().location;
  const { meals, drinks } = useMealsAndDrinks();
  const { mealsFiltered, setMealsFiltered,
    filtersBtnsMeals, setFiltersBtnsMeals, filterMealsByIngre } = useMealsContext();
  const { drinksFiltered, setDrinksFiltered,
    filtersBtnsDrinks, setFiltersBtnsDrinks, filterDrinksByIngre } = useDrinksContext();
  const [title, setTitle] = useState('');
  useEffect(() => {
    if (pathname.includes('comidas')) {
      meals(filterMealsByIngre, setMealsFiltered, setTitle);
    }
    if (pathname.includes('bebidas')) {
      drinks(filterDrinksByIngre, setDrinksFiltered, setTitle);
    }

    //   if (filterMealsByIngre) {
    //     fetchMealsByIngre(filterMealsByIngre).then((data) => setMealsFiltered(data.slice(0, TWELVE)));
    //   } else {
    //     fetchMealsByName().then((data) => setMealsFiltered(data.slice(0, TWELVE)));
    //   }
    // }
    // if (pathname.includes('bebidas')) {
    //   setTitle('Bebidas');
    //   fetchDrinkByName().then((data) => setDrinksFiltered(data.slice(0, TWELVE)));
    // }
  }, [
    pathname,
    meals,
    filterMealsByIngre,
    setMealsFiltered,
    drinks, filterDrinksByIngre,
    setDrinksFiltered]);
  // [pathname, setMealsFiltered, setFiltersBtnsMeals, setDrinksFiltered, filterMealsByIngre]

  useEffect(() => {
    const all = { strCategory: 'All' };
    const FIVE = 5;
    if (title === 'Comidas') {
      fetchCategoryMeals()
        .then((res) => setFiltersBtnsMeals([...res.slice(0, FIVE), all]));
    }
    if (title === 'Bebidas') {
      fetchCategoryDrinks()
        .then((res) => setFiltersBtnsDrinks([...res.slice(0, FIVE), all]));
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
