import React, { useState, useEffect } from 'react';
import '../styles/global.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

function FoodRecipes() {
  // const [Meals, setMeals] = useState([]);
  const [firstMeals, setFirstMeals] = useState([]);
  // const [categories, setCategories] = useState([]);
  const [firstCategories, setFirstCategories] = useState([]);
  const numOfMeals = 12;
  const numOfCategories = 5;

  useEffect(() => {
    const fetchMeals = async () => {
      const request = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const { meals } = await request.json();
      // setMeals(meals);
      setFirstMeals(meals.slice(0, numOfMeals));
    };
    fetchMeals();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      const request = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
      const { meals } = await request.json();
      // setCategories(meals);
      setFirstCategories(meals.slice(0, numOfCategories));
    };
    fetchCategories();
  }, []);

  return (
    <div>
      <Header title="Comidas" />
      <div className="btn-container">
        {firstCategories.map((category, index) => (
          <button
            className="category-btn"
            data-testid={ `${category}-category-filter` }
            key={ index }
            type="button"
          >
            { category.strCategory }
          </button>
        ))}
      </div>
      <div className="card-container">
        {firstMeals.map((meal, index) => (
          <div
            data-testid={ `${index}-recipe-card` }
            className="card"
            key={ meal.strMeal }
          >
            <img
              data-testid={ `${index}-card-img` }
              src={ meal.strMealThumb }
              alt={ meal.strMeal }
            />
            <p data-testid={ `${index}-card-name` }>{meal.strMeal}</p>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default FoodRecipes;
