import React, { useState } from 'react';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/cards.css';

export default function CarouselCards({ id, img, title, index, url, subTitle }) {
  const [isRedirect, setIsRedirect] = useState(false);

  const redirectRecipe = () => {
    setIsRedirect(true);
  };
  return (
    <Card
      data-testid={ `${index}-recomendation-card` }
      onClick={ redirectRecipe }
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
      { isRedirect && <Redirect to={ `${url}/${id}` } />}
    </Card>
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
