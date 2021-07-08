import React from 'react';
import PropTypes from 'prop-types';
import { Carousel } from 'react-bootstrap';

function CarouselElement(props) {
  const { sugest } = props;
  console.log(sugest);
  if (sugest[0].length > 0) {
    const type = [`str${sugest[1][3]}Thumb`];
    const name = [`str${sugest[1][3]}`];
    return (
      <Carousel>
        <Carousel.Item interval={ 1000 }>
          <div className="carouselItem">
            <div data-testid="0-recomendation-card">
              <h6 data-testid="0-recomendation-title">{ sugest[0][0][name] }</h6>
              <img
                className="carouselimg"
                data-testid="recipe-photo"
                src={ sugest[0][0][type] }
                alt={ sugest[0][0][name] }
              />
            </div>
            <div data-testid="1-recomendation-card">
              <h6 data-testid="1-recomendation-title">{ sugest[0][1][name] }</h6>
              <img
                className="carouselimg"
                data-testid="recipe-photo"
                src={ sugest[0][1][type] }
                alt={ sugest[0][1][name] }
              />
            </div>
          </div>
        </Carousel.Item>
        <Carousel.Item interval={ 1000 }>
          <div className="carouselItem">
            <div data-testid="2-recomendation-card">
              <h6 data-testid="2-recomendation-title">{ sugest[0][2][name] }</h6>
              <img
                className="carouselimg"
                data-testid="recipe-photo"
                src={ sugest[0][2][type] }
                alt={ sugest[0][2][name] }
              />
            </div>
            <div data-testid="3-recomendation-card">
              <h6 data-testid="3-recomendation-title">{ sugest[0][3][name] }</h6>
              <img
                className="carouselimg"
                data-testid="recipe-photo"
                src={ sugest[0][3][type] }
                alt={ sugest[0][3][name] }
              />
            </div>
          </div>
        </Carousel.Item>
        <Carousel.Item interval={ 1000 }>
          <div className="carouselItem">
            <div data-testid="4-recomendation-card">
              <h6 data-testid="4-recomendation-title">{ sugest[0][4][name] }</h6>
              <img
                className="carouselimg"
                data-testid="recipe-photo"
                src={ sugest[0][4][type] }
                alt={ sugest[0][4][name] }
              />
            </div>
            <div data-testid="5-recomendation-card">
              <h6 data-testid="5-recomendation-title">{ sugest[0][5][name] }</h6>
              <img
                className="carouselimg"
                data-testid="recipe-photo"
                src={ sugest[0][5][type] }
                alt={ sugest[0][5][name] }
              />
            </div>
          </div>
        </Carousel.Item>
      </Carousel>
    );
  }
  return (
    <div>
      Loading...
    </div>
  );
}

CarouselElement.propTypes = {
  type: PropTypes.string,
}.isRequired;

export default CarouselElement;
