import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Card = ({ id, img, title, index, type }) => (
  <Link to={ `/${type}/${id}` } data-testid={ `${index}-recipe-card` }>
    <img height="200px" src={ img } alt={ title } data-testid={ `${index}-card-img` } />
    <h4 data-testid={ `${index}-card-name` }>
      {title}
    </h4>
  </Link>
);

Card.propTypes = {
  id: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
};

export default Card;
