import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/cards.css';

export default function CarouselCards({ id, img, title, index, url, subTitle }) {
  return (
    <Link to={ `${url}/${id}` }>
      <Card
        data-testid={ `${index}-recomendation-card` }
      >
        <Card.Img
          variant="top"
          src={ img }
          data-testid={ `${index}-card-img` }
        />
        <Card.Body>
          <Card.Subtitle>{ subTitle }</Card.Subtitle>
          <Card.Title data-testid={ `${index}-recomendation-title` }>
            { title }
          </Card.Title>
        </Card.Body>
      </Card>
    </Link>
  );
}

CarouselCards.propTypes = {
  index: PropTypes.number.isRequired,
  img: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
};
