import React, { useState, useEffect, useContext } from 'react';
import '../styles/global.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Context } from '../context/ContextForm';

function DrinkRecipes() {
  const { setFirstDrinks, firstDrinks } = useContext(Context);
  const [firstCategories, setFirstCategories] = useState([]);
  const numOfDrinks = 12;
  const numOfCategories = 5;

  useEffect(() => {
    const fetchDrinks = async () => {
      const request = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      const { drinks } = await request.json();
      setFirstDrinks(drinks.slice(0, numOfDrinks));
    };
    fetchDrinks();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      const request = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      const { drinks } = await request.json();
      setFirstCategories(drinks.slice(0, numOfCategories));
    };
    fetchCategories();
  }, []);

  return (
    <div>
      <Header title="Bebidas" />
      <div className="btn-container">
        {firstCategories.map((category, index) => (
          <button
            className="category-btn"
            data-testid={ `${category.strCategory}-category-filter` }
            key={ index }
            type="button"
          >
            { category.strCategory }
          </button>
        ))}
      </div>
      <div className="card-container">
        {firstDrinks.map((drink, index) => (
          <div
            data-testid={ `${index}-recipe-card` }
            className="card"
            key={ drink.strDrink }
          >
            <img
              data-testid={ `${index}-card-img` }
              src={ drink.strDrinkThumb }
              alt={ drink.strDrink }
            />
            <p data-testid={ `${index}-card-name` }>{drink.strDrink}</p>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default DrinkRecipes;
