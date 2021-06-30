import React from 'react';
import PropTypes from 'prop-types';

const Card = ({ img, title, index }) => (
  <div data-testid={ `${index}-recipe-card` }>
    <img src={ img } alt={ title } data-testid={ `${index}-card-img` } />
    <h4 data-testid={ `${index}-card-name` }>
      {title}
    </h4>
  </div>
);

Card.propTypes = {
  img: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default Card;
