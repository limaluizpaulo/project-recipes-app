import React from 'react';
import PropTypes from 'prop-types';
import { Card, Carousel } from 'react-bootstrap';
import '../styles/CardsCarousel.css';

function CardsCarousel(props) {
  const { value: { url, related } } = props;

  function createCard(number) {
    const item = related[number];
    if (url.match(/comida/gi)) {
      return (
        <Card data-testid={ `${number}-recomendation-card` } style={ { width: '180px' } }>
          <Card.Img variant="top" src={ item.strDrinkThumb } />
          <Card.Body>
            <Card.Title
              data-testid={ `${number}-recomendation-title` }
            >
              { item.strDrink }
            </Card.Title>
            <Card.Subtitle>{ item.strAlcoholic }</Card.Subtitle>
          </Card.Body>
        </Card>
      );
    }
    return (
      <Card data-testid={ `${number}-recomendation-card` } style={ { width: '360px' } }>
        <Card.Img variant="top" src={ item.strMealThumb } />
        <Card.Body>
          <Card.Title
            data-testid={ `${number}-recomendation-title` }
          >
            { item.strMeal }
          </Card.Title>
          <Card.Subtitle>{ item.strCategory }</Card.Subtitle>
        </Card.Body>
      </Card>
    );
  }
  const n = 0;
  const n1 = 1;
  const n2 = 2;
  const n3 = 3;
  const n4 = 4;
  const n5 = 5;
  if (related.length === 0) return <h4>Carregando cards...</h4>;
  return (
    <Carousel>
      <Carousel.Item>
        <div className="carousel-items">
          {createCard(n)}
          {createCard(n1)}
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className="carousel-items">
          {createCard(n2)}
          {createCard(n3)}
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className="carousel-items">
          {createCard(n4)}
          {createCard(n5)}
        </div>
      </Carousel.Item>
    </Carousel>
  );
}

CardsCarousel.propTypes = {
  value: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default CardsCarousel;
