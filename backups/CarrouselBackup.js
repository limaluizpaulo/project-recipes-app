import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Carousel } from 'react-bootstrap';
import { GlobalContext } from '../context/Provider';

const Carrousel = ({ food }) => {
  const magic = 6;
  const { meals, drinks } = useContext(GlobalContext);
  const cards = food ? drinks : meals;
  const recipes = [];
  for (let i = 0; i < magic; i += 2) recipes.push([cards[i], cards[i + 1]]);
  return (
    <Carousel>
      {cards.length
        && recipes.map(([c1, c2], idx) => (
          <Carousel.Item key={ `carrousel - ${idx}` }>
            <div className="d-flex">
              <div data-testid={ `${idx}-recomendation-card` }>
                <p data-testid={ `${idx}-recomendation-title` }>
                  {c1.strMeal || c1.strDrink}
                </p>
                <img
                  className="d-inline w-100"
                  src={ c1.strMealThumb || c1.strDrinkThumb }
                  alt="First slide"
                />
              </div>
              <div data-testid={ `${idx + 1}-recomendation-card` }>
                <p data-testid={ `${idx + 1}-recomendation-title` }>
                  {c2.strMeal || c2.strDrink}
                </p>
                <img
                  className="d-inline w-100"
                  src={ c2.strMealThumb || c2.strDrinkThumb }
                  alt="First slide"
                />
              </div>
            </div>
          </Carousel.Item>
        ))}
    </Carousel>
  );
};

Carrousel.defaultProps = {
  food: false,
};

Carrousel.propTypes = {

  food: PropTypes.bool,
};

export default Carrousel;
