import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import DropDownList from '../components/DropDownList';
import Context from '../context/Context';
import '../styles/exploreArea.css';

// Tela de explorar comidas por local de origem: /explorar/comidas/area
export default function FoodArea({ history }) {
  const { recipesByPlace } = useContext(Context);

  const handleClick = ({ target: { id } }) => {
    history.push(`/comidas/${id}`);
  };

  return (
    <div>
      <Header history={ history } title="Explorar Origem" />
      <DropDownList />
      <div className="food__cards__container">
        { recipesByPlace.map(({ strMeal, strMealThumb, idMeal }, idx) => (
          <div
            className="food__card"
            data-testid={ `${idx}-recipe-card` }
            key={ idMeal }
            id={ idMeal }
            onClick={ handleClick }
            onKeyPress={ handleClick }
            role="button"
            tabIndex={ idMeal }
          >
            <img
              className="food__card__img"
              data-testid={ `${idx}-card-img` }
              src={ strMealThumb }
              alt={ strMeal }
              id={ idMeal }
            />
            <div className="food__card_text">
              <h4
                data-testid={ `${idx}-card-name` }
                id={ idMeal }
              >
                { strMeal }
              </h4>
            </div>
          </div>
        )) }
      </div>
      <Footer />
    </div>
  );
}

FoodArea.propTypes = {
  history: PropTypes.shape().isRequired,
};
