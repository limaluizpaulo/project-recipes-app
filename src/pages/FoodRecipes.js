import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import '../styles/DrinkAndFoodRecipes(page).css';
import { Card } from 'react-bootstrap';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Context } from '../context/ContextForm';
import Loading from '../components/Loading';
import { searchByCategoryFood } from '../services/searchApi';
import { requestMeal } from '../services/api';

function FoodRecipes() {
  const { setFirstMeals,
    firstMeals,
    foodPerIngredient,
    setFoodPerIngredient,
    changeFood } = useContext(Context);
  const [firstCategories, setFirstCategories] = useState([]);
  const [loading, setLoading] = useState(null);
  const numOfMeals = 12;
  const numOfCategories = 5;
  const btnClass = 'recipes-categoryBtnAlternative';

  useEffect(() => {
    setLoading(true);
    const fetchMeals = async () => {
      const meals = await requestMeal();
      setFirstMeals(meals.slice(0, numOfMeals));
      setLoading(false);
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
    if (target.innerText === 'All' || target.className === btnClass) {
      target.className = 'recipes-categoryBtn';
      const meals = await requestMeal();
      return setFirstMeals(meals.slice(0, numOfMeals));
    }
    target.className = btnClass;
    const { meals } = await searchByCategoryFood(target.innerText);
    setFirstMeals(meals.splice(0, numOfMeals));
  }

  async function handleClick1({ target }) {
    if (target.innerText === 'All' || target.className === btnClass) {
      target.className = 'recipes-categoryBtn';
      const meals = await requestMeal();
      return setFoodPerIngredient(meals.slice(0, numOfMeals));
    }
    target.className = btnClass;
    const { meals } = await searchByCategoryFood(target.innerText);
    setFoodPerIngredient(meals.splice(0, numOfMeals));
  }

  if (loading) return <Loading />;
  return (
    <div>
      <Header title="Comidas" />
      <div className="recipesBtn-container">
        <button
          variant="outline-dark"
          className="recipes-categoryBtn"
          data-testid="All-category-filter"
          onClick={ changeFood ? handleClick1 : handleClick }
          type="button"
        >
          All
        </button>
        {firstCategories.map((category, index) => (
          <button
            variant="outline-dark"
            className="recipes-categoryBtn"
            onClick={ changeFood ? handleClick1 : handleClick }
            data-testid={ `${category.strCategory}-category-filter` }
            key={ index }
            type="button"
          >
            { category.strCategory }
          </button>
        ))}
      </div>
      <div className="recipesCard-container">
        {(changeFood ? foodPerIngredient : firstMeals).map((meal, index) => (
          <Link
            className="container-card"
            to={ `/comidas/${meal.idMeal}` }
            key={ meal.strMeal }
          >
            <Card
              bg="info"
              data-testid={ `${index}-recipe-card` }
              className="card"
            >
              <Card.Img
                data-testid={ `${index}-card-img` }
                className="cardImg"
                src={ meal.strMealThumb }
                alt={ meal.strMeal }
              />
              <Card.Body>
                <Card.Title
                  className="recipesCard-title"
                  data-testid={ `${index}-card-name` }
                >
                  {meal.strMeal}
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

export default FoodRecipes;
