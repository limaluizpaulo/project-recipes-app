import PropTypes from 'prop-types';
import React from 'react';
import { setList6 } from '../services/services';
import '../styles/Carousel.css';

function CarroselComidas(props) {
  const { recomendations } = props;
  // console.log(recomendations);
  const itemsRecomendations = setList6(recomendations);
  return (
    <div className="container">
      {itemsRecomendations.map((item, index) => (
        <div
          key={ item.idMeal }
          data-testid={ `${index}-recomendation-card` }
          className="content"
        >
          <img src={ item.strMealThumb } alt={ item.strMeal } />
          <h6 data-testid={ `${index}-recomendation-title` }>{item.strMeal}</h6>
        </div>
      ))}

    </div>
  );
}

CarroselComidas.propTypes = {
  recomendations: PropTypes.shape({
    map: PropTypes.func,
  }),
}.isRequired;

export default CarroselComidas;
