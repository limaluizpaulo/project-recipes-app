import PropTypes from 'prop-types';
import React from 'react';

function CarroselBebidas(props) {
  const { recomendations } = props;
  const SEIX = 5;
  return (
    <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner">
        {recomendations.map((value, j) => (j <= SEIX ? (
          <div
            key={ j }
            className={ j === 0 ? 'carousel-item  active' : 'carousel-item' }
            data-testid={ `${j}-recomendation-card` }
          >
            <img src={ value.strDrinkThumb } className="d-block w-100" alt="comida" />
            <h1 data-testid={ `${j}-recomendation-title` }>{value.strDrink}</h1>
          </div>
        ) : null))}
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleControls"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleControls"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="visually-hidden">Next</span>
      </button>

    </div>
  );
}

CarroselBebidas.propTypes = {
  recomendations: PropTypes.shape({
    map: PropTypes.func,
  }),
}.isRequired;

export default CarroselBebidas;
