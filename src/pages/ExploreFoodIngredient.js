import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import { exploreIngredientsFood } from '../services/api';
import { foodByIngredient } from '../services/searchApi';
import '../styles/global.css';
import { Context } from '../context/ContextForm';
import Footer from '../components/Footer';
import Header from '../components/Header';

function ExploreFoodIngredient() {
  const { firstFoodIngredients,
    setFirstFoodIngredients,
    setFoodPerIngredient,
    changeFood,
    setChangeFood } = useContext(Context);
  const numOfIngredients = 12;

  useEffect(() => {
    const fetchFoodIngredients = async () => {
      const meals = await exploreIngredientsFood();
      setFirstFoodIngredients(meals.slice(0, numOfIngredients));
    };
    fetchFoodIngredients();
  }, [setFirstFoodIngredients]);

  async function handleClick({ target }) {
    setChangeFood(!changeFood);
    const { meals } = await foodByIngredient(target.alt);
    setFoodPerIngredient(meals.slice(0, numOfIngredients));
  }

  return (
    <div>
      <Header title="Explorar Ingredientes" />
      <div className="card-container">
        {firstFoodIngredients.map((ingredient, index) => (
          <Link
            to="/comidas"
            key={ index }
          >
            <Card
              onClick={ handleClick }
              data-testid={ `${index}-ingredient-card` }
              className="card"
            >
              <Card.Img
                data-testid={ `${index}-card-img` }
                src={ `https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}-Small.png` }
                alt={ ingredient.strIngredient }
              />
              <Card.Body>
                <Card.Title
                  className="cardTitle"
                  data-testid={ `${index}-card-name` }
                >
                  {ingredient.strIngredient}
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

export default ExploreFoodIngredient;
