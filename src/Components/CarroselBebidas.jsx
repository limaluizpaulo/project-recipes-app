import PropTypes from 'prop-types';
import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import { setList6 } from '../services/services';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

function CarroselBebidas(props) {
  const { recomendations } = props;
  // console.log(recomendations);
  const itemsRecomendations = setList6(recomendations);
  return (
    <div className="container">
      <Carousel>
        {itemsRecomendations.map((item, index) => (
          <div
            key={ item.idDrink }
            data-testid={ `${index}-recomendation-card` }
            className="content"
          >
            <img src={ item.strDrinkThumb } alt={ item.strDrink } />
            <h6
              className="legend"
              data-testid={ `${index}-recomendation-title` }
            >
              {item.strDrink}
            </h6>
          </div>
        ))}
      </Carousel>
    </div>
  );
}

CarroselBebidas.propTypes = {
  recomendations: PropTypes.shape({
    map: PropTypes.func,
  }),
}.isRequired;

export default CarroselBebidas;
