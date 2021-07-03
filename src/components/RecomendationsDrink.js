import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { requestDrink } from '../services/api';
import '../styles/global.css';

function RecomendationsDrink() {
  const [recomendationsDrink, setRecomendationsDrink] = useState([]);
  const numOfRecomendationsDrink = 6;
  const four = 4;
  const six = 6;

  useEffect(() => {
    const fetchRecomendationDrink = async () => {
      const response = await requestDrink();
      return setRecomendationsDrink(response.slice(0, numOfRecomendationsDrink));
    };
    fetchRecomendationDrink();
  }, []);

  return (
    <div>
      <Carousel fade interval={ null } controls="true">
        <Carousel.Item>
          <div className="card-container">
            {recomendationsDrink.slice(0, 2).map((drink, index) => (
              <Link to={ `/bebidas/${drink.idDrink}` } key={ drink.strDrink }>
                <div
                  data-testid={ `${index}-recomendation-card` }
                  className="card"
                >
                  <img
                    data-testid={ `${index}-card-img` }
                    src={ drink.strDrinkThumb }
                    alt={ drink.strDrink }
                  />
                  <span>{drink.strAlcoholic}</span>
                  <p data-testid={ `${index}-recomendation-title` }>{drink.strDrink}</p>
                </div>
              </Link>
            ))}
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="card-container">
            {recomendationsDrink.slice(2, four).map((drink, index) => (
              <Link to={ `/bebidas/${drink.idDrink}` } key={ drink.strDrink }>
                <div
                  data-testid={ `${index + 2}-recomendation-card` }
                  className="card"
                >
                  <img
                    data-testid={ `${index + 2}-card-img` }
                    src={ drink.strDrinkThumb }
                    alt={ drink.strDrink }
                  />
                  <span>{drink.strAlcoholic}</span>
                  <p
                    data-testid={ `${index + 2}-recomendation-title` }
                  >
                    {drink.strDrink}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="card-container">
            {recomendationsDrink.slice(four, six).map((drink, index) => (
              <Link to={ `/bebidas/${drink.idDrink}` } key={ drink.strDrink }>
                <div
                  data-testid={ `${index + four}-recomendation-card` }
                  className="card"
                >
                  <img
                    data-testid={ `${index + four}-card-img` }
                    src={ drink.strDrinkThumb }
                    alt={ drink.strDrink }
                  />
                  <span>{drink.strAlcoholic}</span>
                  <p data-testid={ `${index + four}-recomendation-title` }>
                    {drink.strDrink}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default RecomendationsDrink;
