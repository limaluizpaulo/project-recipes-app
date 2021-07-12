import PropTypes from 'prop-types';
import React from 'react';
import { setList6 } from '../services/services';
import '../styles/Carousel.css';

function CarroselBebidas(props) {
  const { recomendations } = props;
  // console.log(recomendations);
  const itemsRecomendations = setList6(recomendations);
  return (
    <div className="container">
      {itemsRecomendations.map((item, index) => (
        <div
          key={ item.idDrink }
          data-testid={ `${index}-recomendation-card` }
          className="content"
        >
          <img src={ item.strDrinkThumb } alt={ item.strDrink } />
          <h6 data-testid={ `${index}-recomendation-title` }>{item.strDrink}</h6>
        </div>
      ))}

    </div>
  );
}

CarroselBebidas.propTypes = {
  recomendations: PropTypes.shape({
    map: PropTypes.func,
  }),
}.isRequired;

export default CarroselBebidas;
