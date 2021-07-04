import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import DropDownList from '../components/DropDownList';
import Context from '../context/Context';

// Tela de explorar comidas por local de origem: /explorar/comidas/area
export default function FoodArea({ history }) {
  const { recipesByPlace } = useContext(Context);

  const handleClick = ({ target: { id } }) => {
    history.push(`/comidas/${id}`);
  };

  return (
    <div>
      <h4>ExploreMealsByOrigin</h4>
      <Header history={ history } title="Explorar Origem" />
      <DropDownList />
      <div>
        { recipesByPlace.map(({ strMeal, strMealThumb, idMeal }, idx) => (
          <div
            data-testid={ `${idx}-recipe-card` }
            key={ idMeal }
            id={ idMeal }
            onClick={ handleClick }
            onKeyPress={ handleClick }
            role="button"
            tabIndex={ idMeal }
          >
            <img
              data-testid={ `${idx}-card-img` }
              src={ strMealThumb }
              alt={ strMeal }
              id={ idMeal }
            />
            <h4
              data-testid={ `${idx}-card-name` }
              id={ idMeal }
            >
              { strMeal }
            </h4>
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
