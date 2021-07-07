import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import '../styles/global.css';
import { Card } from 'react-bootstrap';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Context } from '../context/ContextForm';
import { requestMeal } from '../services/api';

function FoodByCountry() {
  const { setFirstMeals, firstMeals, area, setArea } = useContext(Context);
  const numOfMeals = 12;

  useEffect(() => {
    const fetchMeals = async () => {
      const meals = await requestMeal();
      setFirstMeals(meals.slice(0, numOfMeals));
      setArea(meals);
    };
    fetchMeals();
  }, [setFirstMeals, setArea]);

  return (
    <div>
      <Header title="Explorar Origem" />
      <div>
        <select
          className="selectByCountry"
          data-testid="explore-by-area-dropdown"
        >
          <option>All</option>
          {area.map((item, index) => (
            <option
              className="countryOption"
              data-testid={ `${item.strArea}-option` }
              key={ index }
            >
              { item.strArea }
            </option>
          ))}
        </select>
      </div>
      <div className="card-container">
        {firstMeals.map((meal, index) => (
          <Link
            to={ `/comidas/${meal.idMeal}` }
            key={ meal.strMeal }
          >
            <Card
              data-testid={ `${index}-recipe-card` }
              className="card"
            >
              <Card.Img
                data-testid={ `${index}-card-img` }
                src={ meal.strMealThumb }
                alt={ meal.strMeal }
              />
              <Card.Body>
                <Card.Title
                  className="cardTitle"
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

export default FoodByCountry;
