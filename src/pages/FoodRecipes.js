import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import '../styles/global.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Context } from '../context/ContextForm';
import { searchByCategoryFood } from '../services/searchApi';

function FoodRecipes() {
  const { setFirstMeals, firstMeals } = useContext(Context);
  const [firstCategories, setFirstCategories] = useState([]);
  const numOfMeals = 12;
  const numOfCategories = 5;

  useEffect(() => {
    const fetchMeals = async () => {
      const request = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const { meals } = await request.json();
      setFirstMeals(meals.slice(0, numOfMeals));
    };
    fetchMeals();
  }, [setFirstMeals]);

  useEffect(() => {
    const fetchCategories = async () => {
      const request = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
      const { meals } = await request.json();
      setFirstCategories(meals.slice(0, numOfCategories));
    };
    fetchCategories();
  }, []);

  async function handleClick({ target }) {
    if (target.innerText === 'All' || target.className === 'category-btn-dbl') {
      target.className = 'category-btn';
      const request = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const { meals } = await request.json();
      return setFirstMeals(meals.slice(0, numOfMeals));
    }
    target.className = 'category-btn-dbl';
    const { meals } = await searchByCategoryFood(target.innerText);
    setFirstMeals(meals.splice(0, numOfMeals));
  }

  return (
    <div>
      <Header title="Comidas" />
      <div className="btn-container">
        <button
          className="category-btn"
          data-testid="All-category-filter"
          onClick={ handleClick }
          type="button"
        >
          All
        </button>
        {firstCategories.map((category, index) => (
          <button
            className="category-btn"
            onClick={ handleClick }
            data-testid={ `${category.strCategory}-category-filter` }
            key={ index }
            type="button"
          >
            { category.strCategory }
          </button>
        ))}
      </div>
      <div className="card-container">
        {firstMeals.map((meal, index) => (
          <Link to={ `/comidas/${meal.idMeal}` } key={ meal.strMeal }>
            <div
              data-testid={ `${index}-recipe-card` }
              className="card"
            >
              <img
                data-testid={ `${index}-card-img` }
                src={ meal.strMealThumb }
                alt={ meal.strMeal }
              />
              <p data-testid={ `${index}-card-name` }>{meal.strMeal}</p>
            </div>
          </Link>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default FoodRecipes;
