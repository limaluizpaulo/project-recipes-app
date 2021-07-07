import React from 'react';
import PropTypes from 'prop-types';

function Carousel(props) {
  const { sugest } = props;
  console.log(sugest);
  if (sugest[0].length > 0) {
    const type = [`str${sugest[1][3]}Thumb`];
    const name = [`str${sugest[1][3]}`];
    return (
      <div
        data-testid="recomendation-card"
        id="myCarousel"
        className="carousel slide"
        data-ride="carousel"
      >
        <span>
          <img
            className="carouselimg"
            data-testid="recipe-photo"
            src={ sugest[0][0][type] }
            alt={ sugest[0][0][name] }
          />
          <h6>{ sugest[0][0][name] }</h6>
        </span>
        <span>
          <img
            className="carouselimg"
            data-testid="recipe-photo"
            src={ sugest[0][1][type] }
            alt={ sugest[0][1][name] }
          />
          <h6>{ sugest[0][1][name] }</h6>
        </span>
        <span>
          <img
            className="carouselimg"
            data-testid="recipe-photo"
            src={ sugest[0][2][type] }
            alt={ sugest[0][2][name] }
          />
          <h6>{ sugest[0][2][name] }</h6>
        </span>
        <span>
          <img
            className="carouselimg"
            data-testid="recipe-photo"
            src={ sugest[0][3][type] }
            alt={ sugest[0][3][name] }
          />
          <h6>{ sugest[0][3][name] }</h6>
        </span>
        <span>
          <img
            className="carouselimg"
            data-testid="recipe-photo"
            src={ sugest[0][4][type] }
            alt={ sugest[0][4][name] }
          />
          <h6>{ sugest[0][4][name] }</h6>
        </span>
        <span>
          <img
            className="carouselimg"
            data-testid="recipe-photo"
            src={ sugest[0][5][type] }
            alt={ sugest[0][5][name] }
          />
          <h6>{ sugest[0][5][name] }</h6>
        </span>
      </div>
    );
  }
  return (
    <div>
      Loading...
    </div>
  );
}

Carousel.propTypes = {
  type: PropTypes.string,
}.isRequired;

export default Carousel;
