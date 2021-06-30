import React, { useState, useEffect } from 'react';
import '../styles/global.css';

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
      <div className="btn-container">
        {firstCategories.map((category, index) => (
          <button
            className="category-btn"
            key={ index }
            type="button"
          >
            { category.strCategory }
          </button>
        ))}
      </div>
      <div className="card-container">
        {firstMeals.map((meal) => (
          <div className="card" key={ meal.strMeal }>
            <img src={ meal.strMealThumb } alt={ meal.strMeal } />
            <p>{meal.strMeal}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FoodRecipes;
