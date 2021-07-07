import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import { exploreIngredientsFood } from '../services/api';
import '../styles/global.css';
import { Context } from '../context/ContextForm';
import Footer from '../components/Footer';
import Header from '../components/Header';

function ExploreFoodIngredient() {
  const { firstFoodIngredients, setFirstFoodIngredients } = useContext(Context);
  const numOfIngredients = 12;

  useEffect(() => {
    const fetchFoodIngredients = async () => {
      const meals = await exploreIngredientsFood();
      setFirstFoodIngredients(meals.slice(0, numOfIngredients));
    };
    fetchFoodIngredients();
  }, [setFirstFoodIngredients]);

  return (
    <div>
      <Header title="Explorar Ingredientes" />
      <div className="card-container">
        {firstFoodIngredients.map((ingredient, index) => (
          <Link
            to={ `/comidas/${ingredient.idMeal}` }
            key={ ingredient.strMeal }
          >
            <Card
              data-testid={ `${index}-recipe-card` }
              className="card"
            >
              <Card.Img
                data-testid={ `${index}-card-img` }
                src={ `https://www.themealdb.com/images/ingredients/${ingredient.srtIngredient}.png` }
                alt={ ingredient.strIngredient }
              />
              <Card.Body>
                <Card.Title
                  className="cardTitle"
                  data-testid={ `${index}-card-name` }
                >
                  {ingredient.srtIngredient}
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
