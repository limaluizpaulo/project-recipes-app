import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import '../styles/global.css';
import { Card } from 'react-bootstrap';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Context } from '../context/ContextForm';
import { searchByCategoryDrink } from '../services/searchApi';
import { requestDrink } from '../services/api';

function DrinkRecipes() {
  const { setFirstDrinks,
    firstDrinks,
    drinkPerIngredient,
    setDrinkPerIngredient,
    changeDrink } = useContext(Context);
  const [firstCategories, setFirstCategories] = useState([]);
  const numOfDrinks = 12;
  const numOfCategories = 5;
  const btnClass = 'category-btn-dbl';

  useEffect(() => {
    const fetchDrinks = async () => {
      const drinks = await requestDrink();
      setFirstDrinks(drinks.slice(0, numOfDrinks));
    };
    fetchDrinks();
  }, [setFirstDrinks]);

  useEffect(() => {
    const fetchCategories = async () => {
      const request = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
      const { drinks } = await request.json();
      setFirstCategories(drinks.slice(0, numOfCategories));
    };
    fetchCategories();
  }, []);

  async function handleClick({ target }) {
    if (target.innerText === 'All' || target.className === btnClass) {
      target.className = 'category-btn';
      const drinks = await requestDrink();
      return setFirstDrinks(drinks.slice(0, numOfDrinks));
    }
    target.className = btnClass;
    const { drinks } = await searchByCategoryDrink(target.innerText);
    setFirstDrinks(drinks.splice(0, numOfDrinks));
  }

  async function handleClick1({ target }) {
    if (target.innerText === 'All' || target.className === btnClass) {
      target.className = 'category-btn';
      const drinks = await requestDrink();
      return setDrinkPerIngredient(drinks.slice(0, numOfDrinks));
    }
    target.className = btnClass;
    const { drinks } = await searchByCategoryDrink(target.innerText);
    setDrinkPerIngredient(drinks.splice(0, numOfDrinks));
  }

  return (
    <div>
      <Header title="Bebidas" />
      <div className="btn-container">
        <button
          className="category-btn"
          data-testid="All-category-filter"
          onClick={ changeDrink ? handleClick1 : handleClick }
          type="button"
        >
          All
        </button>
        {firstCategories.map((category, index) => (
          <button
            className="category-btn"
            data-testid={ `${category.strCategory}-category-filter` }
            onClick={ changeDrink ? handleClick1 : handleClick }
            key={ index }
            type="button"
          >
            { category.strCategory }
          </button>
        ))}
      </div>
      <div className="card-container">
        {(changeDrink ? drinkPerIngredient : firstDrinks).map((drink, index) => (
          <Link to={ `/bebidas/${drink.idDrink}` } key={ drink.strDrink }>
            <Card
              data-testid={ `${index}-recipe-card` }
              className="card"
            >
              <Card.Img
                data-testid={ `${index}-card-img` }
                src={ drink.strDrinkThumb }
                alt={ drink.strDrink }
              />
              <Card.Body>
                <Card.Title
                  className="cardTitle"
                  data-testid={ `${index}-card-name` }
                >
                  {drink.strDrink}
                </Card.Title>
              </Card.Body>
            </Card>
          </Link>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default DrinkRecipes;
