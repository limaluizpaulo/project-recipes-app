import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import '../styles/DrinkAndFoodRecipes(page).css';
import { Card } from 'react-bootstrap';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Context } from '../context/ContextForm';
import Loading from '../components/Loading';
import { searchByCategoryDrink } from '../services/searchApi';
import { requestDrink } from '../services/api';

function DrinkRecipes() {
  const { setFirstDrinks,
    firstDrinks,
    drinkPerIngredient,
    setDrinkPerIngredient,
    changeDrink } = useContext(Context);
  const [firstCategories, setFirstCategories] = useState([]);
  const [loading, setLoading] = useState(null);
  const numOfDrinks = 12;
  const numOfCategories = 5;
  const btnClass = 'recipes-categoryBtnAlternative';

  useEffect(() => {
    setLoading(true);
    const fetchDrinks = async () => {
      const drinks = await requestDrink();
      setFirstDrinks(drinks.slice(0, numOfDrinks));
      setLoading(false);
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
      target.className = 'recipes-categoryBtn';
      const drinks = await requestDrink();
      return setFirstDrinks(drinks.slice(0, numOfDrinks));
    }
    target.className = btnClass;
    const { drinks } = await searchByCategoryDrink(target.innerText);
    setFirstDrinks(drinks.splice(0, numOfDrinks));
  }

  async function handleClick1({ target }) {
    if (target.innerText === 'All' || target.className === btnClass) {
      target.className = 'recipes-categoryBtn';
      const drinks = await requestDrink();
      return setDrinkPerIngredient(drinks.slice(0, numOfDrinks));
    }
    target.className = btnClass;
    const { drinks } = await searchByCategoryDrink(target.innerText);
    setDrinkPerIngredient(drinks.splice(0, numOfDrinks));
  }

  if (loading) return <Loading />;
  return (
    <div>
      <Header title="Bebidas" />
      <div className="recipesBtn-container">
        <button
          variant="outline-dark"
          className="recipes-categoryBtn"
          data-testid="All-category-filter"
          onClick={ changeDrink ? handleClick1 : handleClick }
          type="button"
        >
          All
        </button>
        {firstCategories.map((category, index) => (
          <button
            variant="outline-dark"
            className="recipes-categoryBtn"
            data-testid={ `${category.strCategory}-category-filter` }
            onClick={ changeDrink ? handleClick1 : handleClick }
            key={ index }
            type="button"
          >
            { category.strCategory }
          </button>
        ))}
      </div>
      <div className="recipesCard-container">
        {(changeDrink ? drinkPerIngredient : firstDrinks).map((drink, index) => (
          <Link to={ `/bebidas/${drink.idDrink}` } key={ drink.strDrink }>
            <Card
              bg="info"
              data-testid={ `${index}-recipe-card` }
              className="card"
            >
              <Card.Img
                className="cardImg"
                data-testid={ `${index}-card-img` }
                src={ drink.strDrinkThumb }
                alt={ drink.strDrink }
              />
              <Card.Body>
                <Card.Title
                  className="recipesCard-title"
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
