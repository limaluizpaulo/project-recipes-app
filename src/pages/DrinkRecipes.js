import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import '../styles/global.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Context } from '../context/ContextForm';
import { searchByCategoryDrink } from '../services/searchApi';
import { requestDrink } from '../services/api';

function DrinkRecipes() {
  const { setFirstDrinks, firstDrinks } = useContext(Context);
  const [firstCategories, setFirstCategories] = useState([]);
  const numOfDrinks = 12;
  const numOfCategories = 5;

  useEffect(() => {
    const fetchDrinks = async () => {
      const drinks = await requestDrink();
      setFirstDrinks(drinks.slice(0, numOfDrinks));
    };
    fetchDrinks();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      const request = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
      const { drinks } = await request.json();
      setFirstCategories(drinks.slice(0, numOfCategories));
    };
    fetchCategories();
  }, []);

  async function handleClick({ target }) {
    if (target.innerText === 'All' || target.className === 'category-btn-dbl') {
      target.className = 'category-btn';
      const drinks = await requestDrink();
      return setFirstDrinks(drinks.slice(0, numOfDrinks));
    }
    target.className = 'category-btn-dbl';
    const { drinks } = await searchByCategoryDrink(target.innerText);
    setFirstDrinks(drinks.splice(0, numOfDrinks));
  }

  return (
    <div>
      <Header title="Bebidas" />
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
            data-testid={ `${category.strCategory}-category-filter` }
            onClick={ handleClick }
            key={ index }
            type="button"
          >
            { category.strCategory }
          </button>
        ))}
      </div>
      <div className="card-container">
        {firstDrinks.map((drink, index) => (
          <Link to={ `/bebidas/${drink.idDrink}` } key={ drink.strDrink }>
            <div
              data-testid={ `${index}-recipe-card` }
              className="card"
            >
              <img
                data-testid={ `${index}-card-img` }
                src={ drink.strDrinkThumb }
                alt={ drink.strDrink }
              />
              <p data-testid={ `${index}-card-name` }>{drink.strDrink}</p>
            </div>
          </Link>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default DrinkRecipes;
